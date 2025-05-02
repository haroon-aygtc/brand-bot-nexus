
import { User, Tenant, AiModel, KnowledgeItem, Chat, ChatMessage } from '@/types/mockDb';

// Helper to get data from localStorage with proper typing
const getStoredData = <T>(key: string, defaultValue: T): T => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving data for key ${key}:`, error);
    return defaultValue;
  }
};

// Helper to set data in localStorage
const setStoredData = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing data for key ${key}:`, error);
  }
};

// Generate a simple UUID for IDs
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const mockDb = {
  // Users management
  users: {
    getAll: () => getStoredData<User[]>('users', []),
    getById: (id: string) => getStoredData<User[]>('users', []).find(user => user.id === id),
    create: (userData: Omit<User, 'id'>) => {
      const users = getStoredData<User[]>('users', []);
      const newUser = { ...userData, id: generateId() };
      setStoredData('users', [...users, newUser]);
      return newUser;
    },
    update: (id: string, userData: Partial<User>) => {
      const users = getStoredData<User[]>('users', []);
      const updatedUsers = users.map(user => 
        user.id === id ? { ...user, ...userData } : user
      );
      setStoredData('users', updatedUsers);
      return updatedUsers.find(user => user.id === id);
    },
    delete: (id: string) => {
      const users = getStoredData<User[]>('users', []);
      const filteredUsers = users.filter(user => user.id !== id);
      setStoredData('users', filteredUsers);
    }
  },
  
  // Tenants management
  tenants: {
    getAll: () => getStoredData<Tenant[]>('tenants', []),
    getById: (id: string) => getStoredData<Tenant[]>('tenants', []).find(tenant => tenant.id === id),
    create: (tenantData: Omit<Tenant, 'id'>) => {
      const tenants = getStoredData<Tenant[]>('tenants', []);
      const newTenant = { ...tenantData, id: generateId() };
      setStoredData('tenants', [...tenants, newTenant]);
      return newTenant;
    },
    update: (id: string, tenantData: Partial<Tenant>) => {
      const tenants = getStoredData<Tenant[]>('tenants', []);
      const updatedTenants = tenants.map(tenant => 
        tenant.id === id ? { ...tenant, ...tenantData } : tenant
      );
      setStoredData('tenants', updatedTenants);
      return updatedTenants.find(tenant => tenant.id === id);
    },
    delete: (id: string) => {
      const tenants = getStoredData<Tenant[]>('tenants', []);
      const filteredTenants = tenants.filter(tenant => tenant.id !== id);
      setStoredData('tenants', filteredTenants);
    }
  },
  
  // AI Models management
  aiModels: {
    getAll: () => getStoredData<AiModel[]>('aiModels', []),
    getById: (id: string) => getStoredData<AiModel[]>('aiModels', []).find(model => model.id === id),
    create: (modelData: Omit<AiModel, 'id'>) => {
      const models = getStoredData<AiModel[]>('aiModels', []);
      const newModel = { ...modelData, id: generateId() };
      setStoredData('aiModels', [...models, newModel]);
      return newModel;
    },
    update: (id: string, modelData: Partial<AiModel>) => {
      const models = getStoredData<AiModel[]>('aiModels', []);
      const updatedModels = models.map(model => 
        model.id === id ? { ...model, ...modelData } : model
      );
      setStoredData('aiModels', updatedModels);
      return updatedModels.find(model => model.id === id);
    },
    delete: (id: string) => {
      const models = getStoredData<AiModel[]>('aiModels', []);
      const filteredModels = models.filter(model => model.id !== id);
      setStoredData('aiModels', filteredModels);
    }
  },
  
  // Knowledge Base management
  knowledgeBase: {
    getAll: () => getStoredData<KnowledgeItem[]>('knowledgeBase', []),
    getById: (id: string) => getStoredData<KnowledgeItem[]>('knowledgeBase', []).find(item => item.id === id),
    create: (itemData: Omit<KnowledgeItem, 'id'>) => {
      const items = getStoredData<KnowledgeItem[]>('knowledgeBase', []);
      const newItem = { ...itemData, id: generateId() };
      setStoredData('knowledgeBase', [...items, newItem]);
      return newItem;
    },
    update: (id: string, itemData: Partial<KnowledgeItem>) => {
      const items = getStoredData<KnowledgeItem[]>('knowledgeBase', []);
      const updatedItems = items.map(item => 
        item.id === id ? { ...item, ...itemData } : item
      );
      setStoredData('knowledgeBase', updatedItems);
      return updatedItems.find(item => item.id === id);
    },
    delete: (id: string) => {
      const items = getStoredData<KnowledgeItem[]>('knowledgeBase', []);
      const filteredItems = items.filter(item => item.id !== id);
      setStoredData('knowledgeBase', filteredItems);
    }
  },
  
  // Chat history management
  chats: {
    getAll: () => getStoredData<Chat[]>('chats', []),
    getById: (id: string) => getStoredData<Chat[]>('chats', []).find(chat => chat.id === id),
    create: (chatData: Omit<Chat, 'id'>) => {
      const chats = getStoredData<Chat[]>('chats', []);
      const newChat = { ...chatData, id: generateId() };
      setStoredData('chats', [...chats, newChat]);
      return newChat;
    },
    update: (id: string, chatData: Partial<Chat>) => {
      const chats = getStoredData<Chat[]>('chats', []);
      const updatedChats = chats.map(chat => 
        chat.id === id ? { ...chat, ...chatData } : chat
      );
      setStoredData('chats', updatedChats);
      return updatedChats.find(chat => chat.id === id);
    },
    delete: (id: string) => {
      const chats = getStoredData<Chat[]>('chats', []);
      const filteredChats = chats.filter(chat => chat.id !== id);
      setStoredData('chats', filteredChats);
    },
    addMessage: (chatId: string, message: Omit<ChatMessage, 'id'>) => {
      const chats = getStoredData<Chat[]>('chats', []);
      const updatedChats = chats.map(chat => {
        if (chat.id === chatId) {
          const newMessage = { ...message, id: generateId() };
          return { 
            ...chat, 
            messages: [...(chat.messages || []), newMessage],
            updatedAt: new Date().toISOString()
          };
        }
        return chat;
      });
      setStoredData('chats', updatedChats);
      return updatedChats.find(chat => chat.id === chatId);
    }
  }
};

export default mockDb;
