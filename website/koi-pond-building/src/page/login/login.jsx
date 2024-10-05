import React, { useState, useEffect } from "react";
import { getAuth, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../../config/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import AnimatedPage from "../animationpage/AnimatedPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import googleLogo from "../koi_photo/google-logo.png";
import api from "../../config/axios.jsx";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const [notification, setNotification] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = () => {
    navigate("/register");
  };

  const pageClick = () => {
    navigate("/homepage");
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
      // Extract token from the response
      const token = response.data.result.token;
      const isAuthenticated = response.data.result.authenticated;

      console.log("Login response:", response.data);

      if (isAuthenticated) {
        // Decode the token
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);

        // Extract user information from the decoded token
        const { customerId, sub: username } = decodedToken;

        // Store the token and user info in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ id: customerId, username })
        );
        // jsadjksadjk
        // Redirect to homepage with success parameter
        navigate("/?login=success");
      } else {
        toast.error("Authentication failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        toast.error("Authentication failed.");
        console.error("Error data:", err.response.data);
        console.error("Error status:", err.response.status);
        console.error("Error headers:", err.response.headers);
        setNotification(
          `Login failed: ${err.response.data.message || err.response.data}`
        );
      } else if (err.request) {
        toast.error("Authentication failed.");
        console.error("No response received:", err.request);
        setNotification("No response from server. Please try again later.");
      } else {
        toast.error("Authentication failed.");
        console.error("Error message:", err.message);
        setNotification(`Error: ${err.message}`);
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
      toast.success("Registration successful! Please log in.");
    }
  }, [location]);

  return (
    <AnimatedPage>
      <div className="login-page-container">
        <button className="login-back-to-home" onClick={handleBackToHome}>
          Back to Homepage
        </button>
        <div className="login-image-container3"></div>
        <div className="login-form-container">
          {notification && (
            <div className="login-notification">{notification}</div>
          )}
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
      <ToastContainer position="top-right" autoClose={5000} />
    </AnimatedPage>
  );
}

export default Login;