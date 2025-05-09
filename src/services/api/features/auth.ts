/**
 * Authentication API Service
 *
 * This service provides methods for interacting with authentication endpoints.
 */

import { api, ApiResponse } from "../middleware/apiMiddleware";
import { setAuthToken, removeAuthToken } from "@/utils/auth";
import { authEndpoints } from "../endpoints/authEndpoints";
import {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  PasswordResetRequest,
  ResetPasswordRequest,
  PasswordUpdateData,
  VerifyEmailRequest,
  ResendVerificationRequest,
  UserSession
} from "@/types/auth";

export const authApi = {
  /**
   * Login with email and password
   */
  login: async (
    credentials: LoginCredentials,
  ): Promise<ApiResponse<AuthResponse>> => {
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
   * Logout the current user
   */
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await api.post<void>(authEndpoints.logout);
    removeAuthToken();
    localStorage.removeItem('user');
    return response;
  },

  /**
   * Get the current user's profile
   */
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return api.get<User>(authEndpoints.me);
  },

  /**
   * Update the current user's profile
   */
  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    return api.put<User>(authEndpoints.profile, data);
  },

  /**
   * Request a password reset
   */
  requestPasswordReset: async (data: PasswordResetRequest): Promise<ApiResponse<void>> => {
    return api.post<void>(authEndpoints.forgotPassword, data);
  },

  /**
   * Reset password with token
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<ApiResponse<void>> => {
    return api.post<void>(authEndpoints.resetPassword, data);
  },

  /**
   * Change current user's password
   */
  changePassword: async (
    data: PasswordUpdateData,
  ): Promise<ApiResponse<void>> => {
    return api.post<void>(authEndpoints.changePassword, data);
  },

  /**
   * Verify email with token
   */
  verifyEmail: async (data: VerifyEmailRequest): Promise<ApiResponse<void>> => {
    return api.post<void>(authEndpoints.verifyEmail, data);
  },

  /**
   * Resend verification email
   */
  resendVerification: async (data: ResendVerificationRequest): Promise<ApiResponse<void>> => {
    return api.post<void>(authEndpoints.resendVerification, data);
  },

  /**
   * Refresh the authentication token
   */
  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    const response = await api.post<{ token: string }>(authEndpoints.refreshToken);

    if (response.success && response.data) {
      setAuthToken(response.data.token);
    }

    return response;
  },

  /**
   * Get all active sessions for the current user
   */
  getSessions: async (): Promise<ApiResponse<UserSession[]>> => {
    return api.get<UserSession[]>(authEndpoints.sessions);
  },

  /**
   * Revoke a specific session
   */
  revokeSession: async (sessionId: string): Promise<ApiResponse<void>> => {
    return api.post<void>(authEndpoints.revokeSession(sessionId));
  },

  /**
   * Check if user has a specific role
   */
  hasRole: async (role: string): Promise<ApiResponse<{ hasRole: boolean }>> => {
    return api.get<{ hasRole: boolean }>(authEndpoints.hasRole(role));
  },

  /**
   * Check if user has a specific permission
   */
  hasPermission: async (permission: string): Promise<ApiResponse<{ hasPermission: boolean }>> => {
    return api.get<{ hasPermission: boolean }>(authEndpoints.hasPermission(permission));
  }
};
