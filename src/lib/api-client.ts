import { logger } from './logger';

/**
 * Custom API Error class for better error handling
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Generic API client with proper error handling and TypeScript support
 * 
 * @example
 * const topics = await apiClient<Topic[]>('/api/topics');
 */
export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });
    
    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Specific error messages based on status
      let errorMessage = errorData.error || `HTTP ${response.status}`;
      
      switch (response.status) {
        case 400:
          errorMessage = errorData.error || 'Invalid request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Please sign in to continue.';
          break;
        case 403:
          errorMessage = 'You do not have permission to perform this action.';
          break;
        case 404:
          errorMessage = errorData.error || 'Resource not found.';
          break;
        case 409:
          errorMessage = errorData.error || 'Conflict: Resource already exists.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        case 503:
          errorMessage = 'Service temporarily unavailable. Please try again.';
          break;
      }
      
      throw new ApiError(
        errorMessage,
        response.status,
        errorData.code,
        errorData.details
      );
    }
    
    // Parse and return JSON response
    return await response.json();
    
  } catch (error) {
    // Re-throw ApiError as-is
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network errors
    if (error instanceof TypeError) {
      logger.error('Network error', error, { endpoint });
      throw new ApiError('Network error. Please check your connection.', 0);
    }
    
    // Unknown errors
    logger.error('API request failed', error instanceof Error ? error : undefined, { endpoint });
    throw new ApiError('An unexpected error occurred.', 0);
  }
}

/**
 * Typed API helpers for common endpoints
 * Add more as needed!
 */
export const api = {
  topics: {
    getAll: () => apiClient<any[]>('/api/topics'),
    getById: (id: string) => apiClient<any>(`/api/topics/${id}`),
  },
  
  questions: {
    getByTopic: (topicId: string, limit = 50) => 
      apiClient<{ questions: any[] }>(
        `/api/questions?topicId=${topicId}&limit=${limit}`
      ),
  },
  
  quiz: {
    create: (data: any) =>
      apiClient<any>('/api/quiz-arena/create', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    getSession: (sessionId: string) =>
      apiClient<any>(`/api/quiz-arena/session/${sessionId}`),
    
    start: (sessionId: string) =>
      apiClient<any>(`/api/quiz-arena/session/${sessionId}/start`, {
        method: 'POST',
      }),
    
    next: (sessionId: string) =>
      apiClient<any>(`/api/quiz-arena/session/${sessionId}/next`, {
        method: 'POST',
      }),
    
    end: (sessionId: string) =>
      apiClient<any>(`/api/quiz-arena/session/${sessionId}/end`, {
        method: 'POST',
      }),
    
    join: (accessCode: string, playerName: string) =>
      apiClient<any>(`/api/quiz-arena/join/${accessCode}`, {
        method: 'POST',
        body: JSON.stringify({ playerName }),
      }),
    
    submitAnswer: (data: any) =>
      apiClient<any>('/api/quiz-arena/answer', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
  
  user: {
    getStats: () => apiClient<any>('/api/user/stats'),
  },
  
  feedback: {
    submit: (data: any) =>
      apiClient<any>('/api/feedback', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
};
