
import { Role, Permission } from './mockDb';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  roles?: Role[];
  permissions?: Permission[];
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
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
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API specific response type
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: any;
}

export interface PasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  password_confirmation: string;
}

export interface PasswordUpdateData {
  current_password: string;
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
  id: string;
  user_id: string;
  ip_address?: string;
  user_agent?: string;
  last_active_at: string;
  created_at: string;
  is_current_session?: boolean;
}
