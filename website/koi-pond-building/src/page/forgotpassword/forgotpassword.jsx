import React, { useState } from "react";
import "./forgotpassword.css";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animationpage/AnimatedPage";


function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent

  async function handleSendOtp(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/send-otp?email=${email}`
      );
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setOtpSent(true);
      } else {
        setMessage(data.message || "Error sending OTP");
      }
    } catch (error) {
      setMessage("Error sending OTP");
      console.error(error);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    // Add password confirmation check
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Implement the password reset logic here
    // Example: Send the new password and OTP to your backend for verification
    const resetData = {
      email,
      otp,
      password,
    };

    // TODO: Update with actual endpoint for resetting password
    try {
      const response = await fetch(
        `http://localhost:8080/customers/update/password/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resetData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successfully. You can now sign in.");
        navigate("/login"); // Redirect to login page after successful reset
      } else {
        setMessage(data.message || "Error resetting password");
      }
    } catch (error) {
      setMessage("Error resetting password");
      console.error(error);
    }
  }

  function SignInHandle() {
    navigate("/login");
  }

  return (
    <AnimatedPage>
      <div className="forgot-password-container">
        <div className="forgot-password-image-container2"></div>
        <div className="forgot-password-form-container">
          <div className="forgot-password-header">
            <h2 className="forgot-password-text">Forgot Password</h2>
            <div className="forgot-password-underline" />
          </div>
          <form
            className="forgot-password-inputs"
            onSubmit={otpSent ? handleResetPassword : handleSendOtp}
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
            {otpSent && (
              <>
                <div className="forgot-password-input">
                  <input
                    type="text"
                    placeholder="Enter your OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <div className="forgot-password-input">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="forgot-password-input">
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <div className="forgot-password-submit-container">
              <button type="submit" className="forgot-password-submit">
                {otpSent ? "Reset Password" : "Send OTP"}
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
