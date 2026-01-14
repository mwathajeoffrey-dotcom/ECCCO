/**
 * User-Friendly Error Messages
 * Provides consistent, helpful error messages across the application
 */

export interface ErrorMessage {
  title: string;
  message: string;
  action?: string;
}

export const ERROR_MESSAGES: Record<string, ErrorMessage> = {
  // Network & Connection Errors
  NETWORK_ERROR: {
    title: "Connection Issue 📡",
    message: "Unable to reach the server. Please check your internet connection and try again.",
    action: "Retry",
  },
  OFFLINE: {
    title: "You're Offline 📵",
    message: "No internet connection detected. Some features may not work properly.",
    action: "OK",
  },
  TIMEOUT: {
    title: "Request Timeout ⏱️",
    message: "The request took too long. Please try again.",
    action: "Retry",
  },

  // Quiz Arena Errors
  SESSION_NOT_FOUND: {
    title: "Quiz Not Found 🔍",
    message: "This quiz session may have ended or the access code is incorrect.",
    action: "Go Back",
  },
  SESSION_ENDED: {
    title: "Quiz Ended 🏁",
    message: "This quiz session has already ended.",
    action: "View Results",
  },
  INVALID_ACCESS_CODE: {
    title: "Invalid Code ❌",
    message: "The access code you entered is not valid. Please check and try again.",
    action: "Retry",
  },
  ALREADY_JOINED: {
    title: "Already Joined ✓",
    message: "You've already joined this quiz session.",
    action: "Continue",
  },

  // Question & Practice Errors
  QUESTIONS_FAILED: {
    title: "Loading Error 😕",
    message: "Couldn't load questions. Please try again in a moment.",
    action: "Retry",
  },
  NO_QUESTIONS: {
    title: "No Questions Available 📝",
    message: "No questions found for this category. Please try another topic.",
    action: "Browse Topics",
  },
  SUBMISSION_FAILED: {
    title: "Submission Failed 💔",
    message: "Your answer couldn't be submitted. Please try again.",
    action: "Retry",
  },

  // Authentication Errors
  UNAUTHORIZED: {
    title: "Sign In Required 🔐",
    message: "Please sign in to access this feature.",
    action: "Sign In",
  },
  FORBIDDEN: {
    title: "Access Denied 🚫",
    message: "You don't have permission to access this resource.",
    action: "Go Back",
  },
  SESSION_EXPIRED: {
    title: "Session Expired ⏰",
    message: "Your session has expired. Please sign in again.",
    action: "Sign In",
  },

  // Bookmark Errors
  BOOKMARK_FAILED: {
    title: "Bookmark Failed 💫",
    message: "Couldn't save your bookmark. Please try again.",
    action: "Retry",
  },
  BOOKMARK_REMOVE_FAILED: {
    title: "Remove Failed 🗑️",
    message: "Couldn't remove the bookmark. Please try again.",
    action: "Retry",
  },

  // General Errors
  UNKNOWN_ERROR: {
    title: "Something Went Wrong 😕",
    message: "An unexpected error occurred. Please try again or contact support if the problem persists.",
    action: "Retry",
  },
  SERVER_ERROR: {
    title: "Server Error 🔧",
    message: "Our servers are experiencing issues. Please try again in a few moments.",
    action: "Retry",
  },
  VALIDATION_ERROR: {
    title: "Invalid Input ⚠️",
    message: "Please check your input and try again.",
    action: "OK",
  },

  // Data Errors
  SAVE_FAILED: {
    title: "Save Failed 💾",
    message: "Couldn't save your changes. Please try again.",
    action: "Retry",
  },
  DELETE_FAILED: {
    title: "Delete Failed 🗑️",
    message: "Couldn't delete the item. Please try again.",
    action: "Retry",
  },
  LOAD_FAILED: {
    title: "Loading Failed 📂",
    message: "Couldn't load the requested data. Please try again.",
    action: "Retry",
  },
};

export const SUCCESS_MESSAGES = {
  // Quiz Arena
  QUIZ_CREATED: "Quiz created successfully! 🎉",
  QUIZ_JOINED: "Joined quiz successfully! 👋",
  ANSWER_SUBMITTED: "Answer submitted! ✓",
  QUIZ_COMPLETED: "Quiz completed! Great job! 🏆",

  // Practice
  CORRECT_ANSWER: "Correct! Well done! ✓",
  PRACTICE_COMPLETE: "Practice session completed! 🎯",

  // Bookmarks
  BOOKMARK_ADDED: "Question bookmarked! 📌",
  BOOKMARK_REMOVED: "Bookmark removed ✓",

  // General
  SAVED: "Saved successfully! ✓",
  DELETED: "Deleted successfully! ✓",
  UPDATED: "Updated successfully! ✓",
  COPIED: "Copied to clipboard! 📋",
};

export const INFO_MESSAGES = {
  AUTO_ADVANCE: "Auto-advancing to next question... ⏭️",
  TIME_WARNING: "30 seconds remaining! ⏰",
  ALL_SUBMITTED: "All participants have submitted! 🎯",
  WAITING_FOR_HOST: "Waiting for host to start... ⏳",
  LOADING: "Loading... ⏳",
};

/**
 * Get error message based on HTTP status code
 */
export function getErrorFromStatus(status: number): ErrorMessage {
  switch (status) {
    case 401:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case 403:
      return ERROR_MESSAGES.FORBIDDEN;
    case 404:
      return ERROR_MESSAGES.SESSION_NOT_FOUND;
    case 408:
      return ERROR_MESSAGES.TIMEOUT;
    case 500:
    case 502:
    case 503:
      return ERROR_MESSAGES.SERVER_ERROR;
    default:
      return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
}

/**
 * Get error message from fetch error
 */
export function getErrorFromFetch(error: any): ErrorMessage {
  if (error.message?.includes("Failed to fetch") || error.message?.includes("NetworkError")) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  if (error.message?.includes("timeout") || error.message?.includes("timed out")) {
    return ERROR_MESSAGES.TIMEOUT;
  }
  return ERROR_MESSAGES.UNKNOWN_ERROR;
}
