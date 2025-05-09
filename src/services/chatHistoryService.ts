import { ChatMessage, ChatSession } from "@/models";
import { Message } from "@/types/chat";
import { v4 as uuidv4 } from "uuid";
import logger from "@/utils/logger"
import { getMySQLClient } from "./mysqlClient";
import { api } from "./api/middleware/apiMiddleware";

export interface ChatHistoryParams {
  userId: string;
  sessionId?: string;
  contextRuleId?: string;
  page?: number;
  pageSize?: number;
}

export interface MessageToStore {
  content: string;
  sender: "user" | "assistant";
  contextRuleId?: string;
  modelUsed?: string;
  metadata?: Record<string, any>;
}

/**
 * Service for managing chat history in the database
 */
export const chatHistoryService = {
  /**
   * Store a new message in the database
   */
  storeMessage: async (
    userId: string,
    message: MessageToStore,
  ): Promise<Message> => {
    try {
      const response = await api.post<Message>("/chat/messages", {
        userId,
        content: message.content,
        sender: message.sender,
        contextRuleId: message.contextRuleId,
        modelUsed: message.modelUsed,
        metadata: message.metadata || {},
      });

      if (!response.success || !response.data) {
        throw new Error(response.error?.message || "Failed to store message");
      }

      return response.data;
    } catch (error) {
      logger.error("Error storing message:", error);
      throw new Error(
        `Failed to store message: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },

  /**
   * Get chat history for a user with pagination
   */
  getChatHistory: async ({
    userId,
    sessionId,
    contextRuleId,
    page = 1,
    pageSize = 20,
  }: ChatHistoryParams): Promise<{
    messages: Message[];
    totalCount: number;
  }> => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("userId", userId);
      if (sessionId) queryParams.append("sessionId", sessionId);
      if (contextRuleId) queryParams.append("contextRuleId", contextRuleId);
      queryParams.append("page", page.toString());
      queryParams.append("pageSize", pageSize.toString());

      const response = await api.get<{
        messages: Message[];
        totalCount: number;
      }>(`/chat/history?${queryParams.toString()}`);

      if (!response.success) {
        throw new Error(
          response.error?.message || "Failed to retrieve chat history",
        );
      }

      return response.data || { messages: [], totalCount: 0 };
    } catch (error) {
      logger.error("Error retrieving chat history:", error);
      throw new Error(
        `Failed to retrieve chat history: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },

  /**
   * Delete chat history for a user
   */
  deleteChatHistory: async (
    userId: string,
    contextRuleId?: string,
  ): Promise<void> => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("userId", userId);
      if (contextRuleId) queryParams.append("contextRuleId", contextRuleId);

      const response = await api.delete<boolean>(
        `/chat/history?${queryParams.toString()}`,
      );

      if (!response.success) {
        throw new Error(
          response.error?.message || "Failed to delete chat history",
        );
      }
    } catch (error) {
      logger.error("Error deleting chat history:", error);
      throw new Error(
        `Failed to delete chat history: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },

  /**
   * Create a new chat session
   */
  createSession: async (
    userId: string,
    contextRuleId?: string,
  ): Promise<string> => {
    try {
      const response = await api.post<{ sessionId: string }>("/chat/sessions", {
        userId,
        contextRuleId: contextRuleId || null,
      });

      if (!response.success || !response.data) {
        throw new Error(
          response.error?.message || "Failed to create chat session",
        );
      }

      return response.data.sessionId;
    } catch (error) {
      logger.error("Error creating chat session:", error);
      throw new Error(
        `Failed to create chat session: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },

  /**
   * Update the last activity timestamp for a session
   */
  updateSessionActivity: async (sessionId: string): Promise<void> => {
    try {
      const response = await api.put<boolean>(
        `/chat/sessions/${sessionId}/activity`,
      );

      if (!response.success) {
        throw new Error(
          response.error?.message || "Failed to update session activity",
        );
      }
    } catch (error) {
      logger.error("Error updating session activity:", error);
      throw new Error(
        `Failed to update session activity: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
};

export default chatHistoryService;
