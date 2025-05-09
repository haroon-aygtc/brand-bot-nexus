import logger from "@/utils/logger";
import { chatApi } from "./api/features/chat";
import type {
  ChatSession as ApiChatSession,
  ChatMessage as ApiChatMessage,
} from "./api/features/chat";

export interface ChatMessage {
  id: string;
  session_id: string;
  user_id?: string;
  content: string;
  type: "user" | "assistant" | "system";
  metadata?: Record<string, string | number | boolean>;
  created_at: Date;
}

export interface ChatSession {
  id: string;
  user_id?: string;
  widget_id?: string;
  status: "active" | "closed" | "archived";
  metadata?: Record<string, string | number | boolean>;
  created_at: Date;
  updated_at: Date;
}

// Helper function to convert API ChatSession to local ChatSession format
const mapApiSessionToLocal = (apiSession: ApiChatSession): ChatSession => ({
  id: apiSession.id,
  user_id: apiSession.userId,
  widget_id: apiSession.widgetId,
  status: apiSession.status,
  metadata: apiSession.metadata,
  created_at: new Date(apiSession.createdAt),
  updated_at: new Date(apiSession.updatedAt),
});

// Helper function to convert API ChatMessage to local ChatMessage format
const mapApiMessageToLocal = (apiMessage: ApiChatMessage): ChatMessage => ({
  id: apiMessage.id,
  session_id: apiMessage.sessionId,
  user_id: apiMessage.userId,
  content: apiMessage.content,
  type: apiMessage.type === "ai" ? "assistant" : apiMessage.type,
  metadata: apiMessage.metadata,
  created_at: new Date(apiMessage.createdAt),
});

const chatService = {
  /**
   * Create a new chat session
   */
  createSession: async (
    params:
      | {
          userId?: string;
          guestId?: string;
          widgetId?: string;
          metadata?: Record<string, string | number | boolean>;
        }
      | string = {}, // Accept either an object or a string (for backward compatibility)
    widgetId?: string,
    metadata?: Record<string, string | number | boolean>
  ): Promise<ChatSession> => {
    try {
      // Handle different parameter formats
      let sessionParams: any = {};

      if (typeof params === "string") {
        // Old format: userId as first parameter
        sessionParams.userId = params;
        sessionParams.widgetId = widgetId;
        sessionParams.metadata = metadata;
      } else {
        // New format: object with parameters
        sessionParams = params;
      }

      console.log("Creating chat session with params:", sessionParams);

      const response = await chatApi.createSession(sessionParams);

      if (!response.success || !response.data) {
        throw new Error(
          response.error?.message || "Failed to create chat session"
        );
      }

      return mapApiSessionToLocal(response.data);
    } catch (error) {
      logger.error("Error creating chat session:", error);
      throw new Error(`Failed to create chat session: ${error.message}`);
    }
  },

  /**
   * Get a chat session by ID
   */
  getSessionById: async (sessionId: string): Promise<ChatSession | null> => {
    try {
      const response = await chatApi.getSession(sessionId);

      if (!response.success) {
        if (response.error?.code === "ERR_404") {
          return null;
        }
        throw new Error(
          response.error?.message || "Failed to fetch chat session"
        );
      }

      return response.data ? mapApiSessionToLocal(response.data) : null;
    } catch (error) {
      logger.error(`Error fetching chat session ${sessionId}:`, error);
      throw new Error(`Failed to fetch chat session: ${error.message}`);
    }
  },

  /**
   * Get all chat sessions for a user
   */
  getSessionsByUserId: async (userId: string): Promise<ChatSession[]> => {
    try {
      const response = await chatApi.getSessionsByUser(userId);

      if (!response.success || !response.data) {
        throw new Error(
          response.error?.message || "Failed to fetch chat sessions"
        );
      }

      return (response.data.sessions || []).map(mapApiSessionToLocal);
    } catch (error) {
      logger.error(`Error fetching chat sessions for user ${userId}:`, error);
      throw new Error(`Failed to fetch chat sessions: ${error.message}`);
    }
  },

  /**
   * Get all chat sessions for a widget
   */
  getSessionsByWidgetId: async (widgetId: string): Promise<ChatSession[]> => {
    try {
      const response = await chatApi.getSessionsByWidget(widgetId);

      if (!response.success || !response.data) {
        throw new Error(
          response.error?.message || "Failed to fetch chat sessions"
        );
      }

      return (response.data.sessions || []).map(mapApiSessionToLocal);
    } catch (error) {
      logger.error(
        `Error fetching chat sessions for widget ${widgetId}:`,
        error
      );
      throw new Error(`Failed to fetch chat sessions: ${error.message}`);
    }
  },

  /**
   * Update a chat session
   */
  updateSession: async (
    sessionId: string,
    data: Partial<ChatSession>
  ): Promise<ChatSession> => {
    try {
      // Convert local format to API format
      const apiData: Partial<ApiChatSession> = {
        status: data.status,
        metadata: data.metadata,
      };

      const response = await chatApi.updateSession(sessionId, apiData);

      if (!response.success || !response.data) {
        throw new Error(
          response.error?.message || "Failed to update chat session"
        );
      }

      return mapApiSessionToLocal(response.data);
    } catch (error) {
      logger.error(`Error updating chat session ${sessionId}:`, error);
      throw new Error(`Failed to update chat session: ${error.message}`);
    }
  },

  /**
   * Add a message to a chat session
   */
  addMessage: async (
    message: Omit<ChatMessage, "id" | "created_at">
  ): Promise<ChatMessage> => {
    try {
      const response = await chatApi.sendMessage({
        sessionId: message.session_id,
        content: message.content,
        type: message.type === "assistant" ? "ai" : message.type,
        metadata: message.metadata,
      });

      if (!response.success || !response.data) {
        throw new Error(
          response.error?.message || "Failed to add chat message"
        );
      }

      return mapApiMessageToLocal(response.data);
    } catch (error) {
      logger.error("Error adding chat message:", error);
      throw new Error(`Failed to add chat message: ${error.message}`);
    }
  },

  /**
   * Get messages for a chat session
   */
  getMessagesBySessionId: async (sessionId: string): Promise<ChatMessage[]> => {
    try {
      const response = await chatApi.getSessionMessages(sessionId);

      if (!response.success || !response.data) {
        throw new Error(
          response.error?.message || "Failed to fetch chat messages"
        );
      }

      return (response.data.messages || []).map(mapApiMessageToLocal);
    } catch (error) {
      logger.error(`Error fetching messages for session ${sessionId}:`, error);
      throw new Error(`Failed to fetch chat messages: ${error.message}`);
    }
  },

  /**
   * Delete a chat session and all its messages
   */
  deleteSession: async (sessionId: string): Promise<boolean> => {
    try {
      const response = await chatApi.deleteSession(sessionId);

      if (!response.success) {
        throw new Error(
          response.error?.message || "Failed to delete chat session"
        );
      }

      return true;
    } catch (error) {
      logger.error(`Error deleting chat session ${sessionId}:`, error);
      throw new Error(`Failed to delete chat session: ${error.message}`);
    }
  },

  /**
   * Archive a chat session
   */
  archiveSession: async (sessionId: string): Promise<ChatSession> => {
    return chatService.updateSession(sessionId, { status: "archived" });
  },

  /**
   * Close a chat session
   */
  closeSession: async (sessionId: string): Promise<ChatSession> => {
    return chatService.updateSession(sessionId, { status: "closed" });
  },

  /**
   * Reopen a chat session
   */
  reopenSession: async (sessionId: string): Promise<ChatSession> => {
    return chatService.updateSession(sessionId, { status: "active" });
  },
};

// Add named export for chatService
export { chatService };
export default chatService;
