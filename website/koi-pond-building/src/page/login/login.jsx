import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { googleProvider } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animationpage/AnimatedPage";
import { toast } from "react-toastify";
import './login.css'

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  const forgotClick = () => {
    navigate("/forgotPassword");
  };

  const handleLoginGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleLogin = async (values) => {
    try {
      const respone = await api.post("login", values);
      console.log(respone);
      if (role == "ADMIN") {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      //toast.error(err.respone.data);
    }
  };

  return (
    <AnimatedPage>
      <div className="login-container">
        {/* Left side with image */}
        <div className="image-container3"></div>

        {/* Right side with form */}
        <div className="form-container">
          <div className="header">
            <div className="text">Sign In</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <input
                type="text"
                placeholder="Username or Email"
                rule={[
                  {
                    required: true,
                    message: "Please enter your Username or Email",
                  },
                ]}
              />
            </div>
            <div className="input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                rule={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
              />
            </div>

            <div className="password-options">
              <div className="forgot-password">
                <span className="forgot-password-link" onClick={forgotClick}>
                  Forgot password?
                </span>
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
          </div>

          <div className="submit-container">
            <div className="submit" onClick={handleLogin}>
              Sign In
            </div>
            <div className="submit" onClick={handleLoginGoogle}>
              Sign In Google
            </div>
          </div>
          <div className="already-haveAccount">
            Don&apos;t have an Account?{" "}
            <span className="already-haveAccount-link" onClick={handleClick}>
              Click here
            </span>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default LoginPage;
