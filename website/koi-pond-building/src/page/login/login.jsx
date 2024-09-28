import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');  // Navigate to the /register page
  };

  return (
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
            <input 
                type='text' 
                placeholder='Username or Email'
                rule={[{
                    required: true,
                    message: 'Please enter your Username or Email'
                },
            ]}
            />
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
          <div className='submit'>Sign In</div>
        </div>
        <div className='already-haveAccount'>
      Don&apos;t have an Account? <span onClick={handleClick} >Click here</span>
    </div>
      </div>
    </div>
  );
};

export default LoginPage;