/**
 * Simple logger utility for the frontend
 */
const logger = {
  /**
   * Log info message
   * @param message Message to log
   * @param data Optional data to log
   */
  info: (message: string, data?: any) => {
    if (import.meta.env.DEV) {
      console.info(`[INFO] ${message}`, data || '');
    }
  },

  /**
   * Log warning message
   * @param message Message to log
   * @param data Optional data to log
   */
  warn: (message: string, data?: any) => {
    if (import.meta.env.DEV) {
      console.warn(`[WARN] ${message}`, data || '');
    }
  },

  /**
   * Log error message
   * @param message Message to log
   * @param error Optional error to log
   */
  error: (message: string, error?: any) => {
    if (import.meta.env.DEV) {
      console.error(`[ERROR] ${message}`, error || '');
    }
  },

  /**
   * Log debug message
   * @param message Message to log
   * @param data Optional data to log
   */
  debug: (message: string, data?: any) => {
    if (import.meta.env.DEV) {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  },
};

export default logger;
