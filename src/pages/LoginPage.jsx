  import React, { useState } from "react";
  import "bootstrap/dist/css/bootstrap.min.css";
  import login_pic from "../assets/Login_pic.png";
  import logo from "../assets/isp360dark.png";
  import "../css/LoginPage.css";
  import { motion } from "framer-motion";
  import { useNavigate } from "react-router-dom";
  import Swal from "sweetalert2"; // ✅ Import SweetAlert2

  const LoginPage = () => {
    const [username, setuser] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Dummy user credentials
    const dummyUser = "User";
    const dummyPassword = "123";

    const handleSubmit = (e) => {
      e.preventDefault();

      if (username === dummyUser && password === dummyPassword) {
        setError("");
        // ✅ SweetAlert2 popup instead of alert
        Swal.fire({
          icon: "success",
          title: "🎉 Welcome back!",
          text: "Login successful. Redirecting to dashboard...",
          timer: 2000,
          showConfirmButton: false,
        });
        // Redirect after 2s
        setTimeout(() => navigate("/app/dashboard"), 2000);
      } else {
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
        <h4 className="fw-bold mb-3">Sign in to your account</h4>
      </div>

      {/* Form stays aligned left */}
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
