'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Bug, ChevronDown, ChevronUp } from 'lucide-react';
import * as Sentry from '@sentry/nextjs';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  isolate?: boolean; // Whether to isolate this boundary (don't propagate to parent)
  showDetails?: boolean;
  customTitle?: string;
  customMessage?: string;
  retryable?: boolean;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  errorId?: string;
  eventId?: string; // Sentry event ID
  retryCount: number;
  showDetails: boolean;
}

export class EnhancedErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      retryCount: 0,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { 
      hasError: true, 
      error,
      errorId: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { onError, componentName = 'UnknownComponent' } = this.props;
    
    this.setState({
      error,
      errorInfo,
    });

    // Report to Sentry in production
    if (process.env.NODE_ENV === 'production') {
      const eventId = Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
        tags: {
          componentName,
          retryCount: this.state.retryCount,
        },
        extra: {
          errorId: this.state.errorId,
          props: this.props,
        },
      });
      this.setState({ eventId });
    }

    // Log the error to console
    console.error('Component Error:', {
      componentName,
      error,
      props: this.props,
      errorInfo: errorInfo.componentStack,
      retryCount: this.state.retryCount,
      errorId: this.state.errorId
    });

    // Call custom error handler
    onError?.(error, errorInfo);

    // Log error details
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error in ${componentName}`);
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }
  }

  handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
        retryCount: prevState.retryCount + 1,
        showDetails: false
      }));
    }
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      retryCount: 0,
      showDetails: false
    });
  };

  toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  };

  render() {
    if (this.state.hasError) {
      const { 
        fallback, 
        isolate, 
        showDetails = process.env.NODE_ENV === 'development',
        customTitle,
        customMessage,
        retryable = true,
        componentName = 'Component'
      } = this.props;

      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      const canRetry = retryable && this.state.retryCount < this.maxRetries;
      const isDevelopment = process.env.NODE_ENV === 'development';

      // Determine error severity
      const isCritical = this.state.error?.message?.toLowerCase().includes('chunk') ||
                        this.state.error?.message?.toLowerCase().includes('loading') ||
                        this.state.retryCount >= 2;

      return (
        <div className={`${isolate ? '' : 'min-h-[200px]'} bg-red-50 border border-red-200 rounded-lg p-6 m-4`}>
          <div className="flex items-start space-x-3">
            <div className={`flex-shrink-0 ${isCritical ? 'text-red-600' : 'text-orange-500'}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {customTitle || `${componentName} Error`}
              </h3>
              
              <p className="text-gray-700 mb-4">
                {customMessage || 
                 `An error occurred while rendering this ${componentName.toLowerCase()}. ${
                   canRetry ? 'You can try again or' : ''
                 } Please refresh the page if the problem persists.`}
              </p>

              {this.state.errorId && (
                <p className="text-xs text-gray-500 mb-4">
                  Error ID: {this.state.errorId}
                  {this.state.eventId && ` | Sentry ID: ${this.state.eventId}`}
                </p>
              )}

              {/* Retry information */}
              {this.state.retryCount > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                  <p className="text-sm text-yellow-800">
                    Retry attempt {this.state.retryCount} of {this.maxRetries}
                  </p>
                </div>
              )}

              {/* Report to Sentry button (production only) */}
              {process.env.NODE_ENV === 'production' && this.state.eventId && (
                <div className="mb-4">
                  <button
                    onClick={() => {
                      if (this.state.eventId) {
                        Sentry.showReportDialog({ eventId: this.state.eventId });
                      }
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Report feedback to our team
                  </button>
                </div>
              )}

              {/* Error details for development */}
              {(showDetails || isDevelopment) && this.state.error && (
                <div className="mb-4">
                  <button
                    onClick={this.toggleDetails}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-2"
                  >
                    {this.state.showDetails ? (
                      <ChevronUp className="w-4 h-4 mr-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 mr-1" />
                    )}
                    {this.state.showDetails ? 'Hide' : 'Show'} Error Details
                  </button>

                  {this.state.showDetails && (
                    <div className="bg-gray-100 rounded p-3 text-sm">
                      <div className="mb-2">
                        <strong>Error:</strong>
                        <pre className="mt-1 text-red-600 font-mono text-xs whitespace-pre-wrap">
                          {this.state.error.message}
                        </pre>
                      </div>
                      
                      {this.state.error.stack && (
                        <div className="mb-2">
                          <strong>Stack Trace:</strong>
                          <pre className="mt-1 text-gray-600 font-mono text-xs whitespace-pre-wrap max-h-32 overflow-auto">
                            {this.state.error.stack}
                          </pre>
                        </div>
                      )}
                      
                      {this.state.errorInfo?.componentStack && (
                        <div>
                          <strong>Component Stack:</strong>
                          <pre className="mt-1 text-gray-600 font-mono text-xs whitespace-pre-wrap max-h-32 overflow-auto">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                {canRetry && (
                  <button
                    onClick={this.handleRetry}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Try Again ({this.maxRetries - this.state.retryCount} left)
                  </button>
                )}
                
                <button
                  onClick={this.handleReset}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Reset Component
                </button>

                {isDevelopment && (
                  <button
                    onClick={() => {
                      console.log('Error State:', this.state);
                      console.log('Props:', this.props);
                    }}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Bug className="w-4 h-4 mr-1" />
                    Debug
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component factory
export function withEnhancedErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
  options?: {
    fallback?: ReactNode;
    componentName?: string;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    isolate?: boolean;
    retryable?: boolean;
  }
) {
  const WrappedComponent = (props: T) => (
    <EnhancedErrorBoundary
      componentName={options?.componentName || Component.displayName || Component.name}
      fallback={options?.fallback}
      onError={options?.onError}
      isolate={options?.isolate}
      retryable={options?.retryable}
    >
      <Component {...props} />
    </EnhancedErrorBoundary>
  );

  WrappedComponent.displayName = `withEnhancedErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}