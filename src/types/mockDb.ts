
// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
  tenantId?: string;
  createdAt: string;
  updatedAt: string;
}

// Tenant types
export interface Tenant {
  id: string;
  name: string;
  domain: string;
  branding: {
    primaryColor: string;
    secondaryColor: string;
    logo?: string;
    chatTitle: string;
  };
  settings: {
    aiModels: string[];
    defaultLanguage: string;
    widgetPosition: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  };
  createdAt: string;
  updatedAt: string;
}

// AI Model types
export interface AiModel {
  id: string;
  name: string;
  provider: 'openai' | 'gemini' | 'huggingface' | 'anthropic';
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

// Knowledge Base types
export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  type: 'document' | 'faq' | 'article';
  tags: string[];
  tenantId?: string;
  createdAt: string;
  updatedAt: string;
}

// Chat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  title: string;
  userId?: string;
  tenantId?: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}
