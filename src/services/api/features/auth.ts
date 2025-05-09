
/**
 * Authentication API Service
 * 
 * This service handles all authentication-related API calls.
 */

import { api } from "../middleware/apiMiddleware";
import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse,
  ApiResponse 
} from "@/types/auth";

// Auth endpoints
export const authEndpoints = {
  login: "/auth/login",
  register: "/auth/register",
  me: "/auth/user",
  logout: "/auth/logout"
};

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const authApi = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<AuthResponse>(authEndpoints.login, credentials);
    
    if (response.success && response.data) {
      setAuthToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  },

  /**
   * Register a new user
   */
  register: async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<AuthResponse>(authEndpoints.register, data);
    
    if (response.success && response.data) {
      setAuthToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
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
    removeAuthToken();
    return response;
  }
};
