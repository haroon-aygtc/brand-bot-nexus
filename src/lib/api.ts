
import type { User, Tenant, AiModel, KnowledgeItem, Chat, ChatMessage, Role, Permission } from '../types/mockDb';

// Define the API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://laravel-backend.test/api';

// Helper function to fetch with authorization
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Request failed with status ${response.status}`;

      // Handle specific error codes
      if (response.status === 401) {
        // Clear token if unauthorized
        localStorage.removeItem('authToken');
        throw new Error('Unauthorized access. Please log in again.');
      }

      if (response.status === 403) {
        throw new Error('You do not have permission to access this resource.');
      }

      if (response.status === 404) {
        throw new Error('The requested resource was not found.');
      }

      if (response.status === 422) {
        // Validation errors
        const validationErrors = errorData.errors ? Object.values(errorData.errors).flat() : [];
        throw new Error(validationErrors.length ? validationErrors.join(', ') : errorMessage);
      }

      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    // Rethrow network errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your connection and try again.');
    }
    throw error;
  }
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
    },

    refreshToken: async () => {
      return fetchWithAuth('/auth/refresh', {
        method: 'POST',
      });
    },

    requestPasswordReset: async (email: string) => {
      return fetchWithAuth('/auth/password/email', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    },

    resetPassword: async (token: string, password: string) => {
      return fetchWithAuth('/auth/password/reset', {
        method: 'POST',
        body: JSON.stringify({ token, password, password_confirmation: password }),
      });
    },
  },

  // Users
  users: {
    getAll: async (page = 1, limit = 10, search = '') => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      if (search) params.append('search', search);

      return fetchWithAuth(`/users?${params.toString()}`);
    },

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

    assignRoles: async (userId: string, roleIds: string[]) =>
      fetchWithAuth(`/users/${userId}/roles`, {
        method: 'POST',
        body: JSON.stringify({ roles: roleIds }),
      }),

    getPermissions: async (userId: string) =>
      fetchWithAuth(`/users/${userId}/permissions`),
  },

  // Roles
  roles: {
    getAll: async (page = 1, limit = 10) => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      return fetchWithAuth(`/roles?${params.toString()}`);
    },

    getById: async (id: string) => fetchWithAuth(`/roles/${id}`),

    create: async (roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) =>
      fetchWithAuth('/roles', {
        method: 'POST',
        body: JSON.stringify(roleData),
      }),

    update: async (id: string, roleData: Partial<Role>) =>
      fetchWithAuth(`/roles/${id}`, {
        method: 'PUT',
        body: JSON.stringify(roleData),
      }),

    delete: async (id: string) =>
      fetchWithAuth(`/roles/${id}`, {
        method: 'DELETE',
      }),

    assignPermissions: async (roleId: string, permissionIds: string[]) =>
      fetchWithAuth(`/roles/${roleId}/permissions`, {
        method: 'POST',
        body: JSON.stringify({ permissions: permissionIds }),
      }),
  },

  // Permissions
  permissions: {
    getAll: async (module = '') => {
      const params = new URLSearchParams();
      if (module) params.append('module', module);

      return fetchWithAuth(`/permissions?${params.toString()}`);
    },

    getById: async (id: string) => fetchWithAuth(`/permissions/${id}`),

    create: async (permissionData: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>) =>
      fetchWithAuth('/permissions', {
        method: 'POST',
        body: JSON.stringify(permissionData),
      }),

    update: async (id: string, permissionData: Partial<Permission>) =>
      fetchWithAuth(`/permissions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(permissionData),
      }),

    delete: async (id: string) =>
      fetchWithAuth(`/permissions/${id}`, {
        method: 'DELETE',
      }),
  },

  // Tenants
  tenants: {
    getAll: async (page = 1, limit = 10) => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      return fetchWithAuth(`/tenants?${params.toString()}`);
    },

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
    getAll: async (page = 1, limit = 10) => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      return fetchWithAuth(`/ai-models?${params.toString()}`);
    },

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
    getAll: async (page = 1, limit = 10, search = '') => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      if (search) params.append('search', search);

      return fetchWithAuth(`/knowledge-base?${params.toString()}`);
    },

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
    getAll: async (page = 1, limit = 10) => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      return fetchWithAuth(`/chats?${params.toString()}`);
    },

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
  },

  // AI Configuration
  aiConfig: {
    // Data Sources
    dataSources: {
      getAll: async () => fetchWithAuth('/ai-config/data-sources'),

      getById: async (id: string) => fetchWithAuth(`/ai-config/data-sources/${id}`),

      create: async (data: any) =>
        fetchWithAuth('/ai-config/data-sources', {
          method: 'POST',
          body: JSON.stringify(data),
        }),

      update: async (id: string, data: any) =>
        fetchWithAuth(`/ai-config/data-sources/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),

      delete: async (id: string) =>
        fetchWithAuth(`/ai-config/data-sources/${id}`, {
          method: 'DELETE',
        }),
    },

    // Prompt Templates
    promptTemplates: {
      getAll: async () => fetchWithAuth('/ai-config/prompt-templates'),

      getById: async (id: string) => fetchWithAuth(`/ai-config/prompt-templates/${id}`),

      create: async (data: any) =>
        fetchWithAuth('/ai-config/prompt-templates', {
          method: 'POST',
          body: JSON.stringify(data),
        }),

      update: async (id: string, data: any) =>
        fetchWithAuth(`/ai-config/prompt-templates/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),

      delete: async (id: string) =>
        fetchWithAuth(`/ai-config/prompt-templates/${id}`, {
          method: 'DELETE',
        }),
    },

    // Response Formatter
    responseFormatters: {
      getAll: async () => fetchWithAuth('/ai-config/response-formatters'),

      getById: async (id: string) => fetchWithAuth(`/ai-config/response-formatters/${id}`),

      create: async (data: any) =>
        fetchWithAuth('/ai-config/response-formatters', {
          method: 'POST',
          body: JSON.stringify(data),
        }),

      update: async (id: string, data: any) =>
        fetchWithAuth(`/ai-config/response-formatters/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),

      delete: async (id: string) =>
        fetchWithAuth(`/ai-config/response-formatters/${id}`, {
          method: 'DELETE',
        }),
    },

    // Branding
    branding: {
      getSettings: async () => fetchWithAuth('/ai-config/branding'),

      updateSettings: async (data: any) =>
        fetchWithAuth('/ai-config/branding', {
          method: 'PUT',
          body: JSON.stringify(data),
        }),

      uploadLogo: async (file: File) => {
        const formData = new FormData();
        formData.append('logo', file);

        return fetchWithAuth('/ai-config/branding/logo', {
          method: 'POST',
          body: formData,
          headers: {}, // Let the browser set the content type with boundary
        });
      },
    },

    // Follow-up Questions
    followUpQuestions: {
      getAll: async () => fetchWithAuth('/ai-config/follow-up-questions'),

      getById: async (id: string) => fetchWithAuth(`/ai-config/follow-up-questions/${id}`),

      create: async (data: any) =>
        fetchWithAuth('/ai-config/follow-up-questions', {
          method: 'POST',
          body: JSON.stringify(data),
        }),

      update: async (id: string, data: any) =>
        fetchWithAuth(`/ai-config/follow-up-questions/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),

      delete: async (id: string) =>
        fetchWithAuth(`/ai-config/follow-up-questions/${id}`, {
          method: 'DELETE',
        }),
    },
  }
};

export default api;
