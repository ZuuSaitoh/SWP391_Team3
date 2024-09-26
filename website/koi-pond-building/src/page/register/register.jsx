import React, { useState } from 'react';
import './register.css';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <input type='text' placeholder='Username' />
        </div>
        <div className='input'>
          <input type='email' placeholder='Email' />
        </div>
        <div className='input'>
          <input type={showPassword ? 'text' : 'password'} placeholder='Password' />
        </div>
        <div className='input'>
          <input type={showPassword ? 'text' : 'password'} placeholder='Confirm Password' />
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
        <div className="submit">Sign Up</div>
      </div>
      <div className="already-haveAccount">Already have an Account? <span>Click here</span></div>
    </div>
  );
};

export default Register;
