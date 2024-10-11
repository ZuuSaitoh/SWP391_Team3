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
import ServiceClean from "./page/serviceClean/serviceClean.jsx";
import ServiceMaintenance from "./page/serviceMaintenance/serviceMaintenance.jsx";
import DashBoard from "./page/dashBoard/dashBoard.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import ChangePassword from "./page/changePassword/changePassword.jsx";
import CustomerProfileDashBoard from "./page/dashBoard/customerProfileDashBoard";
import StaffProfileDashBoard from "./page/dashBoard/staffProfileDashBoard";
import OrderViewDashboard from "./page/dashBoard/orderViewDashBoard";
import DesignStaffPage from "./page/staffPage/designStaffPage/designStaffPage.jsx";
import LoginStaff from "./page/login staff/loginStaff.jsx";
import ConsultingStaffPage from "./page/staffPage/consultingStaffPage/consultingStaffPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/service-design" element={<ServiceDesign />} />
      <Route path="/service-clean" element={<ServiceClean />} />
      <Route path="/service-maintenance" element={<ServiceMaintenance />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login-staff" element={<LoginStaff />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/customer-profile/:customerId"
          element={<CustomerProfilePage />}
        />
      </Route>
      <Route path="/dashboard" element={<DashBoard />} />

      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/customer/:Id" element={<CustomerProfileDashBoard />} />
      <Route path="/staff/:Id" element={<StaffProfileDashBoard />} />
      <Route path="/designStaffPage" element={<DesignStaffPage />} />
      <Route path="/order/:orderId" element={<OrderViewDashboard />} />
      <Route path="/consultingStaffPage" element={<ConsultingStaffPage/>}/>
    </Routes>
  );
}

export default App;
