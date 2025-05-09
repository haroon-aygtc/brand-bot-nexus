
/**
 * Logger utility
 * 
 * A simple logging utility that respects environment settings
 */

import { isDev, env } from '@/config/env';

// Debug mode can be enabled via environment variable
const DEBUG = isDev || env.API_DEBUG;

const logger = {
  info: (...args: any[]) => {
    if (DEBUG) {
      console.info('[INFO]', ...args);
    }
  },
  
  warn: (...args: any[]) => {
    if (DEBUG) {
      console.warn('[WARN]', ...args);
    }
  },
  
  error: (...args: any[]) => {
    // Always log errors, even in production
    console.error('[ERROR]', ...args);
  },
  
  debug: (...args: any[]) => {
    if (DEBUG) {
      console.debug('[DEBUG]', ...args);
    }
  },
  
  // A special method for API debug logs
  api: (...args: any[]) => {
    if (DEBUG) {
      console.log('[API]', ...args);
    }
  }
};

export default logger;
