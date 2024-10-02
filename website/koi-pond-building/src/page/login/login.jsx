import React, { useState } from "react";
import { getAuth, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animationpage/AnimatedPage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './login.css'
import googleLogo from '../koi_photo/google-logo.png';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(""); // Capture username
  const [password, setPassword] = useState(""); // Capture password
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
    navigate("/forgotpassword").catch(error => console.error("Navigation error:", error));
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
      if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
        console.log("Popup closed by user");
      } else {
        toast.error("Failed to login with Google: " + error.message);
      }
    }
  };

  const handleLogin = async () => {
    // Validate input fields
    if (!username || !password) {
      toast.error("Please enter your username and password");
      return;
    }

    try {
      const response = await api.post("login", { username, password });
      console.log(response);
      if (response.data.role === "ADMIN") {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data || "Login failed");
    }
  };

  return (
    <AnimatedPage>
      <div className="login-container">
        <div className="image-container3"></div>
        <div className="form-container">
          <div className="header">
            <div className="text">Sign In</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Capture username
              />
            </div>
            <div className="input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Capture password
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
          </div>

          <div className="submit-container">
            <div className="submit" onClick={handleLogin}>
              Sign In
            </div>
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
