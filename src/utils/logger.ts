
/**
 * Logger utility
 * 
 * A simple logging utility that respects environment settings
 */

import { isDev, env } from '@/config/env';

// Debug mode can be enabled via environment variable
const DEBUG = isDev || env.API_DEBUG;

// Safe console methods that check if console exists first
const safeConsole = {
  info: (...args: any[]) => typeof console !== 'undefined' && console.info(...args),
  warn: (...args: any[]) => typeof console !== 'undefined' && console.warn(...args),
  error: (...args: any[]) => typeof console !== 'undefined' && console.error(...args),
  debug: (...args: any[]) => typeof console !== 'undefined' && console.debug(...args),
  log: (...args: any[]) => typeof console !== 'undefined' && console.log(...args),
};

const logger = {
  info: (...args: any[]) => {
    if (DEBUG) {
      safeConsole.info('[INFO]', ...args);
    }
  },
  
  warn: (...args: any[]) => {
    if (DEBUG) {
      safeConsole.warn('[WARN]', ...args);
    }
  },
  
  error: (...args: any[]) => {
    // Always log errors, even in production
    safeConsole.error('[ERROR]', ...args);
  },
  
  debug: (...args: any[]) => {
    if (DEBUG) {
      safeConsole.debug('[DEBUG]', ...args);
    }
  },
  
  // A special method for API debug logs
  api: (...args: any[]) => {
    if (DEBUG) {
      safeConsole.log('[API]', ...args);
    }
  }
};

export default logger;
