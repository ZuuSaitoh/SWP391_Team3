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
      const response = await api.post("/staff/auth/token", values);
      const token = response.data.result.token;
      const isAuthenticated = response.data.result.authenticated;

      if (isAuthenticated && token) {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);

        // Clear any existing tokens first
        localStorage.clear();

        // Store new token and user info
        localStorage.setItem("staffAuthToken", token);
        localStorage.setItem(
          "staffUser",
          JSON.stringify({
            id: decodedToken.staffID,
            username: decodedToken.sub,
            role: decodedToken.role,
          })
        );
        localStorage.setItem("staffId", decodedToken.staffID);

        // First navigate based on role
        switch (decodedToken.role) {
          case "Manager":
            navigate("/dashboard");
            // Show welcome toast after a small delay to ensure navigation is complete
            setTimeout(() => {
              toast.success("Welcome back, Manager!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }, 100);
            break;
          case "Consulting Staff":
            navigate(`/consultingStaffPage/${decodedToken.staffID}`);
            setTimeout(() => {
              toast.success("Welcome back, Consulting Staff!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }, 100);
            break;
          case "Design Staff":
            navigate(`/designStaffPage/${decodedToken.staffID}`);
            setTimeout(() => {
              toast.success("Welcome back, Design Staff!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }, 100);
            break;
          case "Construction Staff":
            navigate(`/constructionStaffPage/${decodedToken.staffID}`);
            setTimeout(() => {
              toast.success("Welcome back, Construction Staff!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }, 100);
            break;
          default:
            toast.error("Invalid role");
            localStorage.clear();
            break;
        }
      } else {
        toast.error("Authentication failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Login failed");
      localStorage.clear();
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
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default LoginStaff;
