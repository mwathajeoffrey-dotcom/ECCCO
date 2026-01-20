/**
 * Error Display Components
 * User-friendly error messages with retry functionality
 */

import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { ERROR_MESSAGES } from '@/constants/messages';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
}

export function ErrorDisplay({
  title = 'Something went wrong',
  message = ERROR_MESSAGES.UNKNOWN_ERROR,
  onRetry,
  showHomeButton = false,
}: ErrorDisplayProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-red-900 mb-2">{title}</h3>
      <p className="text-red-700 mb-4">{message}</p>
      <div className="flex gap-3 justify-center">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}
        {showHomeButton && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        )}
      </div>
    </div>
  );
}

export function QuestionLoadError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorDisplay
      title="Unable to Load Questions"
      message={ERROR_MESSAGES.FETCH_QUESTIONS_FAILED}
      onRetry={onRetry}
      showHomeButton={true}
    />
  );
}

export function SearchError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorDisplay
      title="Search Failed"
      message={ERROR_MESSAGES.EVIDENCE_SEARCH_FAILED}
      onRetry={onRetry}
    />
  );
}

export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorDisplay
      title="Connection Error"
      message={ERROR_MESSAGES.NETWORK_ERROR}
      onRetry={onRetry}
    />
  );
}

// Empty state component
export function EmptyState({
  icon: Icon = AlertCircle,
  title,
  message,
  actionLabel,
  onAction,
}: {
  icon?: any;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
