
/**
 * Authentication Service
 * 
 * This service provides authentication functionality using the API layer.
 */

import { User, LoginCredentials, RegisterData } from "@/types/auth";
import { authApi } from "./api/features/auth";

/**
 * Authentication service for user management
 */
const authService = {
  /**
   * Login a user
   */
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);
      
      if (!response.success) {
        throw new Error(response.message || 'Login failed');
      }
      
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  /**
   * Register a new user
   */
  register: async (data: RegisterData) => {
    try {
      const response = await authApi.register(data);
      
      if (!response.success) {
        throw new Error(response.message || 'Registration failed');
      }
      
      return response.data;
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  },

  /**
   * Get the current authenticated user
   */
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await authApi.getCurrentUser();
      
      if (!response.success) {
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },

  /**
   * Logout the current user
   */
  logout: async () => {
    try {
      await authApi.logout();
      return { success: true };
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },

  /**
   * Clear localStorage
   */
  clearLocalStorage: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Refresh token - not implemented in the backend yet
   */
  refreshToken: async () => {
    console.warn('Token refresh not implemented in the backend.');
    throw new Error('Token refresh not implemented');
  }
};

export default authService;
