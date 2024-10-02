import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animationpage/AnimatedPage";
import api from "../../config/axios.jsx";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import styles for react-toastify

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
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
    if (password !== confirmPassword) {
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

    const values = { username, email, password };
    await handleRegister(values);
  };

  const handleRegister = async (values) => {
    try {
      const response = await api.post("register", values);
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/login");
      toast.success("Registration successful!");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data || "Registration failed");
    }
  };

  return (
    <AnimatedPage>
      <div className="register-container">
        <ToastContainer /> {/* This is needed to show the toast notifications */}
        <div className="image-container"></div>
        <div className="form-container">
          <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
          </div>

          <form className="inputs" onSubmit={handleSubmit}>
            <div className="input">
              <input 
                type="text" 
                placeholder="Username (min 3 characters)" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Track username state
                required
                minLength={3}
              />
            </div>
            <div className="input">
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Track email state
                required
              />
            </div>

            <div className="input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Track password state
                required
                minLength={6}
              />
            </div>

            <div className="input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // Track confirm password state
                required
              />
            </div>

            <div className="show-password1">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>

            <div className="submit-container">
              <button type="submit" className="submit">Sign Up</button>
            </div>
          </form>

          <div className="already-haveAccount">
            Already have an Account?{" "}
            <span className="already-haveAccount-link" onClick={() => navigate("/login")}>
              Click here
            </span>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default RegisterPage;