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
import ChangePassword from "./page/changePassword/changePassword.jsx";
import CustomerProfileDashBoard from "./page/dashBoard/customerProfileDashBoard";
import StaffProfileDashBoard from "./page/dashBoard/staffProfileDashBoard";
import OrderViewDashboard from "./page/dashBoard/orderViewDashBoard";
import DesignStaffPage from "./page/staffPage/designStaffPage/designStaffPage.jsx";
import LoginStaff from "./page/login staff/loginStaff.jsx";
import ConsultingStaffPage from "./page/staffPage/consultingStaffPage/consultingStaffPage.jsx";
import ServiceViewDashboard from "./page/dashBoard/ServiceViewDashboard";
import ContractViewDashBoard from "./page/dashBoard/contractViewDashBoard.jsx";
import ConstructionStaffPage from "./page/staffPage/constructionStaffPage/constructionStaffPage.jsx";
import PaymentPage from "./page/Payment/payment.jsx";
import ViewBookingDashboard from "./page/dashBoard/viewBookingDashboard";
import PaymentSuccess from "./page/Payment/success/paymentSuccess";
import PaymentFailed from "./page/Payment/failed/paymentFailed";
import BlogDetail from "./components/BlogDetail/BlogDetail";
import ProtectedLoginRoute from "./utils/ProtectedLoginRoute.jsx";
import ProtectedLoginStaffRoute from "./utils/ProtectedLoginStaffRoute.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import ProtectedStaffRoutes from "./utils/ProtectedStaffRoutes.jsx";
import { ToastConfig } from "./components/ToastConfig";

function App() {
  return (
    <>
      <ScrollToTop />
      <ToastConfig />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/service-design" element={<ServiceDesign />} />
        <Route path="/service-clean" element={<ServiceClean />} />
        <Route path="/service-maintenance" element={<ServiceMaintenance />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />

        {/* Protected Customer Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route
            path="/customer-profile/:customerId"
            element={<CustomerProfilePage />}
          />
        </Route>

        {/* Manager-only routes */}
        <Route element={<ProtectedStaffRoutes allowedRoles={["Manager"]} />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/staff/:Id" element={<StaffProfileDashBoard />} />
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

        {/* Staff-specific routes */}
        <Route
          element={<ProtectedStaffRoutes allowedRoles={["Design Staff"]} />}
        >
          <Route
            path="/designStaffPage/:staffId"
            element={<DesignStaffPage />}
          />
        </Route>

        <Route
          element={<ProtectedStaffRoutes allowedRoles={["Consulting Staff"]} />}
        >
          <Route
            path="/consultingStaffPage/:staffId"
            element={<ConsultingStaffPage />}
          />
        </Route>

        <Route
          element={
            <ProtectedStaffRoutes allowedRoles={["Construction Staff"]} />
          }
        >
          <Route
            path="/constructionStaffPage/:staffId"
            element={<ConstructionStaffPage />}
          />
        </Route>

        {/* Common routes for all staff */}
        <Route
          element={
            <ProtectedStaffRoutes
              allowedRoles={[
                "Manager",
                "Design Staff",
                "Consulting Staff",
                "Construction Staff",
              ]}
            />
          }
        >
          <Route path="/order/:orderId" element={<OrderViewDashboard />} />
        </Route>

        {/* Protected LoginRoute Routes */}
        <Route element={<ProtectedLoginRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Route>

        {/* Protected LoginStaff Routes */}
        <Route element={<ProtectedLoginStaffRoute />}>
          <Route path="/login-staff" element={<LoginStaff />} />
        </Route>

        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </>
  );
}

export default App;
