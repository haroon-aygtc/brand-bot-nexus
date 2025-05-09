
/**
 * Logger utility
 * 
 * A simple logging utility that respects environment settings
 */

// Debug mode is always enabled in development
const DEBUG = true;

// Logger interface
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
    // Always log errors
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
