import { logger } from '@/lib/logger';
/**
 * Session Management Utilities
 * Handles anonymous user tracking and session persistence
 */

export class SessionManager {
  private static SESSION_KEY = 'eccco-session-id';
  private static USER_KEY = 'eccco-user-id';
  
  /**
   * Get or create a session ID for anonymous tracking
   */
  static getSessionId(): string {
    if (typeof window === 'undefined') return 'anonymous';
    
    let sessionId = localStorage.getItem(this.SESSION_KEY);
    if (!sessionId) {
      sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem(this.SESSION_KEY, sessionId);
    }
    return sessionId;
  }
  
  /**
   * Get user ID if authenticated
   */
  static getUserId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.USER_KEY);
  }
  
  /**
   * Set user ID for authenticated users
   */
  static setUserId(userId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.USER_KEY, userId);
  }
  
  /**
   * Clear session data (logout)
   */
  static clearSession(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
  
  /**
   * Record exam session data to the backend
   */
  static async recordExamSession({
    topicId,
    questions,
    answers,
    score,
    totalTime,
    completed = true
  }: {
    topicId: string;
    questions: string[] | string;
    answers: (number | null)[] | string;
    score?: number;
    totalTime?: number;
    completed?: boolean;
  }) {
    try {
      const sessionId = this.getSessionId();
      const userId = this.getUserId();
      
      // Calculate derived values
      const questionArray = Array.isArray(questions) ? questions : JSON.parse(questions);
      const answerArray = Array.isArray(answers) ? answers : JSON.parse(answers);
      
      const totalQuestions = questionArray.length;
      const correctAnswers = score ? Math.round((score / 100) * totalQuestions) : 0;
      
      const response = await fetch('/api/dashboard/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          userId,
          topicId,
          questions: typeof questions === 'string' ? questions : JSON.stringify(questions),
          answers: typeof answers === 'string' ? answers : JSON.stringify(answers),
          score,
          totalQuestions,
          correctAnswers,
          totalTime,
          completed
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to record session');
      }
      
      return await response.json();
    } catch (error) {
      logger.error('Failed to record exam session:', error);
      throw error;
    }
  }
  
  /**
   * Fetch dashboard analytics
   */
  static async getDashboardData() {
    try {
      const sessionId = this.getSessionId();
      const userId = this.getUserId();
      
      const params = new URLSearchParams({ sessionId });
      if (userId) params.append('userId', userId);
      
      const response = await fetch(`/api/dashboard/analytics?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Unknown error');
      }
      
      return result.data;
    } catch (error) {
      logger.error('Failed to fetch dashboard data:', error);
      throw error;
    }
  }
  
  /**
   * Start tracking a new exam session
   */
  static startExamSession(topicId: string, questions: string[]): string {
    const sessionId = this.getSessionId();
    
    // Store session start time
    const sessionData = {
      topicId,
      questions,
      startTime: Date.now(),
      answers: new Array(questions.length).fill(null)
    };
    
    localStorage.setItem(`exam-session-${sessionId}`, JSON.stringify(sessionData));
    return sessionId;
  }
  
  /**
   * Update exam session with answer
   */
  static updateExamSession(questionIndex: number, answer: number | null): void {
    const sessionId = this.getSessionId();
    const key = `exam-session-${sessionId}`;
    const sessionData = localStorage.getItem(key);
    
    if (sessionData) {
      const session = JSON.parse(sessionData);
      session.answers[questionIndex] = answer;
      session.lastUpdated = Date.now();
      localStorage.setItem(key, JSON.stringify(session));
    }
  }
  
  /**
   * Complete exam session and record to backend
   */
  static async completeExamSession(score: number): Promise<void> {
    const sessionId = this.getSessionId();
    const key = `exam-session-${sessionId}`;
    const sessionData = localStorage.getItem(key);
    
    if (sessionData) {
      const session = JSON.parse(sessionData);
      const totalTime = Math.round((Date.now() - session.startTime) / 1000); // in seconds
      
      await this.recordExamSession({
        topicId: session.topicId,
        questions: session.questions,
        answers: session.answers,
        score,
        totalTime,
        completed: true
      });
      
      // Clean up local session data
      localStorage.removeItem(key);
    }
  }
  
  /**
   * Get current exam session if exists
   */
  static getCurrentExamSession(): any | null {
    const sessionId = this.getSessionId();
    const key = `exam-session-${sessionId}`;
    const sessionData = localStorage.getItem(key);
    
    return sessionData ? JSON.parse(sessionData) : null;
  }
}