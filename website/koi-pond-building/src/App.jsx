import Header from './component/Header/header.jsx'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import LoginPage from './page/login/login.jsx';
import RegisterPage from './page/register/register.jsx';

const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage/>,
  },

  {
    path: "register",
    element: <RegisterPage></RegisterPage>,
  },

  {
    path: "forgotPassword",
    element: <div>Hello world!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
//note

export default App
