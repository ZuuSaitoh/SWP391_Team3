import React, { useState } from 'react';
import './forgetpassword.css';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../animationpage/AnimatedPage';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`A password reset link has been sent to ${email}. Please check your inbox.`);
  };

  const navigate = useNavigate();

  const SignInHandle = () => {
    navigate('/login');
  };

  return (
    <AnimatedPage>
    <div className="register-container">
      <div className="image-container2" />
      <div className="form-container">
        <div className="header">
          <h2 className="text">Forgot Password</h2>
          <div className="underline" />
        </div>
        <form className="inputs" onSubmit={handleSubmit}>
          <div className="input">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="submit-container">
            <button type="submit" className="submit">
              Reset Password
            </button>
          </div>
        </form>
        <div className="already-haveAccount">
          Remember your password? <span className='already-haveAccount-link' onClick={SignInHandle}>Sign In</span>
        </div>
        {message && (
          <div className="message">
            <span className="message-icon">✉️</span>
            {message}
          </div>
        )}
      </div>
    </div>
    </AnimatedPage>
  );
};

export default ForgotPassword;