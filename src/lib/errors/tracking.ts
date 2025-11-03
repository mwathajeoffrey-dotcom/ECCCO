interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: number;
  userId?: string;
  sessionId?: string;
  userAgent: string;
  url: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
}

interface NetworkErrorInfo extends ErrorInfo {
  type: 'network';
  status?: number;
  endpoint: string;
  method: string;
  response?: string;
}

interface ComponentErrorInfo extends ErrorInfo {
  type: 'component';
  componentName: string;
  props?: Record<string, any>;
}

interface APIErrorInfo extends ErrorInfo {
  type: 'api';
  endpoint: string;
  statusCode: number;
  errorCode?: string;
}

type ErrorEntry = NetworkErrorInfo | ComponentErrorInfo | APIErrorInfo;

class ErrorTrackingService {
  private errors: ErrorEntry[] = [];
  private maxErrors = 100;
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    
    // Set up global error handlers
    if (typeof window !== 'undefined') {
      this.setupGlobalErrorHandlers();
    }
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupGlobalErrorHandlers() {
    // Handle unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError({
        type: 'component',
        message: event.message,
        stack: event.error?.stack,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        severity: 'high',
        componentName: 'Unknown',
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        type: 'api',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        severity: 'medium',
        endpoint: 'unknown',
        statusCode: 0,
        context: {
          reason: event.reason
        }
      });
    });
  }

  logError(errorInfo: Partial<ErrorEntry>): void {
    const error: ErrorEntry = {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'server',
      severity: 'medium',
      ...errorInfo
    } as ErrorEntry;

    this.errors.push(error);

    // Keep only the most recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', error);
    }

    // Send to external service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorService(error);
    }

    // Store in localStorage for offline support
    this.persistError(error);
  }

  private async sendToErrorService(error: ErrorEntry): Promise<void> {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error),
      });
    } catch (err) {
      console.warn('Failed to send error to service:', err);
    }
  }

  private persistError(error: ErrorEntry): void {
    try {
      const storedErrors = JSON.parse(localStorage.getItem('eccco_errors') || '[]');
      storedErrors.push(error);
      
      // Keep only last 50 errors
      const recentErrors = storedErrors.slice(-50);
      localStorage.setItem('eccco_errors', JSON.stringify(recentErrors));
    } catch (err) {
      console.warn('Failed to persist error:', err);
    }
  }

  logNetworkError(
    endpoint: string, 
    method: string, 
    status?: number, 
    response?: string,
    context?: Record<string, any>
  ): void {
    this.logError({
      type: 'network',
      message: `Network error: ${method} ${endpoint}`,
      endpoint,
      method,
      status,
      response,
      severity: status && status >= 500 ? 'critical' : 'medium',
      context
    });
  }

  logComponentError(
    componentName: string, 
    error: Error, 
    props?: Record<string, any>,
    context?: Record<string, any>
  ): void {
    this.logError({
      type: 'component',
      message: error.message,
      stack: error.stack,
      componentName,
      props,
      severity: 'high',
      context
    });
  }

  logAPIError(
    endpoint: string, 
    statusCode: number, 
    errorCode?: string, 
    message?: string,
    context?: Record<string, any>
  ): void {
    this.logError({
      type: 'api',
      message: message || `API error: ${endpoint}`,
      endpoint,
      statusCode,
      errorCode,
      severity: statusCode >= 500 ? 'critical' : 'medium',
      context
    });
  }

  getErrors(): ErrorEntry[] {
    return [...this.errors];
  }

  getErrorsByType(type: ErrorEntry['type']): ErrorEntry[] {
    return this.errors.filter(error => error.type === type);
  }

  getErrorsBySeverity(severity: ErrorInfo['severity']): ErrorEntry[] {
    return this.errors.filter(error => error.severity === severity);
  }

  clearErrors(): void {
    this.errors = [];
    localStorage.removeItem('eccco_errors');
  }

  // Get error statistics
  getErrorStats() {
    const stats = {
      total: this.errors.length,
      byType: {} as Record<string, number>,
      bySeverity: {} as Record<string, number>,
      recent: this.errors.filter(e => Date.now() - e.timestamp < 300000).length // Last 5 minutes
    };

    this.errors.forEach(error => {
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;
    });

    return stats;
  }
}

// Create singleton instance
export const errorTracker = new ErrorTrackingService();

// React hook for component error handling
export function useErrorHandler() {
  return {
    logError: (error: Error, context?: Record<string, any>) => {
      errorTracker.logComponentError('Unknown', error, undefined, context);
    },
    logNetworkError: (endpoint: string, method: string, status?: number, response?: string) => {
      errorTracker.logNetworkError(endpoint, method, status, response);
    },
    logAPIError: (endpoint: string, statusCode: number, errorCode?: string, message?: string) => {
      errorTracker.logAPIError(endpoint, statusCode, errorCode, message);
    }
  };
}