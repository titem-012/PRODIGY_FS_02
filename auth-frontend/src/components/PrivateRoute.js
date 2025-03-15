import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading state while the authentication check is happening
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or a more advanced loading UI.
  }

  // If authenticated, return the child component, otherwise redirect to login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
