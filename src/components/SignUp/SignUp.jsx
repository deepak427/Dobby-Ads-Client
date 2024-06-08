import { useState } from "react";
import "./SignUp.css";

const SignUp = ({ isLogin, setIsLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      alert("Enter email and password");
      return;
    }

    if ( password !== confirmPassword) {
      alert("password and confirm password should match");
      return;
    }

    dispatch(
      signup(
        {
          name,
          email,
        },password,
        navigate
      )
    );
  };

  return (
    <>
      <h1>Sign up</h1>
      <p>
        {" "}
        Welcome! Create an account to access all of our services.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="info-div">
          <label htmlFor="name">
            <h4>Name</h4>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="info-div">
          <label htmlFor="password">
            <h4>Password</h4>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <label htmlFor="confirm-password">
            <h4>Confirm Password</h4>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </label>
        </div>
        <button type="submit" className="login-btn">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
          }}
          type="button"
          className="switch-btn"
        >
          Login
        </button>
      </p>
    </>
  );
};

export default SignUp;
