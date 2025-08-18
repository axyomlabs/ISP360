import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import "../css/LoginPage.css"; // Make sure to create this CSS file
import logo from "../assets/logo.png";

const LoginPage = () => {
  return (
    <div className="conatiner">
      <div>

        <img
          src={logo}
          alt="Logo"
          width="360px"

        />

      </div>
       <div className="login-card  rounded-4 p-4">
        <form>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label fw-bold">Username</label>
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Enter username"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              placeholder="Enter password"
            />
          </div>

          {/* Remember Me */}
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <div className="d-grid ">
            <button type="submit" className="btn login-button  fw-bold rounded-pill">
              Login
            </button>
          </div>
        </form>

        {/* Trouble login */}
        <p className="text-center trouble-login mt-3 fw-bold small text-dark">
          Trouble login in?
        </p>
      </div>

    </div>
  );
};

export default LoginPage;
