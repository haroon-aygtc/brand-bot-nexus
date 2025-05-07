
import { useState } from 'react';
import api from '@/lib/api';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseApiResult<T, P> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  execute: (params?: P) => Promise<T | null>;
}

// Modified to support functions with multiple parameters
type ApiFunction<T, P> = (params?: P) => Promise<T>;
type ApiMultiParamFunction<T, P1, P2> = (param1: P1, param2: P2) => Promise<T>;

export function useApi<T, P = void>(
  apiFunc: ApiFunction<T, P>,
  options?: UseApiOptions<T>
): UseApiResult<T, P> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (params?: P): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiFunc(params);
      setData(result);
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options?.onError?.(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
}

// New hook for API functions that take two parameters
export function useApiWithParams<T, P1, P2>(
  apiFunc: ApiMultiParamFunction<T, P1, P2>,
  options?: UseApiOptions<T>
): {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  execute: (param1: P1, param2: P2) => Promise<T | null>;
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (param1: P1, param2: P2): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiFunc(param1, param2);
      setData(result);
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options?.onError?.(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
}

// Specialized hooks for common operations
export function useGetKnowledgeBase() {
  return useApi(api.knowledgeBase.getAll);
}

export function useGetChats() {
  return useApi(api.chats.getAll);
}

export function useGetAiModels() {
  return useApi(api.aiModels.getAll);
}

export function useGetTenants() {
  return useApi(api.tenants.getAll);
}

export function useGetUsers() {
  return useApi(api.users.getAll);
}

// Specialized hooks for AI configuration
export function useGetDataSources() {
  return useApi(api.aiConfig.dataSources.getAll);
}

export function useCreateDataSource() {
  return useApi(api.aiConfig.dataSources.create);
}

// Using the new hook for functions with two parameters
export function useUpdateDataSource() {
  return useApiWithParams<any, string, any>(api.aiConfig.dataSources.update);
}

export function useDeleteDataSource() {
  return useApi(api.aiConfig.dataSources.delete);
}

export function useGetPromptTemplates() {
  return useApi(api.aiConfig.promptTemplates.getAll);
}

export function useCreatePromptTemplate() {
  return useApi(api.aiConfig.promptTemplates.create);
}

// Using the new hook for functions with two parameters
export function useUpdatePromptTemplate() {
  return useApiWithParams<any, string, any>(api.aiConfig.promptTemplates.update);
}

export function useDeletePromptTemplate() {
  return useApi(api.aiConfig.promptTemplates.delete);
}

export function useGetResponseFormatters() {
  return useApi(api.aiConfig.responseFormatters.getAll);
}

export function useCreateResponseFormatter() {
  return useApi(api.aiConfig.responseFormatters.create);
}

// Using the new hook for functions with two parameters
export function useUpdateResponseFormatter() {
  return useApiWithParams<any, string, any>(api.aiConfig.responseFormatters.update);
}

export function useDeleteResponseFormatter() {
  return useApi(api.aiConfig.responseFormatters.delete);
}

export function useGetBrandingSettings() {
  return useApi(api.aiConfig.branding.getSettings);
}

export function useUpdateBrandingSettings() {
  return useApi(api.aiConfig.branding.updateSettings);
}

export function useUploadBrandingLogo() {
  return useApi(api.aiConfig.branding.uploadLogo);
}

export function useGetFollowUpQuestions() {
  return useApi(api.aiConfig.followUpQuestions.getAll);
}

export function useCreateFollowUpQuestion() {
  return useApi(api.aiConfig.followUpQuestions.create);
}

// Using the new hook for functions with two parameters
export function useUpdateFollowUpQuestion() {
  return useApiWithParams<any, string, any>(api.aiConfig.followUpQuestions.update);
}

export function useDeleteFollowUpQuestion() {
  return useApi(api.aiConfig.followUpQuestions.delete);
}
