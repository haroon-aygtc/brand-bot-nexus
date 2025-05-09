/**
 * Authentication API Endpoints
 *
 * Defines the API endpoints for authentication operations
 */

export const authEndpoints = {
  // Authentication endpoints
  login: "/api/auth/login",
  register: "/api/auth/register",
  logout: "/api/auth/logout",
  refreshToken: "/api/auth/refresh-token",
  me: "/api/auth/me",

  // Password management
  forgotPassword: "/api/auth/forgot-password",
  resetPassword: "/api/auth/reset-password",
  changePassword: "/api/auth/change-password",

  // Email verification
  verifyEmail: "/api/auth/verify-email",
  resendVerification: "/api/auth/resend-verification",

  // Session management
  sessions: "/api/auth/sessions",
  revokeSession: (sessionId: string) => `/api/auth/sessions/${sessionId}/revoke`,

  // User profile
  profile: "/api/auth/profile",

  // Role and permission checks
  hasRole: (role: string) => `/api/auth/has-role/${role}`,
  hasPermission: (permission: string) => `/api/auth/has-permission/${permission}`,
};
