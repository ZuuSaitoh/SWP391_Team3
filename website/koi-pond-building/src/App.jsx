import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
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
import ServiceClean from "./page/serviceClean/serviceClean.jsx";
import ServiceMaintenance from "./page/serviceMaintenance/serviceMaintenance.jsx";

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
        {/* {location.pathname === "/" && <HomePage />}
        {location.pathname === "/service-design" && <ServiceDesign />}
        {location.pathname === "/login" && <LoginPage />}
        {location.pathname === "/register" && <RegisterPage />}
        {location.pathname === "/forgotpassword" && <ForgotPassword />}
        {location.pathname === "/customer-profile/:customerId" && (
          <CustomerProfilePage />
        )}
        {location.pathname === "/service-clean" && <ServiceClean />}
        {location.pathname === "/service-maintenance" && <ServiceMaintenance />} */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/service-design" element={<ServiceDesign />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/customer-profile/:customerId"
            element={<CustomerProfilePage />}
          />
          <Route path="/service-clean" element={<ServiceClean />} />
          <Route path="/service-maintenance" element={<ServiceMaintenance />} />
        </Routes>
      </AnimatedPage>
    </AnimatePresence>
  );
};

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "*",
  //     element: <AnimatedRoutes />,
  //   },
  //   {
  //     path: "/forgot-password",
  //     element: <ForgotPassword />,
  //   },
  // ]);

  // return <RouterProvider router={router} />;
  return (
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/service-design" element={<ServiceDesign />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route
      path="/customer-profile/:customerId"
      element={<CustomerProfilePage />}
    />
    <Route path="/service-clean" element={<ServiceClean />} />
    <Route path="/service-maintenance" element={<ServiceMaintenance />} />
  </Routes>
  )
}

export default App;
