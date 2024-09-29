import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '../animationpage/AnimatedPage';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');  // Navigate to the /register page
  };

  return (
    <AnimatedPage>
    <div className='register-container'>
      {/* Left side with image */}
      <div className='image-container'></div>

      {/* Right side with form */}
      <div className='form-container'>
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
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              rule={[{
                required: true,
                message: 'Please enter your password'
              },
              ]}
            />
          </div>
          <div className='input'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
            />
          </div>
          <div className='show-password'>
            <input
              type='checkbox'
              id='showPassword'
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            <label htmlFor='showPassword'>Show Password</label>
          </div>
        </div>

        <div className='submit-container'>
          <div className='submit'>Sign Up</div>
        </div>
        <div className='already-haveAccount'>
          Already have an Account? <span className='already-haveAccount-link' onClick={handleClick} >Click here</span>
        </div>
      </div>
    </div>
    </AnimatedPage>
  );
};

export default RegisterPage;