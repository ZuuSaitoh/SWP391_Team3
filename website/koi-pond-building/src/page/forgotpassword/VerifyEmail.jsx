import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import "./forgotpassword.css";

function VerifyEmail({ email, setEmail, setIsEmailVerified }) {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const checkEmailExists = async () => {
    setIsCheckingEmail(true);
    try {
      const response = await fetch(
        `http://localhost:8080/customers/checkMail/${email}`
      );
      const data = await response.json();
      if (response.ok && data.result === true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking email:", error);
      toast.error("An error occurred while checking your email.");
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();

    const emailExists = await checkEmailExists();
    if (!emailExists) {
      toast.error("Email not found. Please check your email address.");
      return;
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    const emailData = {
      to_email: email,
      to_name: email,
      from_name: "KoiPond Design",
      email: email,
      message: newOtp,
    };

    try {
      const result = await emailjs.send(
        "service_flpieon",
        "template_qs6prd4",
        emailData,
        "bOlGczQDScAz13xZx"
      );
      // console.log(result.text);
      setOtpSent(true);
      setCountdown(60);
      toast.success("OTP sent to your email. Please check your inbox.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP. Please try again.");
    }
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if (otp === generatedOtp && countdown > 0) {
      setIsEmailVerified(true);
      toast.success("OTP verified successfully. Please set your new password.");
    } else if (countdown === 0) {
      toast.error("OTP has expired. Please request a new one.");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="forgot-password-inputs">
      {!otpSent ? (
        <form onSubmit={sendOtp}>
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
            <button
              type="submit"
              className="forgot-password-submit"
              disabled={isCheckingEmail}
            >
              {isCheckingEmail ? "Checking..." : "Send OTP"}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={verifyOtp}>
          <div className="forgot-password-input">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="forgot-password-submit-container">
            <button type="submit" className="forgot-password-submit">
              Verify OTP
            </button>
          </div>
          <div className="resend-otp-container">
            <button
              onClick={sendOtp}
              disabled={countdown > 0 || isCheckingEmail}
              className="resend-otp-button"
            >
              {countdown > 0 ? `Resend OTP (${countdown}s)` : "Resend OTP"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default VerifyEmail;
