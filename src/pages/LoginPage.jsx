import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import login_pic from "../assets/Login_pic.png";
import logo from "../assets/logo.png";
import '../css/LoginPage.css';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage = () => {
  const [username, setuser] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(""); // State for handling login errors
  const navigate = useNavigate(); // Get the navigate function

  // Dummy user credentials
  const dummyUser = "user";
  const dummyPassword = "123";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the username and password match the dummy user
    if (username === dummyUser && password === dummyPassword) {
      setError(""); // Clear any previous errors
      alert("Login successful!");
      // Redirect to the dashboard page on successful login
      navigate("/dashboard");
    } else {
      // Set an error message if credentials don't match
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex ">
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
          className="img-fluid mt-4"
          style={{ maxWidth: "800px" }}
        />
      </div>

      {/* Right Side */}
      <div className="col-md-8 d-flex justify-content-center align-items-center">
        <div className="w-70">
          <img src={logo} alt="LOGO" className="mb-3" />
          <h4 className="fw-bold mb-3">Sign in to your account</h4>
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label className="form-label fw-bold">UserName</label>
              <input
                type="Text"
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