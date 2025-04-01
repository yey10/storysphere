import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) return <div>Cargando...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;

 
  if (!allowedRoles.includes(user?.role)) {
    return user?.role === "Admin" ? <Navigate to="/admin/home" /> : <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
