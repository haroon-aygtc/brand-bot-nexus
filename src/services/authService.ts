import { User, LoginCredentials, RegisterData } from "@/types/auth";
import logger from "@/utils/logger";
import { authApi } from "./api/features/auth";

/**
 * Authentication service for user management
 */
const authService = {
  /**
   * Register a new user
   * @param name User name
   * @param email User email
   * @param password User password
   * @returns User object and token
   */
  register: async (name: string, email: string, password: string) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.register, {
        name,
        email,
        password,
      });

      return response.data.data;
    } catch (error) {
      logger.error(
        "Error registering user",
        error instanceof Error ? error : new Error(String(error))
      );
      throw error;
    }

    try {
      const db = await getMySQLClient();

      // Check if user already exists
      const existingUsers = await db.query(
        "SELECT * FROM users WHERE email = ?",
        {
          replacements: [email],
          type: QueryTypes.SELECT,
        },
      );

      if (existingUsers.length > 0) {
        throw new Error("User with this email already exists");
      }

      // Hash password with appropriate cost factor
      const salt = await bcrypt.genSalt(12); // Higher cost factor for better security
      const hashedPassword = await bcrypt.hash(password, salt);

      // Generate verification token
      const userId = uuidv4();
      const verificationToken = uuidv4();
      const verificationExpires = new Date();
      verificationExpires.setHours(verificationExpires.getHours() + 24); // Token valid for 24 hours
      const now = new Date();

      // Create user with direct SQL query
      await db.query(
        "INSERT INTO users (id, email, full_name, password_hash, role, is_active, email_verified, verification_token, verification_token_expires, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        {
          replacements: [
            userId,
            email,
            name || email.split("@")[0],
            hashedPassword,
            "user",
            true,
            false,
            verificationToken,
            verificationExpires,
            now,
            now,
          ],
          type: QueryTypes.INSERT,
        },
      );

      // In a production environment, send verification email here
      logger.info(`Verification token for ${email}: ${verificationToken}`);

      // Fetch the created user
      const users = await db.query("SELECT * FROM users WHERE id = ?", {
        replacements: [userId],
        type: QueryTypes.SELECT,
      });

      if (users.length === 0) {
        throw new Error("Failed to create user");
      }

      return getSafeUser(users[0]);
    } catch (error) {
      logger.error(
        "Error registering user",
        error instanceof Error ? error : new Error(String(error)),
      );
      throw error;
    }
  },

  /**
   * Login a user
   * @param email User email
   * @param password User password
   * @returns User object and token
   */
  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.login, {
        email,
        password,
      });

      return response.data.data;
    } catch (error) {
      logger.error(
        "Error logging in user",
        error instanceof Error ? error : new Error(String(error))
      );
      throw error;
    }

    try {
      const db = await getMySQLClient();

      // Find user
      const users = await db.query("SELECT * FROM users WHERE email = ?", {
        replacements: [email],
        type: QueryTypes.SELECT,
      });

      if (users.length === 0) {
        throw new Error("Invalid credentials");
      }

      const user = users[0];

      // Check if user is active
      if (!user.is_active) {
        throw new Error("User account is disabled");
      }

      // Check if account is locked
      if (
        user.account_locked_until &&
        new Date(user.account_locked_until) > new Date()
      ) {
        const remainingTime = Math.ceil(
          (new Date(user.account_locked_until).getTime() - Date.now()) / 60000,
        );
        throw new Error(
          `Account is temporarily locked. Try again in ${remainingTime} minutes`,
        );
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password_hash || "");

      if (!isMatch) {
        // Increment failed login attempts
        const failedAttempts = (user.failed_login_attempts || 0) + 1;
        const now = new Date();

        // Lock account if max attempts reached
        if (failedAttempts >= MAX_LOGIN_ATTEMPTS) {
          const lockUntil = new Date(Date.now() + ACCOUNT_LOCK_TIME);

          await db.query(
            "UPDATE users SET failed_login_attempts = ?, account_locked_until = ?, updated_at = ? WHERE id = ?",
            {
              replacements: [failedAttempts, lockUntil, now, user.id],
              type: QueryTypes.UPDATE,
            },
          );

          logger.warn(
            `Account locked for ${email} due to too many failed login attempts`,
          );
        } else {
          await db.query(
            "UPDATE users SET failed_login_attempts = ?, updated_at = ? WHERE id = ?",
            {
              replacements: [failedAttempts, now, user.id],
              type: QueryTypes.UPDATE,
            },
          );
        }

        throw new Error("Invalid credentials");
      }

      // Reset failed login attempts and update last login time
      const now = new Date();
      await db.query(
        "UPDATE users SET failed_login_attempts = 0, account_locked_until = NULL, last_login_at = ?, updated_at = ? WHERE id = ?",
        {
          replacements: [now, now, user.id],
          type: QueryTypes.UPDATE,
        },
      );

      // Generate JWT token with appropriate claims
      const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        verified: user.email_verified || false,
      };

      const token = jwt.sign(tokenPayload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
        audience: "chat-widget-app",
        issuer: "chat-widget-auth-service",
      });

      // Calculate token expiration time
      const expiresIn =
        typeof JWT_EXPIRES_IN === "string" && JWT_EXPIRES_IN.endsWith("h")
          ? parseInt(JWT_EXPIRES_IN.slice(0, -1)) * 60 * 60 * 1000
          : 24 * 60 * 60 * 1000; // Default to 24 hours

      return {
        user: getSafeUser(user),
        token,
        session: {
          access_token: token,
          expires_at: new Date(Date.now() + expiresIn).toISOString(),
        },
      };
    } catch (error) {
      logger.error(
        "Error logging in user",
        error instanceof Error ? error : new Error(String(error)),
      );
      throw error;
    }
  },

  /**
   * Logout the current user
   */
  logout: async () => {
    try {
      await api.post(AUTH_ENDPOINTS.logout);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { success: true };
    } catch (error) {
      logger.error(
        "Error logging out user",
        error instanceof Error ? error : new Error(String(error))
      );
      throw error;
    }
  },

  /**
   * Get the current authenticated user
   */
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await api.get(AUTH_ENDPOINTS.me);
      return response.data.data;
    } catch (error) {
      logger.error(
        "Error getting current user",
        error instanceof Error ? error : new Error(String(error))
      );
      return null;
    }
  },

  /**
   * Check if user has a specific role
   * @param role Role to check
   * @returns Boolean indicating if user has the role
   */
  hasRole: async (role: string): Promise<boolean> => {
    try {
      const response = await api.get(AUTH_ENDPOINTS.hasRole(role));
      return response.data.data.hasRole;
    } catch (error) {
      logger.error(
        `Error checking role ${role}`,
        error instanceof Error ? error : new Error(String(error))
      );
      return false;
    }
  },

  /**
   * Check if user has a specific permission
   * @param permission Permission to check
   * @returns Boolean indicating if user has the permission
   */
  hasPermission: async (permission: string): Promise<boolean> => {
    try {
      const response = await api.get(AUTH_ENDPOINTS.hasPermission(permission));
      return response.data.data.hasPermission;
    } catch (error) {
      logger.error(
        `Error checking permission ${permission}`,
        error instanceof Error ? error : new Error(String(error))
      );
      return false;
    }
  },

  /**
   * Refresh the authentication token
   */
  refreshToken: async () => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.refreshToken);
      return response.data.data;
    } catch (error) {
      logger.error(
        "Error refreshing token",
        error instanceof Error ? error : new Error(String(error))
      );
      throw error;
    }
  },

  /**
   * Update user profile
   * @param updates User profile updates
   * @returns Updated user object
   */
  updateProfile: async (updates: any) => {
    try {
      const response = await api.put(`${API_URL}/auth/profile`, updates);
      return response.data.data;
    } catch (error) {
      logger.error(
        "Error updating profile",
        error instanceof Error ? error : new Error(String(error))
      );
      throw error;
    }
  },

};

export default authService;
