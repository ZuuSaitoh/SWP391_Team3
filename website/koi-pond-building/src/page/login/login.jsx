import React, { useState, useEffect } from "react";
import { getAuth, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../../config/firebase.js";
import { useNavigate, useLocation } from "react-router-dom";
import AnimatedPage from "../animationpage/AnimatedPage.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import googleLogo from "../koi_photo/logo-icon/google-logo.png";
import api from "../../config/axios.jsx";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    navigate("/");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = () => {
    navigate("/register");
  };

  const forgotClick = () => {
    console.log("Forgot password clicked");
    navigate("/forgotpassword").catch((error) =>
      console.error("Navigation error:", error)
    );
  };

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google login successful", user);
      toast.success("Logged in successfully with Google");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error", error);
      if (
        error.code === "auth/cancelled-popup-request" ||
        error.code === "auth/popup-closed-by-user"
      ) {
        console.log("Popup closed by user");
      } else {
        toast.error("Failed to login with Google: " + error.message);
      }
    }
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
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 8 characters long");
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
      console.log("Sending login data:", values);
      const response = await api.post("/customers/auth/token", values);
      const token = response.data.result.token;
      const isAuthenticated = response.data.result.authenticated;

      console.log("Login response:", response.data);

      if (isAuthenticated) {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        const { customerId, sub: username, role, mail: email } = decodedToken;

        localStorage.setItem("authToken", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ id: customerId, username, role, email })
        );
        navigate("/?login=success");
      } else {
        toast.error("Authentication failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        toast.error(
          `Login failed: ${
            err.response.data.message || "Authentication failed."
          }`
        );
        console.error("Error data:", err.response.data);
        console.error("Error status:", err.response.status);
        console.error("Error headers:", err.response.headers);
      } else if (err.request) {
        toast.error("No response from server. Please try again later.");
        console.error("No response received:", err.request);
      } else {
        toast.error(`Error: ${err.message}`);
        console.error("Error message:", err.message);
      }
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const registered = queryParams.get("registered");
    if (registered === "true") {
      // toast.success("Registration successful! Please log in.");
    }
  }, [location]);

  return (
    <>
      <AnimatedPage>
        <div className="login-page-container">
          <button className="login-back-to-home" onClick={handleBackToHome}>
            Back to Homepage
          </button>
          <div className="login-image-container3"></div>
          <div className="login-form-container">
            <div className="login-header">
              <div className="login-text">Sign In</div>
              <div className="login-underline"></div>
            </div>
            <form className="login-inputs" onSubmit={handleSubmit}>
              <div className="login-input">
                <input
                  type="text"
                  placeholder="Username (min 3 characters)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                />
              </div>
              <div className="login-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div className="login-password-options">
                <div className="login-forgot-password">
                  <span
                    className="login-forgot-password-link"
                    onClick={forgotClick}
                  >
                    Forgot password?
                  </span>
                </div>
                <div className="login-show-password">
                  <input
                    type="checkbox"
                    id="loginShowPassword"
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                  />
                  <label htmlFor="loginShowPassword">Show Password</label>
                </div>
              </div>

              <div className="login-submit-container">
                <button type="submit" className="login-submit">
                  Sign In
                </button>
              </div>
            </form>

            <div className="login-submit-container">
              <div className="login-google-submit" onClick={handleLoginGoogle}>
                <img src={googleLogo} alt="Google logo" />
              </div>
            </div>
            <div className="login-already-have-account">
              Don't have an Account?{" "}
              <span
                className="login-already-have-account-link"
                onClick={handleClick}
              >
                Click here
              </span>
            </div>
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

export default Login;
