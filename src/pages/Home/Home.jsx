import React, { useEffect, useState } from "react";
import "./Home.css";
import SignUp from "../../components/SignUp/SignUp";
import * as api from "../../api";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("Profile");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      const { data } = await api.logIn({ password, email });

      const mainFolderId = data.result._id

      localStorage.setItem("Profile", data.token);
      localStorage.setItem("mainFolder", mainFolderId)
      navigate(`/drive/${mainFolderId}`);
      return;
    } catch (error) {
      if (error.response?.data.error) {
        alert(error.response.data.message);
        return;
      } else {
        console.log(error.message);
        return;
      }
    }
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (!(decodedToken.exp * 1000 < new Date().getTime())) {
        const mainFolderId = localStorage.getItem("mainFolder");
        navigate(`/drive/${mainFolderId}`);
      }
    }
  }, []);

  return (
    <div className="auth-main">
      <div className="auth-container">
        {isLogin ? (
          <>
            <h1>Login</h1>
            <p>Welcome! Login to access your account.</p>

            <form onSubmit={handleSubmit}>
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
              <button type="submit" className="login-btn">
                Log in
              </button>
            </form>
            <p>
              Did't have account?{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
                type="button"
                className="switch-btn"
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <SignUp isLogin={isLogin} setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
};

export default Home;
