import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./index.css";
import HomePage from "./page/homePage/homepage.jsx";
import LoginPage from "./page/login/login.jsx";
import RegisterPage from "./page/register/register.jsx";
import ForgotPassword from "./page/forgotpassword/forgotpassword.jsx";
import CustomerProfilePage from "./page/CustomerProfilePage/CustomerProfilePage.jsx";
import ServiceDesign from "./page/serviceDesign/serviceDesign.jsx";
import AnimatedPage from "./page/animationpage/AnimatedPage.jsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <AnimatedPage key={location.pathname}>
        {location.pathname === "/" && <HomePage />}
        {location.pathname === "/service-design" && <ServiceDesign />}
        {location.pathname === "/login" && <LoginPage />}
        {location.pathname === "/register" && <RegisterPage />}
        {location.pathname === "/forgotpassword" && <ForgotPassword />}
        {location.pathname === "/customer-profile" && <CustomerProfilePage />}
      </AnimatedPage>
    </AnimatePresence>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <AnimatedRoutes />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
