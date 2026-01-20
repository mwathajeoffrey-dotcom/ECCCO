import { logger } from '@/lib/logger';
'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log error to console in development
    logger.error('App Error:', error);
    
    // In production, log to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error);
    }
  }, [error]);

  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Application Error
        </h1>
        
        <p className="text-gray-600 mb-6">
          We're sorry, but something unexpected happened while processing your request. 
          Our team has been notified and is working to fix this issue.
        </p>

        {isDevelopment && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-center mb-2">
              <Bug className="w-4 h-4 text-red-500 mr-2" />
              <h3 className="font-medium text-red-900">Development Error Details</h3>
            </div>
            <p className="text-sm text-red-800 font-mono break-all mb-2">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600">
                Error ID: {error.digest}
              </p>
            )}
            {error.stack && (
              <details className="mt-3">
                <summary className="text-sm text-red-700 cursor-pointer hover:text-red-900">
                  View Stack Trace
                </summary>
                <pre className="text-xs text-red-700 mt-2 overflow-auto bg-red-25 p-2 rounded border max-h-40">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors inline-flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If this problem continues, please{' '}
            <a 
              href="mailto:support@eccco.app" 
              className="text-blue-600 hover:text-blue-700 underline"
            >
              contact our support team
            </a>
            {error.digest && ` and include Error ID: ${error.digest}`}
          </p>
        </div>
      </div>
    </div>
  );
}