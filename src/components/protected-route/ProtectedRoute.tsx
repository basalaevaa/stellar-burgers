import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

interface ProtectedRouteProps {
  element: React.ReactElement;
  requiresAuth: boolean;
}

export const ProtectedRoute = ({
  element,
  requiresAuth
}: ProtectedRouteProps): ReactElement => {
  const isAuthenticated = useSelector((state) => state.user.isAuthVerified);
  const location = useLocation();

  if (requiresAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (!requiresAuth && isAuthenticated) {
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  return element;
};
