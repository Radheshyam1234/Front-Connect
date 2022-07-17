import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthentication } from "./AuthenticationSlice";

export const PrivateRoute = ({ children }) => {
  const { token } = useAuthentication();
  const location = useLocation();
  //   const token = localStorage.getItem("token");

  return token ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};
