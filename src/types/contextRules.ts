export interface ResponseFilter {
  type: 'keyword' | 'regex' | 'semantic';
  value: string;
  action: 'block' | 'flag' | 'modify';
} 