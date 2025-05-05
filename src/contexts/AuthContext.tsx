
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';
import { User } from '@/types/mockDb';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  hasPermission: (requiredRole: 'admin' | 'user' | 'guest') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin user for demo purposes
const DEMO_ADMIN_USER: User = {
  id: 'admin-demo-1',
  name: 'Demo Admin',
  email: 'admin@example.com',
  role: 'admin',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Demo admin credentials
const DEMO_ADMIN_EMAIL = 'admin@example.com';
const DEMO_ADMIN_PASSWORD = 'admin123';

// Token refresh interval (5 minutes)
const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is authenticated on initial load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Check if we have a demo admin token
          if (token === 'demo-admin-token') {
            setUser(DEMO_ADMIN_USER);
          } else {
            const currentUser = await api.auth.getCurrentUser();
            setUser(currentUser);
          }
        }
      } catch (error) {
        // Token invalid or expired
        localStorage.removeItem('authToken');
        console.error('Authentication error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Set up token refresh
  useEffect(() => {
    if (!user || user.id === DEMO_ADMIN_USER.id) return; // Skip for demo admin

    const refreshToken = async () => {
      try {
        // Implement token refresh logic here
        await api.auth.refreshToken();
      } catch (error) {
        console.error('Token refresh error:', error);
        // If refresh fails, log out the user
        if (error instanceof Error && error.message === 'Token expired') {
          logout();
          toast({
            title: "Session expired",
            description: "Your session has expired. Please log in again.",
            variant: "destructive",
          });
        }
      }
    };

    const intervalId = setInterval(refreshToken, TOKEN_REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, [user, toast]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Check if using demo admin credentials
      if (email === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
        // Set demo admin user and token
        setUser(DEMO_ADMIN_USER);
        localStorage.setItem('authToken', 'demo-admin-token');
        
        toast({
          title: "Demo admin login successful",
          description: "You're now logged in as a demo administrator",
        });
        
        setIsLoading(false);
        return;
      }
      
      // Regular login flow
      const { user, token } = await api.auth.login(email, password);
      
      // Properly format Laravel user data to match our frontend User type
      const formattedUser: User = {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenant_id ? user.tenant_id.toString() : undefined,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      };
      setUser(formattedUser);
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { user, token } = await api.auth.register({ name, email, password });
      // Properly format Laravel user data to match our frontend User type
      const formattedUser: User = {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenant_id ? user.tenant_id.toString() : undefined,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      };
      setUser(formattedUser);
      toast({
        title: "Registration successful",
        description: `Welcome, ${user.name}!`,
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Could not create account",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Only attempt API logout for real users, not demo admin
      if (user && user.id !== DEMO_ADMIN_USER.id) {
        await api.auth.logout();
      }
      
      // Always clear local state
      localStorage.removeItem('authToken');
      setUser(null);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error instanceof Error ? error.message : "Could not log out",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add password reset functionality
  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    try {
      await api.auth.requestPasswordReset(email);
      toast({
        title: "Password reset email sent",
        description: "Check your email for instructions to reset your password",
      });
    } catch (error) {
      toast({
        title: "Password reset request failed",
        description: error instanceof Error ? error.message : "Could not request password reset",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setIsLoading(true);
    try {
      await api.auth.resetPassword(token, newPassword);
      toast({
        title: "Password reset successful",
        description: "Your password has been updated. You can now log in with your new password.",
      });
    } catch (error) {
      toast({
        title: "Password reset failed",
        description: error instanceof Error ? error.message : "Could not reset password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Add role-based access control
  const hasPermission = (requiredRole: 'admin' | 'user' | 'guest') => {
    if (!user) return false;
    if (requiredRole === 'guest') return true;
    if (requiredRole === 'user') return ['user', 'admin'].includes(user.role);
    if (requiredRole === 'admin') return user.role === 'admin';
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        requestPasswordReset,
        resetPassword,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
