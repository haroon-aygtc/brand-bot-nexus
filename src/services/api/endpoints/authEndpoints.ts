
/**
 * Authentication API Endpoints
 *
 * Defines the API endpoints for authentication operations
 */

export const authEndpoints = {
  // Authentication endpoints
  login: "/auth/login",
  register: "/auth/register",
  logout: "/auth/logout",
  me: "/auth/user",

  // These are placeholders for future implementation
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  changePassword: "/auth/change-password",
  verifyEmail: "/auth/verify-email",
  resendVerification: "/auth/resend-verification",
  sessions: "/auth/sessions",
  profile: "/auth/profile",
  revokeSession: (sessionId: string) => `/auth/sessions/${sessionId}/revoke`,
  hasRole: (role: string) => `/auth/has-role/${role}`,
  hasPermission: (permission: string) => `/auth/has-permission/${permission}`,
};
