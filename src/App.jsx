import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoginPage() {
  return (
    <div
      className="align-items-center justify-content-center "
      style={{ backgroundColor: "#f0f4f8" }}
    >
      {/* Logo */}
      <h1
        className="fw-bold mb-5"
        style={{ color: "#0d2c6c", fontSize: "3rem", letterSpacing: "2px" }}
      >
        REVA<span style={{ color: "#0d6efd" }}>TIX</span>
      </h1>

      {/* Card */}
      <div
        className="p-5 shadow-lg bg-white rounded-4"
        style={{ width: "420px" }}
      >
        <h3 className="text-center fw-bold mb-4" style={{ color: "#0d2c6c" }}>
          Login to your account
        </h3>

        <form>
          {/* Username */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg rounded-3"
              placeholder="Enter your password"
            />
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <a href="#" className="text-decoration-none fw-semibold">
              Trouble logging in?
            </a>
          </div>

          {/* Login Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary btn-lg fw-bold rounded-3"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}