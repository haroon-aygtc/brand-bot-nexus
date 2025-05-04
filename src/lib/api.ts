
import type { User, Tenant, AiModel, KnowledgeItem, Chat, ChatMessage } from '../types/mockDb';

// Define the API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper function to fetch with authorization
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
};

// API client
export const api = {
  // Authentication
  auth: {
    login: async (email: string, password: string) => {
      const response = await fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      // Store token in localStorage
      localStorage.setItem('authToken', response.token);
      
      return response;
    },
    
    register: async (userData: { name: string; email: string; password: string }) => {
      const response = await fetchWithAuth('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      
      // Store token in localStorage
      localStorage.setItem('authToken', response.token);
      
      return response;
    },
    
    logout: async () => {
      const response = await fetchWithAuth('/auth/logout', {
        method: 'POST',
      });
      
      // Remove token from localStorage
      localStorage.removeItem('authToken');
      
      return response;
    },
    
    getCurrentUser: async () => {
      // If we don't have a token, consider the user not authenticated
      if (!localStorage.getItem('authToken')) {
        throw new Error('Not authenticated');
      }
      
      return fetchWithAuth('/auth/user');
    }
  },
  
  // Users
  users: {
    getAll: async () => fetchWithAuth('/users'),
    
    getById: async (id: string) => fetchWithAuth(`/users/${id}`),
    
    create: async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => 
      fetchWithAuth('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    
    update: async (id: string, userData: Partial<User>) => 
      fetchWithAuth(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      }),
    
    delete: async (id: string) => 
      fetchWithAuth(`/users/${id}`, {
        method: 'DELETE',
      }),
  },
  
  // Tenants
  tenants: {
    getAll: async () => fetchWithAuth('/tenants'),
    
    getById: async (id: string) => fetchWithAuth(`/tenants/${id}`),
    
    create: async (tenantData: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>) => 
      fetchWithAuth('/tenants', {
        method: 'POST',
        body: JSON.stringify(tenantData),
      }),
    
    update: async (id: string, tenantData: Partial<Tenant>) => 
      fetchWithAuth(`/tenants/${id}`, {
        method: 'PUT',
        body: JSON.stringify(tenantData),
      }),
    
    delete: async (id: string) => 
      fetchWithAuth(`/tenants/${id}`, {
        method: 'DELETE',
      }),
  },
  
  // AI Models
  aiModels: {
    getAll: async () => fetchWithAuth('/ai-models'),
    
    getById: async (id: string) => fetchWithAuth(`/ai-models/${id}`),
    
    create: async (modelData: Omit<AiModel, 'id' | 'createdAt' | 'updatedAt'>) => 
      fetchWithAuth('/ai-models', {
        method: 'POST',
        body: JSON.stringify(modelData),
      }),
    
    update: async (id: string, modelData: Partial<AiModel>) => 
      fetchWithAuth(`/ai-models/${id}`, {
        method: 'PUT',
        body: JSON.stringify(modelData),
      }),
    
    delete: async (id: string) => 
      fetchWithAuth(`/ai-models/${id}`, {
        method: 'DELETE',
      }),
  },
  
  // Knowledge Base
  knowledgeBase: {
    getAll: async () => fetchWithAuth('/knowledge-base'),
    
    getById: async (id: string) => fetchWithAuth(`/knowledge-base/${id}`),
    
    create: async (itemData: Omit<KnowledgeItem, 'id' | 'createdAt' | 'updatedAt'>) => 
      fetchWithAuth('/knowledge-base', {
        method: 'POST',
        body: JSON.stringify(itemData),
      }),
    
    update: async (id: string, itemData: Partial<KnowledgeItem>) => 
      fetchWithAuth(`/knowledge-base/${id}`, {
        method: 'PUT',
        body: JSON.stringify(itemData),
      }),
    
    delete: async (id: string) => 
      fetchWithAuth(`/knowledge-base/${id}`, {
        method: 'DELETE',
      }),
  },
  
  // Chats
  chats: {
    getAll: async () => fetchWithAuth('/chats'),
    
    getById: async (id: string) => fetchWithAuth(`/chats/${id}`),
    
    create: async (chatData: Omit<Chat, 'id' | 'createdAt' | 'updatedAt' | 'messages'>) => 
      fetchWithAuth('/chats', {
        method: 'POST',
        body: JSON.stringify(chatData),
      }),
    
    update: async (id: string, chatData: Partial<Chat>) => 
      fetchWithAuth(`/chats/${id}`, {
        method: 'PUT',
        body: JSON.stringify(chatData),
      }),
    
    delete: async (id: string) => 
      fetchWithAuth(`/chats/${id}`, {
        method: 'DELETE',
      }),
    
    addMessage: async (chatId: string, message: Omit<ChatMessage, 'id'>) => 
      fetchWithAuth(`/chats/${chatId}/messages`, {
        method: 'POST',
        body: JSON.stringify(message),
      }),
  }
};

export default api;
