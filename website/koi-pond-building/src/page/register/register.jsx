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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Check if any field is empty
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error("Please fill out all fields."); // Show error if fields are empty
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match."); // Show error if passwords don't match
      return;
    }

    const values = { username, email, password };
    await handleRegister(values); // Call the registration function
  };

  const handleRegister = async (values) => {
    try {
      const response = await api.post("register", values);
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/login");
      toast.success("Sign Up successful!"); // Show success notification
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data || "Sign Up failed"); // Show error on failure
    }
  };

  return (
    <AnimatedPage>
      <div className="register-container">
        <ToastContainer />{" "}
        {/* This is needed to show the toast notifications */}
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
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Track username state
                required
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Track password state
                required
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
              <button type="submit" className="submit">
                Sign Up
              </button>
            </div>
          </form>

          <div className="already-haveAccount">
            Already have an Account?
            <span
              className="already-haveAccount-link"
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
