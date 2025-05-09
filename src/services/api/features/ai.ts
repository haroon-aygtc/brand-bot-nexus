
import { api } from "../middleware/apiMiddleware";
import { AIModelRequest, AIModelResponse } from "../../ai/types";
import { ApiResponse } from "../middleware/apiMiddleware";

// Define AI API endpoints
const AI_ENDPOINTS = {
  GENERATE: '/ai/generate',
  LOGS: '/ai/logs',
  LOG_INTERACTION: '/ai/log-interaction',
  MODELS: '/ai/models',
  DEFAULT_MODEL: '/ai/default-model',
  SET_DEFAULT_MODEL: '/ai/default-model',
  PERFORMANCE: '/ai/performance',
};

// Define the AI API service
export const aiApi = {
  /**
   * Generate AI response
   */
  generate: async (request: AIModelRequest): Promise<ApiResponse<AIModelResponse>> => {
    try {
      const response = await api.post(AI_ENDPOINTS.GENERATE, request);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'AI_GENERATE_ERROR',
          message: error instanceof Error ? error.message : 'Failed to generate AI response',
        },
      };
    }
  },

  /**
   * Log AI interaction
   */
  logInteraction: async (data: {
    userId: string;
    query: string;
    response: string;
    modelUsed: string;
    contextRuleId?: string;
    knowledgeBaseResults?: number;
    knowledgeBaseIds?: string[];
    metadata?: Record<string, any>;
  }): Promise<ApiResponse<any>> => {
    try {
      const response = await api.post(AI_ENDPOINTS.LOG_INTERACTION, data);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'AI_LOG_INTERACTION_ERROR',
          message: error instanceof Error ? error.message : 'Failed to log AI interaction',
        },
      };
    }
  },

  /**
   * Get AI logs
   */
  getLogs: async (params: {
    page: number;
    pageSize: number;
    query?: string;
    modelUsed?: string;
    contextRuleId?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<any>> => {
    try {
      const response = await api.get(AI_ENDPOINTS.LOGS, { params });
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'AI_GET_LOGS_ERROR',
          message: error instanceof Error ? error.message : 'Failed to get AI logs',
        },
      };
    }
  },

  /**
   * Get available AI models
   */
  getModels: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await api.get(AI_ENDPOINTS.MODELS);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'AI_GET_MODELS_ERROR',
          message: error instanceof Error ? error.message : 'Failed to get AI models',
        },
      };
    }
  },

  /**
   * Set default AI model
   */
  setDefaultModel: async (modelId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await api.post(AI_ENDPOINTS.SET_DEFAULT_MODEL, { modelId });
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'AI_SET_DEFAULT_MODEL_ERROR',
          message: error instanceof Error ? error.message : 'Failed to set default AI model',
        },
      };
    }
  },

  /**
   * Get default AI model
   */
  getDefaultModel: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await api.get(AI_ENDPOINTS.DEFAULT_MODEL);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'AI_GET_DEFAULT_MODEL_ERROR',
          message: error instanceof Error ? error.message : 'Failed to get default AI model',
        },
      };
    }
  },

  /**
   * Get AI performance metrics
   */
  getPerformance: async (timeRange?: string): Promise<ApiResponse<any>> => {
    try {
      const response = await api.get(AI_ENDPOINTS.PERFORMANCE, { params: { timeRange } });
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'AI_GET_PERFORMANCE_ERROR',
          message: error instanceof Error ? error.message : 'Failed to get AI performance metrics',
        },
      };
    }
  },
};
