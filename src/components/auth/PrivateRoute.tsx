import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'user' | string[];
}

/**
 * PrivateRoute component
 * 
 * Protects routes that require authentication
 * Optionally checks for specific roles
 */
const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [isCheckingRole, setIsCheckingRole] = useState(Boolean(requiredRole));
  
  useEffect(() => {
    if (requiredRole && user) {
      setIsCheckingRole(false);
    }
  }, [requiredRole, user]);

  // Show loading while checking authentication
  if (isLoading || isCheckingRole) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Check for required role if specified
  if (requiredRole && user) {
    // If requiredRole is an array, check if user has any of the roles
    if (Array.isArray(requiredRole)) {
      if (!requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
      }
    } 
    // Otherwise check if user has the specific role
    else if (user.role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User is authenticated and has required role, render children
  return <>{children}</>;
};

export default PrivateRoute;
