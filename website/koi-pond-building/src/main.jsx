import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Register from "./page/register/register.jsx";
import ForgotPassword from "./page/forgotpassword/forgotpassword.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById("root")).render(
    <>
      <App />
      <ToastContainer/>
    </>
);