/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_LARAVEL_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_USE_MOCK_API: string;
  readonly VITE_API_DEBUG: string;
  readonly MODE: string;
  readonly VITE_APP_ENV: string;
  readonly VITE_WS_URL: string;
  // Add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
