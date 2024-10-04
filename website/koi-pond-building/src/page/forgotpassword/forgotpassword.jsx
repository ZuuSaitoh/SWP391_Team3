import React, { useState } from "react";
import "./forgotpassword.css";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animationpage/AnimatedPage";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleResetPassword(e) {
    e.preventDefault();
    // TODO: Implement actual password reset logic here
    setMessage(
      `A password reset link has been sent to ${email}. Please check your inbox.`
    );
  }

  function SignInHandle() {
    navigate("/login");
  }

  return (
    <AnimatedPage>
      <div className="forgot-password-container">
        <div className="forgot-password-image-container2" />
        <div className="forgot-password-form-container">
          <div className="forgot-password-header">
            <h2 className="forgot-password-text">Forgot Password</h2>
            <div className="forgot-password-underline" />
          </div>
          <form
            className="forgot-password-inputs"
            onSubmit={handleResetPassword}
          >
            <div className="forgot-password-input">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="forgot-password-submit-container">
              <button type="submit" className="forgot-password-submit">
                Reset Password
              </button>
            </div>
          </form>
          <div className="forgot-password-remember-account">
            Remember your password?{" "}
            <span
              className="forgot-password-sign-in-link"
              onClick={SignInHandle}
            >
              Sign In
            </span>
          </div>
          {message && (
            <div className="forgot-password-message">
              <span className="forgot-password-message-icon">✉️</span>
              {message}
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}

export default ForgotPassword;
