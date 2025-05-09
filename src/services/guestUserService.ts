import { v4 as uuidv4 } from "uuid";
import logger from "@/utils/logger";
import { api, ApiResponse } from "./api/middleware/apiMiddleware";
import { guestUserEndpoints } from "./api/endpoints/guestUserEndpoints";

export interface GuestUser {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  ipAddress?: string;
  userAgent?: string;
  status: "active" | "inactive" | "blocked";
  createdAt: string;
  updatedAt: string;
}

export interface GuestSession {
  id: string;
  guestId: string;
  sessionToken: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface GuestActivity {
  id: string;
  guestId: string;
  action: string;
  metadata?: Record<string, string | number | boolean>;
  ipAddress?: string;
  createdAt: string;
}

export interface CreateGuestUserRequest {
  fullName: string;
  phoneNumber: string;
  email?: string;
  ipAddress?: string;
  userAgent?: string;
}

const guestUserService = {
  /**
   * Create a new guest user and session
   */
  createGuestUser: async (
    userData: CreateGuestUserRequest
  ): Promise<ApiResponse<{ user: GuestUser; session: GuestSession }>> => {
    try {
      logger.info(`Attempting to create guest user with data:`, {
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber?.substring(0, 3) + "***", // Log partial phone for debugging
      });

      // First check if the API server is available
      try {
        const healthCheck = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/health`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!healthCheck.ok) {
          throw new Error("API server is not available");
        }
      } catch (healthError) {
        logger.error("API server health check failed:", healthError);
        throw new Error("API server is not available. Please try again later.");
      }

      const response = await api.post<{
        user: GuestUser;
        session: GuestSession;
      }>(guestUserEndpoints.createGuestUser, userData);

      logger.info(
        `Guest user created successfully with ID: ${response?.data?.user?.id}`
      );

      // Log the full response for debugging
      console.log("Guest user registration response:", response);
      return response;
    } catch (error) {
      logger.error("Error creating guest user:", error);

      // More detailed error handling
      const errorMessage =
        error?.response?.data?.error?.message ||
        error?.message ||
        "Failed to create guest user";
      const statusCode = error?.response?.status || 500;

      return {
        success: false,
        error: {
          message: errorMessage,
          code: `ERR_CREATE_GUEST_${statusCode}`,
          details: { statusCode },
        },
        data: null,
      };
    }
  },

  /**
   * Get guest user by session token
   */
  getGuestUserBySession: async (
    sessionToken: string
  ): Promise<ApiResponse<GuestUser>> => {
    try {
      return await api.get<GuestUser>(
        guestUserEndpoints.getGuestUserBySession,
        {
          params: { sessionToken },
        }
      );
    } catch (error) {
      logger.error("Error getting guest user by session:", error);
      return {
        success: false,
        error: {
          message: "Failed to get guest user",
          code: "ERR_GET_GUEST",
        },
        data: null,
      };
    }
  },

  /**
   * Log guest user activity
   */
  logGuestActivity: async (
    guestId: string,
    action: string,
    metadata?: Record<string, string | number | boolean>
  ): Promise<ApiResponse<GuestActivity>> => {
    try {
      return await api.post<GuestActivity>(
        guestUserEndpoints.logGuestActivity,
        {
          guestId,
          action,
          metadata,
        }
      );
    } catch (error) {
      logger.error("Error logging guest activity:", error);
      return {
        success: false,
        error: {
          message: "Failed to log guest activity",
          code: "ERR_LOG_ACTIVITY",
        },
        data: null,
      };
    }
  },

  /**
   * Get guest activities by guest ID
   */
  getGuestActivities: async (
    guestId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<
    ApiResponse<{ activities: GuestActivity[]; totalCount: number }>
  > => {
    try {
      return await api.get<{ activities: GuestActivity[]; totalCount: number }>(
        guestUserEndpoints.getGuestActivities(guestId),
        {
          params: { limit, offset },
        }
      );
    } catch (error) {
      logger.error("Error getting guest activities:", error);
      return {
        success: false,
        error: {
          message: "Failed to get guest activities",
          code: "ERR_GET_ACTIVITIES",
        },
        data: null,
      };
    }
  },

  /**
   * Get all guest users with pagination
   */
  getAllGuestUsers: async (
    limit: number = 50,
    offset: number = 0,
    filters?: { status?: string; search?: string }
  ): Promise<ApiResponse<{ users: GuestUser[]; totalCount: number }>> => {
    try {
      return await api.get<{ users: GuestUser[]; totalCount: number }>(
        guestUserEndpoints.getAllGuestUsers,
        {
          params: { limit, offset, ...filters },
        }
      );
    } catch (error) {
      logger.error("Error getting all guest users:", error);
      return {
        success: false,
        error: {
          message: "Failed to get guest users",
          code: "ERR_GET_GUESTS",
        },
        data: null,
      };
    }
  },

  /**
   * Update guest user status
   */
  updateGuestUserStatus: async (
    guestId: string,
    status: "active" | "inactive" | "blocked"
  ): Promise<ApiResponse<GuestUser>> => {
    try {
      return await api.put<GuestUser>(
        guestUserEndpoints.updateGuestUserStatus(guestId),
        { status }
      );
    } catch (error) {
      logger.error("Error updating guest user status:", error);
      return {
        success: false,
        error: {
          message: "Failed to update guest user status",
          code: "ERR_UPDATE_GUEST",
        },
        data: null,
      };
    }
  },
};

export default guestUserService;
