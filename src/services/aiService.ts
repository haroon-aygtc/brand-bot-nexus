import logger from "@/utils/logger";
import { AIModelRequest, AIModelResponse } from "./ai/types";

interface AIInteractionLogsParams {
  page: number;
  pageSize: number;
  query?: string;
  modelUsed?: string;
  contextRuleId?: string;
  startDate?: string;
  endDate?: string;
}

interface GenerateResponseOptions {
  query: string;
  contextRuleId?: string;
  userId: string;
  knowledgeBaseIds?: string[];
  promptTemplate?: string;
  systemPrompt?: string;
  preferredModel?: string;
  maxTokens?: number;
  temperature?: number;
  additionalParams?: Record<string, any>;
}

interface ModelPerformanceParams {
  timeRange?: string;
  startDate?: string;
  endDate?: string;
}

// Mock data for development without backend
const mockModels = [
  { id: "gpt-4", name: "GPT-4", provider: "OpenAI", maxTokens: 8192 },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI", maxTokens: 4096 },
  { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic", maxTokens: 200000 },
  { id: "claude-3-sonnet", name: "Claude 3 Sonnet", provider: "Anthropic", maxTokens: 180000 },
];

const mockInteractionLogs = Array(20).fill(null).map((_, i) => ({
  id: `log-${i}`,
  userId: `user-${i % 5}`,
  query: `Sample question ${i}?`,
  response: `Sample response for question ${i}.`,
  modelUsed: i % 2 === 0 ? "gpt-4" : "claude-3-opus",
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
  contextRuleId: i % 3 === 0 ? `rule-${i % 5}` : null,
  knowledgeBaseResults: i,
}));

const mockPerformanceData = {
  modelUsage: [
    { name: "GPT-4", value: 42 },
    { name: "GPT-3.5 Turbo", value: 78 },
    { name: "Claude 3 Opus", value: 35 },
    { name: "Claude 3 Sonnet", value: 28 },
  ],
  avgResponseTimes: [
    { name: "GPT-4", value: 2.3 },
    { name: "GPT-3.5 Turbo", value: 1.1 },
    { name: "Claude 3 Opus", value: 3.5 },
    { name: "Claude 3 Sonnet", value: 2.8 },
  ],
  dailyUsage: Array(7).fill(null).map((_, i) => ({
    date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
    total: Math.floor(Math.random() * 50) + 10,
  })),
  timeRange: "7d",
};

const aiService = {
  /**
   * Generate a response using AI models
   */
  generateResponse: async (
    options: GenerateResponseOptions,
  ): Promise<AIModelResponse> => {
    try {
      // In development without backend, return mock response
      logger.info("Generating mock AI response", options);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        content: `This is a mock response to your query: "${options.query}". When the backend is connected, you'll receive actual AI-generated responses.`,
        modelUsed: options.preferredModel || "mock-model",
        knowledgeBaseResults: 3,
        knowledgeBaseIds: options.knowledgeBaseIds || [],
        metadata: { mock: true, timestamp: new Date().toISOString() }
      };
    } catch (error) {
      logger.error("Error generating AI response:", error);

      // Return a fallback response
      return {
        content:
          "I'm sorry, I encountered an error processing your request. Please try again later.",
        modelUsed: "fallback-model",
      };
    }
  },

  /**
   * Log an AI interaction to the database via API
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
  }) => {
    try {
      logger.info("Logging AI interaction (mock)", data);
      return true;
    } catch (error) {
      logger.error("Error logging AI interaction:", error);
      return false;
    }
  },

  /**
   * Get AI interaction logs with pagination and filtering via API
   */
  getInteractionLogs: async (params: AIInteractionLogsParams) => {
    try {
      logger.info("Getting AI interaction logs (mock)", params);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter mock logs based on params
      let filteredLogs = [...mockInteractionLogs];
      
      if (params.query) {
        const query = params.query.toLowerCase();
        filteredLogs = filteredLogs.filter(log => 
          log.query.toLowerCase().includes(query) || 
          log.response.toLowerCase().includes(query)
        );
      }
      
      if (params.modelUsed) {
        filteredLogs = filteredLogs.filter(log => log.modelUsed === params.modelUsed);
      }
      
      if (params.contextRuleId) {
        filteredLogs = filteredLogs.filter(log => log.contextRuleId === params.contextRuleId);
      }
      
      const totalItems = filteredLogs.length;
      const totalPages = Math.ceil(totalItems / params.pageSize);
      const startIndex = (params.page - 1) * params.pageSize;
      const paginatedLogs = filteredLogs.slice(startIndex, startIndex + params.pageSize);
      
      return {
        logs: paginatedLogs,
        totalItems,
        totalPages,
        currentPage: params.page,
      };
    } catch (error) {
      logger.error("Error getting AI interaction logs:", error);
      return {
        logs: [],
        totalItems: 0,
        totalPages: 0,
        currentPage: params.page,
      };
    }
  },

  /**
   * Get available AI models via API
   */
  getAvailableModels: async () => {
    try {
      logger.info("Getting available AI models (mock)");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return mockModels;
    } catch (error) {
      logger.error("Error getting available AI models:", error);
      return [];
    }
  },

  /**
   * Set the default AI model via API
   */
  setDefaultModel: async (modelId: string) => {
    try {
      logger.info("Setting default AI model (mock)", modelId);
      return true;
    } catch (error) {
      logger.error("Error setting default AI model:", error);
      return false;
    }
  },

  /**
   * Get the default AI model via API
   */
  getDefaultModel: async () => {
    try {
      logger.info("Getting default AI model (mock)");
      return mockModels[0];
    } catch (error) {
      logger.error("Error getting default AI model:", error);
      return null;
    }
  },

  /**
   * Get AI model performance metrics via API
   */
  getModelPerformance: async (params: ModelPerformanceParams = {}) => {
    try {
      logger.info("Getting AI model performance metrics (mock)", params);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      return mockPerformanceData;
    } catch (error) {
      logger.error("Error getting AI model performance metrics:", error);
      return {
        modelUsage: [],
        avgResponseTimes: [],
        dailyUsage: [],
        timeRange: params.timeRange || "7d",
      };
    }
  },
};

// Add default export
export default aiService;

// Also keep named exports if needed
export { aiService };
