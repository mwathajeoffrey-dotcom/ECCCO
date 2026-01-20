/**
 * Structured Logger Service
 * Replaces console.log with proper logging that includes context, levels, and timestamps
 * Integrates with Sentry for error tracking in production
 */

import * as Sentry from '@sentry/nextjs';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogContext {
  [key: string]: any;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  error?: Error;
}

class Logger {
  private isDevelopment: boolean;
  private isProduction: boolean;
  
  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.isProduction = process.env.NODE_ENV === 'production';
  }
  
  /**
   * Format log entry with timestamp and context
   */
  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, context } = entry;
    
    if (this.isDevelopment) {
      // Colorful output for development
      const colors = {
        debug: '\x1b[36m', // Cyan
        info: '\x1b[34m',  // Blue
        warn: '\x1b[33m',  // Yellow
        error: '\x1b[31m', // Red
      };
      const reset = '\x1b[0m';
      
      let output = `${colors[level]}[${level.toUpperCase()}]${reset} ${timestamp} - ${message}`;
      
      if (context && Object.keys(context).length > 0) {
        output += `\n  Context: ${JSON.stringify(context, null, 2)}`;
      }
      
      return output;
    }
    
    // JSON format for production (easier for log aggregation)
    return JSON.stringify({ level, message, timestamp, ...context });
  }
  
  /**
   * Log debug information (development only)
   */
  debug(message: string, context?: LogContext): void {
    if (!this.isDevelopment) return;
    
    const entry: LogEntry = {
      level: LogLevel.DEBUG,
      message,
      timestamp: new Date().toISOString(),
      context,
    };
    
    console.log(this.formatLog(entry));
  }
  
  /**
   * Log informational messages
   */
  info(message: string, context?: LogContext): void {
    const entry: LogEntry = {
      level: LogLevel.INFO,
      message,
      timestamp: new Date().toISOString(),
      context,
    };
    
    console.log(this.formatLog(entry));
    
    // Send to Sentry as breadcrumb in production
    if (this.isProduction) {
      Sentry.addBreadcrumb({
        category: 'info',
        message,
        data: context,
        level: 'info',
      });
    }
  }
  
  /**
   * Log warning messages
   */
  warn(message: string, context?: LogContext): void {
    const entry: LogEntry = {
      level: LogLevel.WARN,
      message,
      timestamp: new Date().toISOString(),
      context,
    };
    
    console.warn(this.formatLog(entry));
    
    // Send to Sentry as breadcrumb in production
    if (this.isProduction) {
      Sentry.addBreadcrumb({
        category: 'warning',
        message,
        data: context,
        level: 'warning',
      });
    }
  }
  
  /**
   * Log error messages and send to Sentry
   */
  error(message: string, error?: Error, context?: LogContext): void {
    const entry: LogEntry = {
      level: LogLevel.ERROR,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
    };
    
    console.error(this.formatLog(entry));
    
    if (error && error.stack) {
      console.error(error.stack);
    }
    
    // Send to Sentry in production
    if (this.isProduction && error) {
      Sentry.captureException(error, {
        contexts: {
          custom: context || {},
        },
        tags: {
          category: 'application_error',
        },
      });
    }
  }
  
  /**
   * Log performance metrics
   */
  performance(operation: string, durationMs: number, context?: LogContext): void {
    const message = `${operation} completed in ${durationMs}ms`;
    
    this.info(message, {
      ...context,
      operation,
      durationMs,
      category: 'performance',
    });
    
    // Warn if operation takes too long
    if (durationMs > 1000) {
      this.warn(`Slow operation detected: ${operation}`, {
        durationMs,
        threshold: 1000,
      });
    }
  }
  
  /**
   * Helper for timing operations
   */
  async timeAsync<T>(
    operation: string,
    fn: () => Promise<T>,
    context?: LogContext
  ): Promise<T> {
    const start = performance.now();
    
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.performance(operation, duration, context);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.error(
        `Operation failed: ${operation}`,
        error as Error,
        { ...context, durationMs: duration }
      );
      throw error;
    }
  }
  
  /**
   * Helper for timing synchronous operations
   */
  time<T>(operation: string, fn: () => T, context?: LogContext): T {
    const start = performance.now();
    
    try {
      const result = fn();
      const duration = performance.now() - start;
      this.performance(operation, duration, context);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.error(
        `Operation failed: ${operation}`,
        error as Error,
        { ...context, durationMs: duration }
      );
      throw error;
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience methods
export const log = {
  debug: (message: string, context?: LogContext) => logger.debug(message, context),
  info: (message: string, context?: LogContext) => logger.info(message, context),
  warn: (message: string, context?: LogContext) => logger.warn(message, context),
  error: (message: string, error?: Error, context?: LogContext) => 
    logger.error(message, error, context),
  performance: (operation: string, durationMs: number, context?: LogContext) => 
    logger.performance(operation, durationMs, context),
  timeAsync: <T>(operation: string, fn: () => Promise<T>, context?: LogContext) => 
    logger.timeAsync(operation, fn, context),
  time: <T>(operation: string, fn: () => T, context?: LogContext) => 
    logger.time(operation, fn, context),
};

export default logger;
