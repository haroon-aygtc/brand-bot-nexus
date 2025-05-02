
import mockDb from './mockDb';
import type { User, Tenant, AiModel, KnowledgeItem, Chat, ChatMessage } from '../types/mockDb';

// Add delay to simulate network latency
const withDelay = <T>(data: T, delay = 300): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

// Simulated API error
class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// API client that will be replaced with real API calls later
export const api = {
  // Authentication
  auth: {
    login: async (email: string, password: string) => {
      // Simulate authentication
      const users = mockDb.users.getAll();
      const user = users.find(u => u.email === email);
      
      if (!user) {
        throw new ApiError('Invalid credentials', 401);
      }
      
      // In a real app, we would validate password here
      
      // Create and store token in localStorage
      const token = `mock-token-${Date.now()}`;
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      return withDelay({ user, token });
    },
    
    register: async (userData: { name: string; email: string; password: string }) => {
      const users = mockDb.users.getAll();
      const existingUser = users.find(u => u.email === userData.email);
      
      if (existingUser) {
        throw new ApiError('User already exists', 409);
      }
      
      const newUser = mockDb.users.create({
        email: userData.email,
        name: userData.name,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      // Create and store token
      const token = `mock-token-${Date.now()}`;
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      return withDelay({ user: newUser, token });
    },
    
    logout: async () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      return withDelay({ success: true });
    },
    
    getCurrentUser: async () => {
      const userData = localStorage.getItem('currentUser');
      if (!userData) {
        throw new ApiError('Not authenticated', 401);
      }
      return withDelay(JSON.parse(userData) as User);
    }
  },
  
  // Users
  users: {
    getAll: async () => withDelay(mockDb.users.getAll()),
    getById: async (id: string) => {
      const user = mockDb.users.getById(id);
      if (!user) throw new ApiError('User not found', 404);
      return withDelay(user);
    },
    create: async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
      return withDelay(mockDb.users.create({
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    },
    update: async (id: string, userData: Partial<User>) => {
      const user = mockDb.users.getById(id);
      if (!user) throw new ApiError('User not found', 404);
      return withDelay(mockDb.users.update(id, {
        ...userData,
        updatedAt: new Date().toISOString()
      }));
    },
    delete: async (id: string) => {
      const user = mockDb.users.getById(id);
      if (!user) throw new ApiError('User not found', 404);
      mockDb.users.delete(id);
      return withDelay({ success: true });
    }
  },
  
  // Tenants
  tenants: {
    getAll: async () => withDelay(mockDb.tenants.getAll()),
    getById: async (id: string) => {
      const tenant = mockDb.tenants.getById(id);
      if (!tenant) throw new ApiError('Tenant not found', 404);
      return withDelay(tenant);
    },
    create: async (tenantData: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>) => {
      return withDelay(mockDb.tenants.create({
        ...tenantData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    },
    update: async (id: string, tenantData: Partial<Tenant>) => {
      const tenant = mockDb.tenants.getById(id);
      if (!tenant) throw new ApiError('Tenant not found', 404);
      return withDelay(mockDb.tenants.update(id, {
        ...tenantData,
        updatedAt: new Date().toISOString()
      }));
    },
    delete: async (id: string) => {
      const tenant = mockDb.tenants.getById(id);
      if (!tenant) throw new ApiError('Tenant not found', 404);
      mockDb.tenants.delete(id);
      return withDelay({ success: true });
    }
  },
  
  // AI Models
  aiModels: {
    getAll: async () => withDelay(mockDb.aiModels.getAll()),
    getById: async (id: string) => {
      const model = mockDb.aiModels.getById(id);
      if (!model) throw new ApiError('AI Model not found', 404);
      return withDelay(model);
    },
    create: async (modelData: Omit<AiModel, 'id' | 'createdAt' | 'updatedAt'>) => {
      return withDelay(mockDb.aiModels.create({
        ...modelData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    },
    update: async (id: string, modelData: Partial<AiModel>) => {
      const model = mockDb.aiModels.getById(id);
      if (!model) throw new ApiError('AI Model not found', 404);
      return withDelay(mockDb.aiModels.update(id, {
        ...modelData,
        updatedAt: new Date().toISOString()
      }));
    },
    delete: async (id: string) => {
      const model = mockDb.aiModels.getById(id);
      if (!model) throw new ApiError('AI Model not found', 404);
      mockDb.aiModels.delete(id);
      return withDelay({ success: true });
    }
  },
  
  // Knowledge Base
  knowledgeBase: {
    getAll: async () => withDelay(mockDb.knowledgeBase.getAll()),
    getById: async (id: string) => {
      const item = mockDb.knowledgeBase.getById(id);
      if (!item) throw new ApiError('Knowledge item not found', 404);
      return withDelay(item);
    },
    create: async (itemData: Omit<KnowledgeItem, 'id' | 'createdAt' | 'updatedAt'>) => {
      return withDelay(mockDb.knowledgeBase.create({
        ...itemData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    },
    update: async (id: string, itemData: Partial<KnowledgeItem>) => {
      const item = mockDb.knowledgeBase.getById(id);
      if (!item) throw new ApiError('Knowledge item not found', 404);
      return withDelay(mockDb.knowledgeBase.update(id, {
        ...itemData,
        updatedAt: new Date().toISOString()
      }));
    },
    delete: async (id: string) => {
      const item = mockDb.knowledgeBase.getById(id);
      if (!item) throw new ApiError('Knowledge item not found', 404);
      mockDb.knowledgeBase.delete(id);
      return withDelay({ success: true });
    }
  },
  
  // Chats
  chats: {
    getAll: async () => withDelay(mockDb.chats.getAll()),
    getById: async (id: string) => {
      const chat = mockDb.chats.getById(id);
      if (!chat) throw new ApiError('Chat not found', 404);
      return withDelay(chat);
    },
    create: async (chatData: Omit<Chat, 'id' | 'createdAt' | 'updatedAt' | 'messages'>) => {
      return withDelay(mockDb.chats.create({
        ...chatData,
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    },
    update: async (id: string, chatData: Partial<Chat>) => {
      const chat = mockDb.chats.getById(id);
      if (!chat) throw new ApiError('Chat not found', 404);
      return withDelay(mockDb.chats.update(id, {
        ...chatData,
        updatedAt: new Date().toISOString()
      }));
    },
    delete: async (id: string) => {
      const chat = mockDb.chats.getById(id);
      if (!chat) throw new ApiError('Chat not found', 404);
      mockDb.chats.delete(id);
      return withDelay({ success: true });
    },
    addMessage: async (chatId: string, message: Omit<ChatMessage, 'id'>) => {
      const chat = mockDb.chats.getById(chatId);
      if (!chat) throw new ApiError('Chat not found', 404);
      return withDelay(mockDb.chats.addMessage(chatId, message));
    }
  }
};

export default api;
