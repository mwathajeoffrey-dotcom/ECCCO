'use client';

import { logger } from '@/lib/logger';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global Error Boundary
 * Catches all unhandled errors in the application
 * This is the root-level error handler for Next.js App Router
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log to Sentry in production
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error);
    } else {
      logger.error('Global Error:', error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full">
            {/* Error Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Oops! Something went wrong
              </h1>
              
              {/* Description */}
              <p className="text-lg text-gray-600 text-center mb-8 max-w-md mx-auto">
                We encountered an unexpected error. Our team has been automatically notified 
                and is working to fix this issue. Your patient data remains secure.
              </p>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-red-900 mb-2 flex items-center">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Development Error Details
                  </h3>
                  <p className="text-sm text-red-800 font-mono break-all mb-2">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-xs text-red-600 mt-2">
                      Error ID: {error.digest}
                    </p>
                  )}
                  {error.stack && (
                    <details className="mt-4">
                      <summary className="text-sm text-red-700 cursor-pointer hover:text-red-900">
                        View Stack Trace
                      </summary>
                      <pre className="text-xs text-red-700 mt-2 overflow-x-auto bg-red-100 p-3 rounded">
                        {error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </button>
                
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <Home className="w-5 h-5" />
                  Go to Homepage
                </Link>
              </div>

              {/* Support Information */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Need immediate help?{' '}
                  <a 
                    href="mailto:support@eccco-platform.com" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Contact our support team
                  </a>
                </p>
                {error.digest && (
                  <p className="text-xs text-gray-400 text-center mt-2">
                    Reference ID: {error.digest}
                  </p>
                )}
              </div>
            </div>

            {/* Medical Safety Note */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800 text-center">
                <span className="font-semibold">Important:</span> This error does not affect 
                patient data integrity. All medical information remains securely stored and unchanged.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
