import React, { useState } from "react";
import "./forgotpassword.css";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animationpage/AnimatedPage";
import { toast } from "react-toastify";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleResetPassword(e) {
    e.preventDefault();
    // TODO: Implement actual password reset logic here
    // For now, we'll just show a success message
    toast.success(`A password reset link has been sent to ${email}. Please check your inbox.`);
  }

  function SignInHandle() {
    navigate("/login");
  }

  return (
    <AnimatedPage>
      <div className="register-container">
        <div className="image-container2" />
        <div className="form-container">
          <div className="header">
            <h2 className="text">Forgot Password</h2>
            <div className="underline" />
          </div>
          <form className="inputs" onSubmit={handleResetPassword}>
            <div className="input">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="submit-container">
              <button type="submit" className="submit">
                Reset Password
              </button>
            </div>
          </form>
          <div className="already-haveAccount">
            Remember your password?{" "}
            <span className="already-haveAccount-link" onClick={SignInHandle}>
              Sign In
            </span>
          </div>
          {message && (
            <div className="message">
              <span className="message-icon">✉️</span>
              {message}
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}

export default ForgotPassword;
