import React, { useState } from "react";
import "./changePassword.css";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animationpage/AnimatedPage";
import VerifyEmail from "./VerifyEmail";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("userMail"));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const PASSWORDREGEX = /^.{1,20}$/;

  async function handleResetPassword(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!PASSWORDREGEX.test(password)) {
      toast.error("Password must not exceed 20 characters");
      return;
    }

    if (!isEmailVerified) {
      toast.error("Please verify your email first.");
      return;
    }

    const resetData = {
      email,
      password,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/customers/update/password/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resetData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success("Password changed successfully.");
        localStorage.removeItem("userMail");
        navigate("/");
      } else {
        switch (data.errorCode) {
          case 1005:
            toast.error("User not found. Please check your email address.");
            break;
          case 1004:
            toast.error("Password must be at least 8 characters.");
            break;
          case 1006:
            toast.error("Authentication failed. Please try again.");
            break;
          case 1007:
            toast.error("Invalid email address. Please check and try again.");
            break;
          case 1013:
            toast.error("Email doesn't exist. Please check your email address.");
            break;
          case 1014:
            toast.error("Can't change the password because you've logged in with Google.");
            break;
          default:
            toast.error(data.message || "Error resetting password. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Error resetting password. Please try again later.");
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
            <h2 className="forgot-password-text">Change Password</h2>
            <div className="forgot-password-underline" />
          </div>
          {!isEmailVerified ? (
            <VerifyEmail
              email={email}
              setEmail={setEmail}
              setIsEmailVerified={setIsEmailVerified}
              setMessage={setMessage}
            />
          ) : (
            <form
              className="forgot-password-inputs"
              onSubmit={handleResetPassword}
            >
              <div className="forgot-password-input">
                <input
                  type="password"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="forgot-password-input">
                <input
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="forgot-password-submit-container">
                <button type="submit" className="forgot-password-submit">
                  Reset Password
                </button>
              </div>
            </form>
          )}
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
      <ToastContainer />
    </AnimatedPage>
  );
}

export default ForgotPassword;
