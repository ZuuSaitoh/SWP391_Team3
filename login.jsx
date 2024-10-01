import React from 'react';
import './login.css';
import googleLogo from '../assets/google-logo.png'; // Make sure this path is correct

function Login() {
  // ... existing code ...

  return (
    <div className="login-container">
      {/* ... existing code ... */}
      <form onSubmit={handleSubmit}>
        {/* ... existing username and password fields ... */}
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
        
        {/* Add Google sign-in button */}
        <div className="google-signin">
          <img src={googleLogo} alt="Google Logo" className="google-logo" />
          <button type="button" className="btn btn-google w-100">
            Sign in with Google
          </button>
        </div>
        
        {/* ... existing "Don't have an account?" link ... */}
      </form>
      {/* ... existing code ... */}
    </div>
  );
}

export default Login;