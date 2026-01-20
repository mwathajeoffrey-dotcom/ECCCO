/**
 * Centralized Error Messages
 * Use these constants for consistent user-facing error messages
 */

export const ERROR_MESSAGES = {
  // Network & Connection
  NETWORK_ERROR: 'Unable to connect. Please check your internet connection and try again.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  SERVER_ERROR: 'Server error occurred. Our team has been notified.',
  
  // Questions
  FETCH_QUESTIONS_FAILED: 'Unable to load questions. Please try again.',
  NO_QUESTIONS_AVAILABLE: 'No questions available for this topic.',
  QUESTION_LOAD_ERROR: 'Error loading question. Please refresh the page.',
  
  // Evidence Search
  EVIDENCE_SEARCH_FAILED: 'Unable to search evidence library. Please try again.',
  NO_EVIDENCE_FOUND: 'No articles found matching your search.',
  
  // Guidelines Search
  GUIDELINES_SEARCH_FAILED: 'Unable to search guidelines. Please try again.',
  NO_GUIDELINES_FOUND: 'No guidelines found matching your search.',
  
  // Authentication
  AUTH_REQUIRED: 'Please sign in to access this feature.',
  AUTH_FAILED: 'Authentication failed. Please try again.',
  SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
  
  // Generic
  UNKNOWN_ERROR: 'Something went wrong. Please try again.',
  NOT_FOUND: 'The requested resource was not found.',
  PERMISSION_DENIED: 'You do not have permission to access this resource.',
} as const;

export const SUCCESS_MESSAGES = {
  EXAM_SAVED: 'Your exam progress has been saved.',
  BOOKMARK_ADDED: 'Bookmark added successfully.',
  BOOKMARK_REMOVED: 'Bookmark removed.',
  FEEDBACK_SUBMITTED: 'Thank you for your feedback!',
} as const;

export const INFO_MESSAGES = {
  LOADING_QUESTIONS: 'Loading questions...',
  LOADING_EVIDENCE: 'Searching evidence library...',
  LOADING_GUIDELINES: 'Searching guidelines...',
  PROCESSING: 'Processing your request...',
} as const;
