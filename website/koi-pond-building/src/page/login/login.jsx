import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animationpage/AnimatedPage";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  const forgotClick = () => {
    navigate("/forgotPassword");
  };

  return (
    <AnimatedPage>
      <div className="login-container">
        {/* Left side with image */}
        <div className="image-container3"></div>

        {/* Right side with form */}
        <div className="form-container">
          <div className="header">
            <div className="text">Sign In</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <input
                type="text"
                placeholder="Username or Email"
                rule={[
                  {
                    required: true,
                    message: "Please enter your Username or Email",
                  },
                ]}
              />
            </div>
            <div className="input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                rule={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
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
            <div className="submit">Sign In</div>
          </div>
          <div className="already-haveAccount">
            Don&apos;t have an Account?{" "}
            <span className="already-haveAccount-link" onClick={handleClick}>
              Click here
            </span>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default LoginPage;
