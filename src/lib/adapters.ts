
import { User, Tenant, AiModel, KnowledgeItem, Chat, ChatMessage } from '@/types/mockDb';

/**
 * Adapters to convert between Laravel backend data structures and frontend types
 */

export const userAdapter = {
  toFrontend(apiUser: any): User {
    return {
      id: apiUser.id.toString(),
      name: apiUser.name,
      email: apiUser.email,
      role: apiUser.role,
      tenantId: apiUser.tenant_id ? apiUser.tenant_id.toString() : undefined,
      createdAt: apiUser.created_at,
      updatedAt: apiUser.updated_at
    };
  },
  
  toBackend(user: Partial<User>) {
    // Convert from frontend structure to what the API expects
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      tenant_id: user.tenantId,
      password: (user as any).password // Include password if it exists
    };
  }
};

export const aiModelAdapter = {
  toFrontend(apiModel: any): AiModel {
    return {
      id: apiModel.id.toString(),
      name: apiModel.name,
      provider: apiModel.provider,
      model: apiModel.model,
      temperature: apiModel.temperature,
      maxTokens: apiModel.max_tokens,
      systemPrompt: apiModel.system_prompt,
      enabled: apiModel.enabled,
      createdAt: apiModel.created_at,
      updatedAt: apiModel.updated_at
    };
  },
  
  toBackend(model: Partial<AiModel>) {
    return {
      name: model.name,
      provider: model.provider,
      model: model.model,
      temperature: model.temperature,
      max_tokens: model.maxTokens,
      system_prompt: model.systemPrompt,
      enabled: model.enabled
    };
  }
};

export const chatAdapter = {
  toFrontend(apiChat: any): Chat {
    return {
      id: apiChat.id.toString(),
      title: apiChat.title,
      userId: apiChat.user_id ? apiChat.user_id.toString() : undefined,
      tenantId: apiChat.tenant_id ? apiChat.tenant_id.toString() : undefined,
      messages: apiChat.messages ? apiChat.messages.map((msg: any) => ({
        id: msg.id.toString(),
        role: msg.role,
        content: msg.content,
        timestamp: msg.created_at
      })) : [],
      createdAt: apiChat.created_at,
      updatedAt: apiChat.updated_at
    };
  },
  
  toBackend(chat: Partial<Chat>) {
    return {
      title: chat.title,
      user_id: chat.userId,
      tenant_id: chat.tenantId
    };
  }
};

export const chatMessageAdapter = {
  toFrontend(apiMessage: any): ChatMessage {
    return {
      id: apiMessage.id.toString(),
      role: apiMessage.role,
      content: apiMessage.content,
      timestamp: apiMessage.created_at
    };
  },
  
  toBackend(message: Partial<ChatMessage>) {
    return {
      role: message.role,
      content: message.content
    };
  }
};

export const knowledgeItemAdapter = {
  toFrontend(apiItem: any): KnowledgeItem {
    return {
      id: apiItem.id.toString(),
      title: apiItem.title,
      content: apiItem.content,
      type: apiItem.type,
      tags: apiItem.tags,
      tenantId: apiItem.tenant_id ? apiItem.tenant_id.toString() : undefined,
      createdAt: apiItem.created_at,
      updatedAt: apiItem.updated_at
    };
  },
  
  toBackend(item: Partial<KnowledgeItem>) {
    return {
      title: item.title,
      content: item.content,
      type: item.type,
      tags: item.tags,
      tenant_id: item.tenantId
    };
  }
};

export const tenantAdapter = {
  toFrontend(apiTenant: any): Tenant {
    return {
      id: apiTenant.id.toString(),
      name: apiTenant.name,
      domain: apiTenant.domain,
      branding: apiTenant.branding,
      settings: apiTenant.settings,
      createdAt: apiTenant.created_at,
      updatedAt: apiTenant.updated_at
    };
  },
  
  toBackend(tenant: Partial<Tenant>) {
    return {
      name: tenant.name,
      domain: tenant.domain,
      branding: tenant.branding,
      settings: tenant.settings
    };
  }
};
