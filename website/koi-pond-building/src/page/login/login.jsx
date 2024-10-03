import React, { useState } from "react";
import { getAuth, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animationpage/AnimatedPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import googleLogo from "../koi_photo/google-logo.png";
import api from "../../config/axios.jsx";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

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
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await api.post("login", { username, password });
      if (response.data.role === "Manager") {
        toast.success("Login successful");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data || "Login failed");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <AnimatedPage>
      <div className="login-container">
        <button className="back-to-home" onClick={handleBackToHome}>
          Back to Homepage
        </button>
        <div className="image-container3"></div>
        <div className="form-container">
          <div className="header">
            <div className="text">Sign In</div>
            <div className="underline"></div>
          </div>
          <form className="inputs" onSubmit={handleSubmit}>
            <div className="input">
              <input
                type="text"
                placeholder="Username (min 3 characters)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
              />
            </div>
            <div className="input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="password-options">
              <div className="forgot-password">
                <span className="forgot-password-link" onClick={forgotClick}>
                  Forgot password?
                </span>
              </div>
              <div className="show-password">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
                <label htmlFor="showPassword">Show Password</label>
              </div>
            </div>

            <div className="submit-container">
              <button type="submit" className="submit">
                Sign In
              </button>
            </div>
          </form>

          <div className="submit-container">
            <div className="submit google-submit" onClick={handleLoginGoogle}>
              <img src={googleLogo} alt="Google logo" />
            </div>
          </div>
          <div className="already-haveAccount">
            Don't have an Account?{" "}
            <span className="already-haveAccount-link" onClick={handleClick}>
              Click here
            </span>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default Login;
