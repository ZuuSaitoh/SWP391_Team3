import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLoginRoute = () => {
  const isAuthenticated = localStorage.getItem("authToken") !== null;

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedLoginRoute;
