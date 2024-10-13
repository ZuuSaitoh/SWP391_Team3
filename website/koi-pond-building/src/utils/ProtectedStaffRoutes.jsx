import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedStaffRoutes = () => {
  const isStaffAuthenticated = () => {
    const staffToken = localStorage.getItem('staffAuthToken'); // Changed from 'staffToken' to 'staffAuthToken'
    console.log('Staff token:', staffToken); // Debug log
    return !!staffToken;
  };

  const isAuthenticated = isStaffAuthenticated();
  console.log('Is staff authenticated:', isAuthenticated); // Debug log

  return isAuthenticated ? <Outlet /> : <Navigate to="/login-staff" />;
};

export default ProtectedStaffRoutes;
