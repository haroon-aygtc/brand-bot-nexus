
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user' | 'guest';
}

const ProtectedRoute = ({ children, requiredRole = 'user' }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to the login page with a return url
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // Check if user has the required role using the hasPermission function
  if (!hasPermission(requiredRole)) {
    // Redirect to the home page if user doesn't have the required permission
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
