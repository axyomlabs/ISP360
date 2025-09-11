import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import login_pic from "../assets/Login_pic.png";
import logo from "../assets/isp360dark.png";
import Xlogo from "../assets/Xlogo.png"; // 🔹 your new image
import "../css/LoginPage.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setuser] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Dummy user credentials
  const dummyUser = "User";
  const dummyPassword = "123";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === dummyUser && password === dummyPassword) {
      setError("");
      setSuccess("Redirecting to dashboard...");
      setTimeout(() => navigate("/app/dashboard"), 2000);
    } else {
      setSuccess("");
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* 🔹 Top-left image */}
      {/* <img src={Xlogo} alt="Top Left Logo" className="top-left-img"/> */}

      {/* Left Side */}
      <div className="col-md-4 d-flex flex-column justify-content-center align-items-center bg-light">
        <motion.h2
          className="fw-bold typing-text"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Hi, Welcome back
        </motion.h2>
        <p className="text-muted">More effectively with optimized workflows.</p>
        <img
          src={login_pic}
          alt="illustration"
          className="mt-4"
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* Right Side */}
      <div className="col-md-8 d-flex justify-content-center align-items-center">
        <div className="w-70">
          {/* Centered logo + heading */}
          <div className="text-center">
            <img
              src={logo}
              alt="LOGO"
              className="mb-3"
              style={{ width: "250px", height: "auto" }}
            />
            <h4 className="fw-bold mb-3">Sign in to ISP360</h4>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Static space for messages */}
            <div style={{ minHeight: "45px" }}>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              {success && (
                <div className="alert alert-success py-2">{success}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setuser(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <div className="d-flex justify-content-end mt-1">
                <a href="#!" className="text-muted small">
                  Forgot password?
                </a>
              </div>
            </div>

            <button type="submit" className="btn btn-dark w-100 mt-2">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
