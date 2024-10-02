import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animationpage/AnimatedPage";
import api from "../../config/axios.jsx";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
  };

  const handleClick = () => {
    navigate("/login");
  };

  const handleregister = async (values) => {
    console.log(values);

    try{
      const response = await api.post("register", values);
      const {token} = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user",JSON.stringify(response.data));
      navigate("/login");
    }catch(err){
      console.log(err);
      alert(err.response.data);
    }
  };

  return (
    <AnimatedPage>
      <div className="register-container">
        <div className="image-container"></div>
        <div className="form-container">
          <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
          </div>

          <div className="inputs">
            <div className="input">
              <input type="text" placeholder="Username" />
            </div>
            <div className="input">
              <input type="email" placeholder="Email" />
            </div>

            <div className="input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Track password state
              />
            </div>

            <div className="input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // Track confirm password state
              />
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

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="submit-container">
            <div className="submit" onFinish={handleregister} onClick={handleSubmit}>
              Sign Up
            </div>
          </div>

          <div className="already-haveAccount">
            Already have an Account?
            <span className="already-haveAccount-link" onClick={handleClick}>
              Click here
            </span>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default RegisterPage;
