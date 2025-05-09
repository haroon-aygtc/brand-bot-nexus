import { Permission, Role } from './role';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  avatar_url?: string;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
  roles?: Role[];
  permissions?: Permission[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
  avatar_url?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LogoutResponse {
  message: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  avatar_url?: string;
}

export interface PasswordUpdateData {
  current_password?: string;
  password: string;
  password_confirmation: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface UserSession {
  id: number;
  user_id: number;
  ip_address?: string;
  user_agent?: string;
  last_active_at: string;
  created_at: string;
  is_current_session?: boolean;
}
