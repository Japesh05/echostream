import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  isLoggedin,
  redirectPath = "/auth/login",
  children,
}) => {
  return isLoggedin ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
