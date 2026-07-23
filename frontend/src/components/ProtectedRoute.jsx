import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading, token } = useContext(AuthContext);

  if (loading) 
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!token || !user) 
    return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) {
    return 
    <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/supervisor/dashboard'} replace 
    />;
  }

  return children;
};

export default ProtectedRoute;