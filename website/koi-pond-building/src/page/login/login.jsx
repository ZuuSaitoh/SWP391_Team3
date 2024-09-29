import React from "react";
import AuthenTemplate from "../../component/authen-template";
import { Button, Form, Input, message } from "antd";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { googleProvider } from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const handleLoginGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProviderr.credentialFromResult(result);
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
      toast.error(err.respone.data);
    }
  };

  return (
    <AuthenTemplate>
      <Form
        labelCol={{
          span: 24,
        }}
        onFinish={handleLogin}
      >
        <Form.Item
          label="Username"
          name="username"
          rule={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rule={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <div className="footer">
          <Link to="/register" color="orange">
            Don't have account? Register a new account
          </Link>
        </div>

        <Button type="primary" onClick={handleLogin}>Login</Button>
        <Button type="primary" onClick={handleLoginGoogle}>Login google</Button>
      </Form>
    </AuthenTemplate>
  );
}

export default LoginPage;
