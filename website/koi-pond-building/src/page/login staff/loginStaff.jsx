import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animationpage/AnimatedPage.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./loginStaff.css";
import api from "../../config/axios.jsx";
import { jwtDecode } from "jwt-decode";

function LoginStaff() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const forgotClick = () => {
    console.log("Forgot password clicked");
    navigate("/staff-forgot-password").catch((error) =>
      console.error("Navigation error:", error)
    );
  };

  const validateForm = () => {
    if (!username) {
      toast.error("Username is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const values = { username, password };
    await handleLogin(values);
  };

  const handleLogin = async (values) => {
    try {
      console.log("Sending staff login data:", values);
      const response = await api.post("/staff/auth/token", values);
      const token = response.data.result.token;
      const isAuthenticated = response.data.result.authenticated;

      console.log("Staff login response:", response.data);

      if (isAuthenticated) {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);

        const { staffID, sub: username, role } = decodedToken;

        localStorage.setItem("staffAuthToken", token);
        console.log("Token stored in localStorage:", localStorage.getItem("staffAuthToken")); // Add this line
        localStorage.setItem(
          "staffUser",
          JSON.stringify({ id: staffID, username, role })
        );
        localStorage.setItem('staffId', staffID);

        toast.success("Logged in successfully");

        if (role === "Manager") {
          navigate("/dashboard");
        } else if (role === "Consulting Staff") {
          navigate("/consultingStaffPage/:staffId");
        } else if (role === "Design Staff") {
          navigate("/designStaffPage/:staffId");
        } else {
          toast.error("Invalid role.");
        }
      } else {
        toast.error("Authentication failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(
        `Login failed: ${
          err.response?.data?.message || "Authentication failed."
        }`
      );
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <>
      <AnimatedPage>
        <div className="staff-login-page-container">
          <button
            className="staff-login-back-to-home"
            onClick={handleBackToHome}
          >
            Back to Homepage
          </button>
          <div className="staff-login-image-container"></div>
          <div className="staff-login-form-container">
            <div className="staff-login-header">
              <div className="staff-login-text">Staff Sign In</div>
              <div className="staff-login-underline"></div>
            </div>
            <form className="staff-login-inputs" onSubmit={handleSubmit}>
              <div className="staff-login-input">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="staff-login-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="staff-login-password-options">
                <div className="staff-login-forgot-password">
                  <span
                    className="staff-login-forgot-password-link"
                    onClick={forgotClick}
                  >
                    Forgot password?
                  </span>
                </div>
                <div className="staff-login-show-password">
                  <input
                    type="checkbox"
                    id="staffLoginShowPassword"
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                  />
                  <label htmlFor="staffLoginShowPassword">Show Password</label>
                </div>
              </div>

              <div className="staff-login-submit-container">
                <button type="submit" className="staff-login-submit">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </AnimatedPage>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default LoginStaff;
