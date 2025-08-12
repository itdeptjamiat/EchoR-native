import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectToken, selectIsAuthenticated } from '@/redux/selectors';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const token = useAppSelector(selectToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // If no authentication, don't render children (will redirect from main layout)
  if (!token && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}; 