import React, { useState } from 'react';
import './register.css';

const Register = () => {
  const [showPasswords, setShowPasswords] = useState(false);

  // Toggle the visibility of both password fields based on checkbox state
  const togglePasswordVisibility = (e) => {
    setShowPasswords(e.target.checked);
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <input type="text" placeholder="Full Name" name="name" required />
        </div>

        <div className="input">
          <input type="email" placeholder="Email" name="email" required />
        </div>

        <div className="input">
          <input
            type={showPasswords ? 'text' : 'password'}
            placeholder="Password"
            name="password"
            required
          />
        </div>

        <div className="input">
          <input
            type={showPasswords ? 'text' : 'password'}
            placeholder="Confirm Password"
            name="confirmPassword"
            required
          />
        </div>
      </div>

      <div className="show-password">
        <input
          type="checkbox"
          id="showPasswords"
          onChange={togglePasswordVisibility}
        />
        <label htmlFor="showPasswords">Show Passwords</label>
      </div>

      <button type="submit">Sign Up</button>
    </div>
  );
};

export default Register;
