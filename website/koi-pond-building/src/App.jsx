import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./page/homePage/homepage.jsx";
import LoginPage from "./page/login/login.jsx";
import RegisterPage from "./page/register/register.jsx";
import ForgotPassword from "./page/forgotpassword/forgotpassword.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "/forgotpassword", // Make sure this matches exactly
      element: <ForgotPassword />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
