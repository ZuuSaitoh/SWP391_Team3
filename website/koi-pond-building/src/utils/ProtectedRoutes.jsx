import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuthenticated = localStorage.getItem("authToken") !== null;
  const location = useLocation();
  const selectedService = localStorage.getItem("selectedService");

  // Check if user is trying to access payment page
  if (location.pathname === "/payment") {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    // If no service selected, redirect to services page
    if (!selectedService) {
      return <Navigate to="/" />;
    }
  }

  // For other protected routes, only check authentication
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
