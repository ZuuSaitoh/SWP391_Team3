import React from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
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
import ServiceViewDashboard from "./page/dashBoard/ServiceViewDashboard";
import ProtectedStaffRoutes from "./utils/ProtectedStaffRoutes.jsx";
import ContractViewDashBoard from "./page/dashBoard/contractViewDashBoard.jsx";
import ConstructionStaffPage from "./page/staffPage/constructionStaffPage/constructionStaffPage.jsx";
import PaymentPage from "./page/Payment/payment.jsx";
import ViewBookingDashboard from "./page/dashBoard/viewBookingDashboard";
import PaymentSuccess from "./page/Payment/success/paymentSuccess";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/service-design" element={<ServiceDesign />} />
        <Route path="/service-clean" element={<ServiceClean />} />
        <Route path="/service-maintenance" element={<ServiceMaintenance />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-staff" element={<LoginStaff />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Protected Customer Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/customer-profile/:customerId"
            element={<CustomerProfilePage />}
          />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Route>

        {/* Protected Staff Routes */}
        <Route element={<ProtectedStaffRoutes />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/staff/:Id" element={<StaffProfileDashBoard />} />
          <Route
            path="/designStaffPage/:staffId"
            element={<DesignStaffPage />}
          />
          <Route
            path="/consultingStaffPage/:staffId"
            element={<ConsultingStaffPage />}
          />
          <Route
            path="/constructionStaffPage/:staffId"
            element={<ConstructionStaffPage />}
          />
          <Route path="/order/:orderId" element={<OrderViewDashboard />} />
          <Route path="/customer/:Id" element={<CustomerProfileDashBoard />} />
          <Route
            path="/service/:serviceId"
            element={<ServiceViewDashboard />}
          />
          <Route
            path="/contract/:contractId"
            element={<ContractViewDashBoard />}
          />
          <Route
            path="/booking/:bookingId"
            element={<ViewBookingDashboard />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
