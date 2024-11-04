import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animationpage/AnimatedPage";
import api from "../../config/axios.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmail from "./VerifyEmail";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!username) {
      toast.error("Username is required");
      return false;
    }
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return false;
    }
    if (!mail) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(mail)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    if (password !== confirm_password) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const values = { username, mail, password, confirm_password };
    await handleRegister(values);
  };

  const handleRegister = async (values) => {
    try {
      console.log("Sending registration data:", values);
      const response = await api.post("/customers/create", values);
      console.log("Registration response:", response.data);
      toast.success("Registration successful!");
      navigate("/login?registered=true"); // Add this parameter
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response) {
        console.error("Error data:", err.response.data);
        console.error("Error status:", err.response.status);
        console.error("Error headers:", err.response.headers);
        toast.error(
          `Registration failed: ${
            err.response.data.message || err.response.data
          }`
        );
      } else if (err.request) {
        console.error("No response received:", err.request);
        toast.error("No response from server. Please try again later.");
      } else {
        console.error("Error message:", err.message);
        toast.error(`Error: ${err.message}`);
      }
    }
  };

  const handleChangeEmail = () => {
    setIsEmailVerified(false);
    setMail("");
    setMessage("");
  };

  return (
    <AnimatedPage>
      <div className="register-page-container">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          limit={3}
          style={{
            fontSize: "14px",
            fontWeight: "500",
            letterSpacing: "0.5px",
          }}
        />
        {/* This is needed to show the toast notifications */}
        <div className="register-image-container"></div>
        <div className="register-form-container">
          <div className="register-header">
            <div className="register-text">Sign Up</div>
            <div className="register-underline"></div>
          </div>

          {!isEmailVerified ? (
            <VerifyEmail
              email={mail}
              setEmail={setMail}
              setIsEmailVerified={setIsEmailVerified}
              setMessage={setMessage}
            />
          ) : (
            <form className="register-inputs" onSubmit={handleSubmit}>
              <div className="register-input">
                <input
                  type="email"
                  placeholder="Email"
                  value={mail}
                  disabled={true}
                  required
                />
              </div>
              <div className="register-submit-container">
                <button
                  type="button"
                  className="register-submit change-email"
                  onClick={handleChangeEmail}
                >
                  Change Email
                </button>
              </div>
              <div className="register-input">
                <input
                  type="text"
                  placeholder="Username (min 3 characters)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Track username state
                  required
                  minLength={3}
                />
              </div>
              <div className="register-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (min 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Track password state
                  required
                  minLength={8}
                />
              </div>

              <div className="register-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirm_password}
                  onChange={(e) => setConfirm_Password(e.target.value)} // Track confirm password state
                  required
                />
              </div>

              <div className="register-show-password">
                <input
                  type="checkbox"
                  id="registerShowPassword"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
                <label htmlFor="registerShowPassword">Show Password</label>
              </div>

              <div className="register-submit-container">
                <button type="submit" className="register-submit">
                  Sign Up
                </button>
              </div>
            </form>
          )}

          {message && <p className="register-message">{message}</p>}

          <div className="register-already-have-account">
            Already have an Account?{" "}
            <span
              className="register-already-have-account-link"
              onClick={() => navigate("/login")}
            >
              Click here
            </span>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default RegisterPage;
