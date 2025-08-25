import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import styles from "./LoginPage.module.css";
import { Navigate, NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/reducers/authReducer";

const LoginPage = () => {
  const { loggedIn } = useSelector(authSelector);
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);

  // If user is authenticated redirect him to home page
  if (loggedIn) {
    return <Navigate to={"/"} />;
  }

  // If some error occurs display the error

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const emailVal = emailRef.current.value;
    const passwordVal = passwordRef.current.value;

    // Form validation
    if (emailVal === "" || passwordVal === "" || passwordVal.length < 6) {
      return toast.error("Please enter valid data!");
    }
    setLoading(false);
    // write function here to login the user using redux
  };

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
        <NavLink
          to="/signup"
          style={{
            textDecoration: "none",
            color: "#224957",
            fontFamily: "Quicksand",
          }}
        >
          <p style={{ fontWeight: "600", margin: 0 }}>Or SignUp instead</p>
        </NavLink>
      </form>
    </div>
  );
};

export default LoginPage;
