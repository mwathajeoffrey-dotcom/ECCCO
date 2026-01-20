// Centralized error handling and logging system
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  error?: Error;
  userId?: string;
  requestId?: string;
  metadata?: Record<string, any>;
}

class Logger {
  private logLevel: LogLevel;
  private isProduction: boolean;

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
    this.logLevel = this.getLogLevel();
  }

  private getLogLevel(): LogLevel {
    const level = process.env.LOG_LEVEL?.toLowerCase();
    switch (level) {
      case 'error':
        return LogLevel.ERROR;
      case 'warn':
        return LogLevel.WARN;
      case 'info':
        return LogLevel.INFO;
      case 'debug':
        return LogLevel.DEBUG;
      default:
        return this.isProduction ? LogLevel.WARN : LogLevel.DEBUG;
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.logLevel;
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    error?: Error,
    metadata?: Record<string, any>
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      error,
      metadata,
    };
  }

  private formatLog(entry: LogEntry): string {
    const levelName = LogLevel[entry.level];
    const timestamp = entry.timestamp;
    const message = entry.message;
    
    let formatted = `[${timestamp}] ${levelName}: ${message}`;
    
    if (entry.metadata) {
      formatted += ` | Metadata: ${JSON.stringify(entry.metadata)}`;
    }
    
    if (entry.error) {
      formatted += `\n  Error: ${entry.error.message}`;
      if (!this.isProduction && entry.error.stack) {
        formatted += `\n  Stack: ${entry.error.stack}`;
      }
    }
    
    return formatted;
  }

  error(message: string, error?: Error, metadata?: Record<string, any>) {
    if (!this.shouldLog(LogLevel.ERROR)) return;
    
    const entry = this.createLogEntry(LogLevel.ERROR, message, error, metadata);
    
    // In production, send to external logging service
    if (this.isProduction) {
      this.sendToExternalLogger(entry);
    }
    
    logger.error(this.formatLog(entry));
  }

  warn(message: string, metadata?: Record<string, any>) {
    if (!this.shouldLog(LogLevel.WARN)) return;
    
    const entry = this.createLogEntry(LogLevel.WARN, message, undefined, metadata);
    logger.warn(this.formatLog(entry));
  }

  info(message: string, metadata?: Record<string, any>) {
    if (!this.shouldLog(LogLevel.INFO)) return;
    
    const entry = this.createLogEntry(LogLevel.INFO, message, undefined, metadata);
    console.info(this.formatLog(entry));
  }

  debug(message: string, metadata?: Record<string, any>) {
    if (!this.shouldLog(LogLevel.DEBUG)) return;
    
    const entry = this.createLogEntry(LogLevel.DEBUG, message, undefined, metadata);
    logger.debug(this.formatLog(entry));
  }

  private async sendToExternalLogger(entry: LogEntry) {
    try {
      // Example: Send to external service like Sentry, LogRocket, or custom endpoint
      if (process.env.SENTRY_DSN) {
        // Sentry integration would go here
      }
      
      // Example: Send to webhook
      if (process.env.ERROR_WEBHOOK_URL) {
        await fetch(process.env.ERROR_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        }).catch(() => {
          // Fail silently to avoid logging loops
        });
      }
    } catch (error) {
      // Fail silently to avoid infinite logging loops
    }
  }
}

// Global logger instance
export const logger = new Logger();

// Error types for better error handling
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public code?: string;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    code?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 400, true, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, true, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, true, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, true, 'NOT_FOUND_ERROR');
    this.name = 'NotFoundError';
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, originalError?: Error) {
    super(message, 500, true, 'DATABASE_ERROR');
    this.name = 'DatabaseError';
    logger.error('Database error occurred', originalError, { message });
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message: string) {
    super(`${service} service error: ${message}`, 503, true, 'EXTERNAL_SERVICE_ERROR');
    this.name = 'ExternalServiceError';
  }
}

// Error handler middleware utility
export function createErrorHandler() {
  return (error: Error, req?: any, res?: any, next?: any) => {
    let appError: AppError;

    if (error instanceof AppError) {
      appError = error;
    } else {
      // Convert unknown errors to AppError
      appError = new AppError(
        'Internal server error',
        500,
        false,
        'INTERNAL_ERROR'
      );
    }

    // Log the error
    logger.error(
      `${appError.name}: ${appError.message}`,
      error,
      {
        statusCode: appError.statusCode,
        code: appError.code,
        url: req?.url,
        method: req?.method,
        userAgent: req?.headers?.['user-agent'],
        ip: req?.ip,
      }
    );

    // Send error response (if in API route context)
    if (res) {
      const isProduction = process.env.NODE_ENV === 'production';
      
      res.status(appError.statusCode).json({
        error: {
          message: appError.isOperational ? appError.message : 'Internal server error',
          code: appError.code,
          ...(isProduction ? {} : { stack: error.stack }),
        },
      });
    }

    return appError;
  };
}

// Request logging middleware
export function logRequest(req: any, res: any, next: any) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substr(2, 9);
  
  // Add request ID to request object
  req.requestId = requestId;
  
  logger.info('Incoming request', {
    requestId,
    method: req.method,
    url: req.url,
    userAgent: req.headers['user-agent'],
    ip: req.ip,
  });

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info('Request completed', {
      requestId,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  if (next) next();
}

// Utility for wrapping async route handlers
export function asyncHandler<T extends any[], R>(
  fn: (...args: T) => Promise<R>
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      const errorHandler = createErrorHandler();
      throw errorHandler(error as Error);
    }
  };
}

// Performance monitoring
export class PerformanceLogger {
  private static timers = new Map<string, number>();

  static start(label: string): void {
    this.timers.set(label, Date.now());
  }

  static end(label: string, metadata?: Record<string, any>): void {
    const startTime = this.timers.get(label);
    if (startTime) {
      const duration = Date.now() - startTime;
      logger.info(`Performance: ${label}`, {
        duration: `${duration}ms`,
        ...metadata,
      });
      this.timers.delete(label);
    }
  }

  static measure<T>(label: string, fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.start(label);
      fn()
        .then((result) => {
          this.end(label);
          resolve(result);
        })
        .catch((error) => {
          this.end(label, { error: true });
          reject(error);
        });
    });
  }
}

// Client-side error reporting
export function setupClientErrorReporting() {
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
      logger.error('Client-side error', event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        type: 'javascript',
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      logger.error('Unhandled promise rejection', event.reason, {
        type: 'promise',
      });
    });
  }
}