import React, { useState } from 'react';
import './forgetpassword.css'; 

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    setMessage(`Password reset link sent to ${email}`);
  };

  return (
    <div className="koi-background">
      <div className="koi-container">
        <h2 className="koi-title">Forgot Password</h2>
        <form className="koi-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="koi-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="koi-button">Reset Password</button>
        </form>
        {message && <p className="koi-message">{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;