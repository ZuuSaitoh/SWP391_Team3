import React, { useState } from 'react';
import './register.css';

const Register = () => {
  return(
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <input type ='text' placeholder='Username'/>
        </div>
        <div className='input'>
          <input type ='email' placeholder='Email'/>
        </div>
        <div className='input'>
          <input type ='password' placeholder='Password'/>
        </div>
        <div className='input'>
          <input type ='password' placeholder='Confirm Password'/>
        </div>
      </div>
      <div className="already-haveAccount">Already have an Account? <span>Click here</span></div>
      <div className="submit-container">
        <div className="submit">Sign Up</div>
      </div>
    </div>
  );

};

export default Register;
