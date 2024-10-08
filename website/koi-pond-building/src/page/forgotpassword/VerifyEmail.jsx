import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import "./forgotpassword.css";

function VerifyEmail({ email, setEmail, setIsEmailVerified, setMessage }) {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const sendOtp = async (e) => {
    e.preventDefault();
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
      await emailjs.send(
        "service_flpieon",
        "template_qs6prd4",
        emailData,
        "bOlGczQDScAz13xZx"
      );
      setOtpSent(true);
      setCountdown(30); // Changed from 60 to 30
      setMessage("OTP sent to your email. Please check your inbox.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Error sending OTP. Please try again.");
    }
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if (otp === generatedOtp && countdown > 0) { // Added check for countdown > 0
      setIsEmailVerified(true);
      setMessage("OTP verified successfully. Please set your new password.");
    } else if (countdown === 0) {
      setMessage("OTP has expired. Please request a new one.");
    } else {
      setMessage("Invalid OTP. Please try again.");
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
            <button type="submit" className="forgot-password-submit">
              Send OTP
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
              disabled={countdown > 0}
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