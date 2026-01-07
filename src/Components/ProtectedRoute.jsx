import React from 'react';
import { Navigate } from 'react-router-dom';

// Yeh component check karega ki token hai ya nahi
const ProtectedRoute = ({ children, tokenKey, redirectTo }) => {
  const token = localStorage.getItem(tokenKey);

  if (!token) {
    // Agar token nahi mila toh user ko login page par bhej do
    return <Navigate to={redirectTo} replace />;
  }

  // Agar token hai toh dashboard dikhao
  return children;
};

export default ProtectedRoute;