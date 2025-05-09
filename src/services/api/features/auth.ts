
/**
 * Authentication API Service
 * 
 * This service handles all authentication-related API calls.
 */

import { api } from "../middleware/apiMiddleware";
import { authEndpoints } from "../endpoints/authEndpoints";
import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse,
  ApiResponse 
} from "@/types/auth";

// Set user in localStorage
export const setAuthUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Remove user from localStorage
export const removeAuthUser = (): void => {
  localStorage.removeItem('user');
};

// Get user from localStorage
export const getAuthUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const authApi = {
  /**
   * Get CSRF cookie for Sanctum
   */
  getCsrfCookie: async (): Promise<void> => {
    await fetch('/sanctum/csrf-cookie', {
      credentials: 'include'
    });
  },

  /**
   * Login with email and password
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    // Get CSRF cookie first (Sanctum requirement)
    await authApi.getCsrfCookie();
    
    const response = await api.post<AuthResponse>(authEndpoints.login, credentials);
    
    if (response.success && response.data) {
      setAuthUser(response.data.user);
    }
    
    return response;
  },

  /**
   * Register a new user
   */
  register: async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    // Get CSRF cookie first (Sanctum requirement)
    await authApi.getCsrfCookie();
    
    const response = await api.post<AuthResponse>(authEndpoints.register, data);
    
    if (response.success && response.data) {
      setAuthUser(response.data.user);
    }
    
    return response;
  },

  /**
   * Get the current authenticated user
   */
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return api.get<User>(authEndpoints.me);
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await api.post<void>(authEndpoints.logout, {});
    removeAuthUser();
    return response;
  }
};
