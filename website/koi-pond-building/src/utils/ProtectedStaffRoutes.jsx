import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedStaffRoutes = ({ allowedRoles }) => {
  const token = localStorage.getItem("staffAuthToken");

  if (!token) {
    return <Navigate to="/login-staff" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    // Check if user's role is included in the allowed roles
    if (!allowedRoles.includes(userRole)) {
      // Redirect based on role if trying to access unauthorized route
      switch (userRole) {
        case "Consulting Staff":
          return (
            <Navigate
              to={`/consultingStaffPage/${decodedToken.staffID}`}
              replace
            />
          );
        case "Design Staff":
          return (
            <Navigate to={`/designStaffPage/${decodedToken.staffID}`} replace />
          );
        case "Construction Staff":
          return (
            <Navigate
              to={`/constructionStaffPage/${decodedToken.staffID}`}
              replace
            />
          );
        default:
          return <Navigate to="/login-staff" replace />;
      }
    }

    return <Outlet />;
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login-staff" replace />;
  }
};

export default ProtectedStaffRoutes;
