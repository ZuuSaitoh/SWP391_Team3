import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedLoginStaffRoute = () => {
  const staffToken = localStorage.getItem("staffAuthToken");
  const currentPath = window.location.pathname;

  // If we're on the login-staff page and there's no token, allow access
  if (currentPath === "/login-staff" && !staffToken) {
    return <Outlet />;
  }

  // If there's no token and we're not on login-staff page, redirect to login
  if (!staffToken) {
    return <Navigate to="/login-staff" replace />;
  }

  try {
    const decodedToken = jwtDecode(staffToken);
    const staffRole = decodedToken.role;
    const staffId = decodedToken.staffID;

    // If we're on the login-staff page and have a valid token, redirect based on role
    if (currentPath === "/login-staff") {
      switch (staffRole) {
        case "Consulting Staff":
          return <Navigate to={`/consultingStaffPage/${staffId}`} replace />;
        case "Design Staff":
          return <Navigate to={`/designStaffPage/${staffId}`} replace />;
        case "Construction Staff":
          return <Navigate to={`/constructionStaffPage/${staffId}`} replace />;
        case "Manager":
          return <Navigate to="/dashboard" replace />;
        default:
          localStorage.clear(); // Clear all localStorage
          return <Navigate to="/login-staff" replace />;
      }
    }

    // For all other protected routes, just render the route
    return <Outlet />;
    
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.clear(); // Clear all localStorage
    return <Navigate to="/login-staff" replace />;
  }
};

export default ProtectedLoginStaffRoute;
