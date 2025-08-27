import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import styles from "./LoginPage.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { authActions, authSelector } from "../../redux/reducers/authReducer";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { loggedIn } = useSelector(authSelector);
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = authActions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const emailVal = emailRef.current.value;
    const passwordVal = passwordRef.current.value;

    // Form validation
    if (emailVal === "" || passwordVal === "" || passwordVal.length < 6) {
      return toast.error("Please enter valid data!");
    }
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        emailVal,
        passwordVal
      );
      const userInfo = userCredentials.user;

      const userData = await getDoc(doc(db, "users", userInfo.uid));
      toast.success("Logged In successfully");

      dispatch(setAuthUser({ ...userData.data(), createdAt: "" }));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed" + error.message);
    }

    setLoading(false);
    // write function here to login the user using redux
  };
  if (loggedIn) {
    return <Navigate to={"/"} />;
  }
  if (loading) return <Loader message={"Loading"} />;

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h2 className={styles.loginTitle}>Sign In</h2>
        <input
          type="email"
          name="email"
          ref={emailRef}
          className={styles.loginInput}
          placeholder="Enter Email"
        />
        <input
          type="password"
          name="password"
          ref={passwordRef}
          className={styles.loginInput}
          placeholder="Enter Password"
        />
        <button className={styles.loginBtn}>
          {loading ? "..." : "Sign In"}
        </button>

        <p
          style={{ fontWeight: "600", margin: 0, cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          Or SignUp instead
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
