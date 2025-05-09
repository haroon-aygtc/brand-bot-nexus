
import { Endpoint } from "@/types/api-tester";

export function generateApiEndpoints(): Endpoint[] {
  return [
    // Auth endpoints
    {
      name: "Login",
      path: "/auth/login",
      method: "POST",
      category: "authentication",
      description: "Authenticate a user and get an access token",
      sampleBody: {
        email: "admin@example.com",
        password: "password"
      },
      requiredFields: ["email", "password"],
      params: []
    },
    {
      name: "Register",
      path: "/auth/register",
      method: "POST",
      category: "authentication",
      description: "Register a new user account",
      sampleBody: {
        name: "New User",
        email: "user@example.com",
        password: "password"
      },
      requiredFields: ["name", "email", "password"],
      params: []
    },
    {
      name: "Get Current User",
      path: "/auth/user",
      method: "GET",
      category: "authentication",
      description: "Get the currently authenticated user",
      sampleBody: {},
      requiredFields: [],
      params: []
    },
    {
      name: "Logout",
      path: "/auth/logout",
      method: "POST",
      category: "authentication",
      description: "Logout the current user and invalidate token",
      sampleBody: {},
      requiredFields: [],
      params: []
    },
    
    // User endpoints
    {
      name: "Get All Users",
      path: "/users",
      method: "GET",
      category: "users",
      description: "Get a list of all users",
      sampleBody: {},
      requiredFields: [],
      params: [
        {
          name: "page",
          required: false,
          description: "Page number for pagination",
          example: "1"
        },
        {
          name: "limit",
          required: false,
          description: "Number of items per page",
          example: "10"
        },
        {
          name: "search",
          required: false,
          description: "Search term to filter users",
          example: "john"
        }
      ]
    },
    {
      name: "Get User by ID",
      path: "/users/{id}",
      method: "GET",
      category: "users",
      description: "Get a specific user by ID",
      sampleBody: {},
      requiredFields: [],
      params: [
        {
          name: "id",
          required: true,
          description: "User ID",
          example: "1"
        }
      ]
    },
    {
      name: "Create User",
      path: "/users",
      method: "POST",
      category: "users",
      description: "Create a new user",
      sampleBody: {
        name: "New User",
        email: "newuser@example.com",
        role: "user",
        password: "password",
        tenantId: 1
      },
      requiredFields: ["name", "email", "role", "password", "tenantId"],
      params: []
    },
    {
      name: "Update User",
      path: "/users/{id}",
      method: "PUT",
      category: "users",
      description: "Update an existing user",
      sampleBody: {
        name: "Updated User",
        email: "updated@example.com",
        role: "admin"
      },
      requiredFields: [],
      params: [
        {
          name: "id",
          required: true,
          description: "User ID to update",
          example: "1"
        }
      ]
    },
    {
      name: "Delete User",
      path: "/users/{id}",
      method: "DELETE",
      category: "users",
      description: "Delete a user",
      sampleBody: {},
      requiredFields: [],
      params: [
        {
          name: "id",
          required: true,
          description: "User ID to delete",
          example: "1"
        }
      ]
    },
    {
      name: "Assign Roles to User",
      path: "/users/{id}/roles",
      method: "POST",
      category: "users",
      description: "Assign roles to a user",
      sampleBody: {
        roles: ["admin", "editor"]
      },
      requiredFields: ["roles"],
      params: [
        {
          name: "id",
          required: true,
          description: "User ID",
          example: "1"
        }
      ]
    },
    
    // Roles endpoints
    {
      name: "Get All Roles",
      path: "/roles",
      method: "GET",
      category: "roles",
      description: "Get a list of all roles",
      sampleBody: {},
      requiredFields: [],
      params: []
    },
    {
      name: "Get Role by ID",
      path: "/roles/{id}",
      method: "GET",
      category: "roles",
      description: "Get a specific role by ID",
      sampleBody: {},
      requiredFields: [],
      params: [
        {
          name: "id",
          required: true,
          description: "Role ID",
          example: "1"
        }
      ]
    },
    {
      name: "Create Role",
      path: "/roles",
      method: "POST",
      category: "roles",
      description: "Create a new role",
      sampleBody: {
        name: "Editor",
        description: "Can edit content"
      },
      requiredFields: ["name"],
      params: []
    },
    {
      name: "Update Role",
      path: "/roles/{id}",
      method: "PUT",
      category: "roles",
      description: "Update an existing role",
      sampleBody: {
        name: "Senior Editor",
        description: "Can edit and approve content"
      },
      requiredFields: [],
      params: [
        {
          name: "id",
          required: true,
          description: "Role ID to update",
          example: "1"
        }
      ]
    },
    {
      name: "Delete Role",
      path: "/roles/{id}",
      method: "DELETE",
      category: "roles",
      description: "Delete a role",
      sampleBody: {},
      requiredFields: [],
      params: [
        {
          name: "id",
          required: true,
          description: "Role ID to delete",
          example: "1"
        }
      ]
    },
    {
      name: "Assign Permissions to Role",
      path: "/roles/{id}/permissions",
      method: "POST",
      category: "roles",
      description: "Assign permissions to a role",
      sampleBody: {
        permissions: ["create_user", "edit_user", "delete_user"]
      },
      requiredFields: ["permissions"],
      params: [
        {
          name: "id",
          required: true,
          description: "Role ID",
          example: "1"
        }
      ]
    },
    
    // AI Models endpoints
    {
      name: "Get All AI Models",
      path: "/ai-models",
      method: "GET",
      category: "ai-models",
      description: "Get a list of all AI models",
      sampleBody: {},
      requiredFields: [],
      params: []
    },
    {
      name: "Get AI Model by ID",
      path: "/ai-models/{id}",
      method: "GET",
      category: "ai-models",
      description: "Get a specific AI model by ID",
      sampleBody: {},
      requiredFields: [],
      params: [
        {
          name: "id",
          required: true,
          description: "AI Model ID",
          example: "1"
        }
      ]
    },
    {
      name: "Create AI Model",
      path: "/ai-models",
      method: "POST",
      category: "ai-models",
      description: "Create a new AI model",
      sampleBody: {
        name: "GPT-4 Model",
        provider: "openai",
        model: "gpt-4",
        temperature: 0.7,
        max_tokens: 2000,
        system_prompt: "You are a helpful assistant.",
        enabled: true,
        api_key: "your-api-key"
      },
      requiredFields: ["name", "provider", "model", "temperature", "max_tokens"],
      params: []
    },
    {
      name: "Update AI Model",
      path: "/ai-models/{id}",
      method: "PUT",
      category: "ai-models",
      description: "Update an existing AI model",
      sampleBody: {
        name: "Updated GPT-4 Model",
        temperature: 0.5,
        max_tokens: 1500,
        system_prompt: "You are a helpful and concise assistant."
      },
      requiredFields: [],
      params: [
        {
          name: "id",
          required: true,
          description: "AI Model ID to update",
          example: "1"
        }
      ]
    },
    {
      name: "Delete AI Model",
      path: "/ai-models/{id}",
      method: "DELETE",
      category: "ai-models",
      description: "Delete an AI model",
      sampleBody: {},
      requiredFields: [],
      params: [
        {
          name: "id",
          required: true,
          description: "AI Model ID to delete",
          example: "1"
        }
      ]
    },
    {
      name: "Test AI Model",
      path: "/ai-models/{id}/test",
      method: "POST",
      category: "ai-models",
      description: "Test an AI model with a message",
      sampleBody: {
        message: "Hello, how are you today?"
      },
      requiredFields: ["message"],
      params: [
        {
          name: "id",
          required: true,
          description: "AI Model ID to test",
          example: "1"
        }
      ]
    },
    
    // Knowledge Base endpoints
    {
      name: "Get Knowledge Base Items",
      path: "/knowledge-base",
      method: "GET",
      category: "knowledge-base",
      description: "Get a list of knowledge base items",
      sampleBody: {},
      requiredFields: [],
      params: [
        {
          name: "search",
          required: false,
          description: "Search term to filter items",
          example: "product"
        }
      ]
    },
    {
      name: "Create Knowledge Item",
      path: "/knowledge-base",
      method: "POST",
      category: "knowledge-base",
      description: "Create a new knowledge base item",
      sampleBody: {
        title: "Product FAQ",
        content: "This is a frequently asked question about our product.",
        tags: ["faq", "product"]
      },
      requiredFields: ["title", "content"],
      params: []
    },
    
    // Chat endpoints
    {
      name: "Get All Chats",
      path: "/chats",
      method: "GET",
      category: "chats",
      description: "Get a list of all chats",
      sampleBody: {},
      requiredFields: [],
      params: []
    },
    {
      name: "Create Chat",
      path: "/chats",
      method: "POST",
      category: "chats",
      description: "Create a new chat session",
      sampleBody: {
        title: "Customer Support Chat",
        ai_model_id: 1
      },
      requiredFields: ["title", "ai_model_id"],
      params: []
    },
    {
      name: "Add Chat Message",
      path: "/chats/{id}/messages",
      method: "POST",
      category: "chats",
      description: "Add a message to a chat",
      sampleBody: {
        content: "Hello, I need help with my order.",
        type: "user"
      },
      requiredFields: ["content", "type"],
      params: [
        {
          name: "id",
          required: true,
          description: "Chat ID",
          example: "1"
        }
      ]
    },
    
    // AI Config endpoints - Data Sources
    {
      name: "Get Data Sources",
      path: "/ai-config/data-sources",
      method: "GET",
      category: "ai-config",
      description: "Get all data sources for AI",
      sampleBody: {},
      requiredFields: [],
      params: []
    },
    {
      name: "Create Data Source",
      path: "/ai-config/data-sources",
      method: "POST",
      category: "ai-config",
      description: "Create a new data source",
      sampleBody: {
        name: "Company Knowledge Base",
        type: "database",
        config: {
          connection_string: "db_connection",
          table: "knowledge"
        }
      },
      requiredFields: ["name", "type", "config"],
      params: []
    }
  ];
}
