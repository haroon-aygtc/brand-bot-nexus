/**
 * Chat API Service
 *
 * This service provides methods for interacting with chat endpoints.
 */

import { api, ApiResponse } from "../middleware/apiMiddleware";

export interface ChatSession {
  id: string;
  userId: string;
  widgetId?: string;
  contextRuleId?: string;
  status: "active" | "closed" | "archived";
  metadata?: Record<string, string | number | boolean>;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string;
  messageCount: number;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  userId: string;
  content: string;
  type: "user" | "system" | "ai";
  role?: "user" | "assistant" | "system"; // For backward compatibility
  metadata?: Record<string, string | number | boolean>;
  attachments?: ChatAttachment[];
  status?: "pending" | "delivered" | "read" | "moderated";
  createdAt: string;
}

export interface ChatAttachment {
  id: string;
  messageId: string;
  type: "image" | "file" | "audio" | "video";
  url: string;
  filename: string;
  filesize: number;
  metadata?: Record<string, string | number | boolean>;
  createdAt: string;
}

export interface SendMessageRequest {
  sessionId: string;
  content: string;
  type?: "user" | "system" | "ai";
  role?: "user" | "assistant" | "system"; // For backward compatibility
  metadata?: Record<string, string | number | boolean>;
  attachments?: Omit<ChatAttachment, "id" | "messageId" | "createdAt">[];
}

export interface CreateSessionRequest {
  userId?: string;
  guestId?: string;
  widgetId?: string;
  contextRuleId?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface SessionQueryParams {
  status?: "active" | "closed" | "archived";
  page?: number;
  limit?: number;
}

export interface MessageQueryParams {
  limit?: number;
  before?: string;
}

export interface ChatAnalytics {
  totalSessions: number;
  activeSessions: number;
  totalMessages: number;
  averageMessagesPerSession: number;
  messagesByType: Record<string, number>;
  sessionsOverTime: Array<{ date: string; count: number }>;
  messagesOverTime: Array<{ date: string; count: number }>;
}

export interface CreateSessionResponse {
  success: boolean;
  data?: ChatSession;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export const chatApi = {
  /**
   * Get all chat sessions
   */
  getSessions: async (
    params: SessionQueryParams = {}
  ): Promise<ApiResponse<{ sessions: ChatSession[]; totalCount: number }>> => {
    return api.get<{ sessions: ChatSession[]; totalCount: number }>(
      "/chat/sessions",
      { params }
    );
  },

  /**
   * Get a chat session by ID
   */
  getSession: async (id: string): Promise<ApiResponse<ChatSession>> => {
    return api.get<ChatSession>(`/chat/sessions/${id}`);
  },

  /**
   * Create a new chat session with enhanced error handling
   */
  createSession: async (
    data: CreateSessionRequest
  ): Promise<ApiResponse<CreateSessionResponse>> => {
    try {
      if (!data.userId && !data.guestId) {
        return {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Either userId or guestId is required",
          },
        };
      }

      const sessionData = {
        ...data,
        status: "active" as const,
        createdAt: new Date().toISOString(),
        messageCount: 0,
      };

      const response = await api.post<ChatSession>(
        "/chat/sessions",
        sessionData
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Handle API errors
        const apiError = error as any; // temporary cast to handle response property
        if (apiError.response?.status === 401) {
          return {
            success: false,
            error: {
              code: "UNAUTHORIZED",
              message: "Authentication required to create chat session",
            },
          };
        }

        if (apiError.response?.status === 400) {
          return {
            success: false,
            error: {
              code: "VALIDATION_ERROR",
              message: "Invalid session data provided",
              details: apiError.response.data,
            },
          };
        }

        return {
          success: false,
          error: {
            code: "SERVER_ERROR",
            message: "Failed to create chat session",
            details: error.message,
          },
        };
      }

      // Handle unknown errors
      return {
        success: false,
        error: {
          code: "UNKNOWN_ERROR",
          message: "An unexpected error occurred",
        },
      };
    }
  },

  /**
   * Update a chat session
   */
  updateSession: async (
    id: string,
    data: Partial<ChatSession>
  ): Promise<ApiResponse<ChatSession>> => {
    return api.put<ChatSession>(`/chat/sessions/${id}`, data);
  },

  /**
   * Delete a chat session
   */
  deleteSession: async (id: string): Promise<ApiResponse<boolean>> => {
    return api.delete<boolean>(`/chat/sessions/${id}`);
  },

  /**
   * Get messages for a chat session
   */
  getSessionMessages: async (
    sessionId: string,
    params: MessageQueryParams = {}
  ): Promise<ApiResponse<{ messages: ChatMessage[]; hasMore: boolean }>> => {
    return api.get<{ messages: ChatMessage[]; hasMore: boolean }>(
      `/chat/sessions/${sessionId}/messages`,
      { params }
    );
  },

  /**
   * Send a message in a chat session
   */
  sendMessage: async (
    data: SendMessageRequest
  ): Promise<ApiResponse<ChatMessage>> => {
    return api.post<ChatMessage>("/chat/messages", data);
  },

  /**
   * Get a message by ID
   */
  getMessageById: async (id: string): Promise<ApiResponse<ChatMessage>> => {
    return api.get<ChatMessage>(`/chat/messages/${id}`);
  },

  /**
   * Update a message
   */
  updateMessage: async (
    id: string,
    data: Partial<ChatMessage>
  ): Promise<ApiResponse<ChatMessage>> => {
    return api.put<ChatMessage>(`/chat/messages/${id}`, data);
  },

  /**
   * Delete a message
   */
  deleteMessage: async (id: string): Promise<ApiResponse<boolean>> => {
    return api.delete<boolean>(`/chat/messages/${id}`);
  },

  /**
   * Mark messages as read
   */
  markMessagesAsRead: async (
    sessionId: string,
    messageIds: string[]
  ): Promise<ApiResponse<boolean>> => {
    return api.post<boolean>(`/chat/sessions/${sessionId}/read`, {
      messageIds,
    });
  },

  /**
   * Get chat sessions for a user
   */
  getSessionsByUser: async (
    userId: string,
    params: SessionQueryParams = {}
  ): Promise<ApiResponse<{ sessions: ChatSession[]; totalCount: number }>> => {
    return api.get<{ sessions: ChatSession[]; totalCount: number }>(
      `/chat/users/${userId}/sessions`,
      { params }
    );
  },

  /**
   * Get chat sessions for a widget
   */
  getSessionsByWidget: async (
    widgetId: string,
    params: SessionQueryParams = {}
  ): Promise<ApiResponse<{ sessions: ChatSession[]; totalCount: number }>> => {
    return api.get<{ sessions: ChatSession[]; totalCount: number }>(
      `/chat/widgets/${widgetId}/sessions`,
      { params }
    );
  },

  /**
   * Upload a file attachment
   */
  uploadAttachment: async (
    file: File,
    sessionId: string
  ): Promise<
    ApiResponse<{ url: string; filename: string; filesize: number }>
  > => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sessionId", sessionId);

    return api.post<{ url: string; filename: string; filesize: number }>(
      "/chat/attachments/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  /**
   * Get attachments for a message
   */
  getMessageAttachments: async (
    messageId: string
  ): Promise<ApiResponse<ChatAttachment[]>> => {
    return api.get<ChatAttachment[]>(`/chat/messages/${messageId}/attachments`);
  },

  /**
   * Delete an attachment
   */
  deleteAttachment: async (
    attachmentId: string
  ): Promise<ApiResponse<boolean>> => {
    return api.delete<boolean>(`/chat/attachments/${attachmentId}`);
  },

  /**
   * Archive a chat session
   */
  archiveSession: async (id: string): Promise<ApiResponse<ChatSession>> => {
    return api.put<ChatSession>(`/chat/sessions/${id}`, { status: "archived" });
  },

  /**
   * Close a chat session
   */
  closeSession: async (id: string): Promise<ApiResponse<ChatSession>> => {
    return api.put<ChatSession>(`/chat/sessions/${id}`, { status: "closed" });
  },

  /**
   * Reopen a chat session
   */
  reopenSession: async (id: string): Promise<ApiResponse<ChatSession>> => {
    return api.put<ChatSession>(`/chat/sessions/${id}`, { status: "active" });
  },

  /**
   * Get chat analytics
   */
  getAnalytics: async (
    timeRange: string = "7d"
  ): Promise<ApiResponse<ChatAnalytics>> => {
    return api.get<ChatAnalytics>("/chat/analytics", { params: { timeRange } });
  },

  /**
   * Export chat session history
   */
  exportSessionHistory: async (
    sessionId: string,
    format: "json" | "csv" | "pdf" = "json"
  ): Promise<ApiResponse<Blob>> => {
    return api.get<Blob>(`/chat/sessions/${sessionId}/export`, {
      params: { format },
      responseType: "blob",
    });
  },

  /**
   * Get recent chat activity
   */
  getRecentActivity: async (
    limit: number = 10
  ): Promise<
    ApiResponse<{
      recentSessions: ChatSession[];
      recentMessages: ChatMessage[];
    }>
  > => {
    return api.get<{
      recentSessions: ChatSession[];
      recentMessages: ChatMessage[];
    }>("/chat/recent-activity", { params: { limit } });
  },
};
