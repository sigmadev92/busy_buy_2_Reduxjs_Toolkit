import { useRef, useState } from "react";
import { toast } from "react-toastify";
import styles from "./RegisterPage.module.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { authActions, authSelector } from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";

const RegisterPage = () => {
  // Input refs
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const auth = getAuth();
  const { loggedIn } = useSelector(authSelector);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setAuthUser } = authActions;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const nameVal = nameRef.current.value;
    const emailVal = emailRef.current.value;
    const passwordVal = passwordRef.current.value;

    // Form validation
    if (
      emailVal === "" ||
      nameVal === "" ||
      passwordVal === "" ||
      passwordVal.length < 6
    ) {
      return toast.error("Please enter valid data!");
    }
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        emailVal,
        passwordVal
      );
      const Fbuser = userCredentials.user;
      await setDoc(doc(db, "users", Fbuser.uid), {
        name: nameVal,
        email: Fbuser.email,
        createdAt: new Date(),
      });

      toast.success("User Added successfully");
      dispatch(
        setAuthUser({ name: nameVal, email: emailVal, uid: Fbuser.uid })
      );
      navigate("/");
    } catch (error) {
      toast.error("Registration failed" + error.message);
      console.log(error);
    }

    // call the signup function usig redux here
    setLoading(false);
  };

  if (loggedIn) {
    return <Navigate to={"/"} />;
  }
  if (loading) return <Loader />;

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h2 className={styles.loginTitle}>Sign Up</h2>
        <input
          type="text"
          name="name"
          ref={nameRef}
          placeholder="Enter Name"
          className={styles.loginInput}
        />
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
          {loading ? "..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
