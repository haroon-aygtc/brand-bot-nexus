
export interface Endpoint {
  name: string;
  path: string;
  method: string;
  category: string;
  description: string;
  sampleBody: Record<string, any>;
  requiredFields?: string[];
  params?: EndpointParam[];
}

export interface EndpointParam {
  name: string;
  required: boolean;
  description: string;
  example?: string;
}

export interface ApiResponse {
  status?: number;
  statusText?: string;
  headers?: Record<string, string>;
  data: any;
  time?: number;
  error?: string;
  details?: string;
}
