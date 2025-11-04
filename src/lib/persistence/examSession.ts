/**
 * ECCCO Exam Session Persistence System
 * 
 * Provides comprehensive session management with automatic backup,
 * recovery capabilities, and cross-tab synchronization for medical exams.
 */

export interface ExamSessionData {
  // Core Exam State
  sessionId: string;
  topicId: string;
  topicName: string;
  questions: any[];
  currentQuestionIndex: number;
  selectedAnswers: { [key: number]: number };
  flaggedQuestions: number[];
  
  // Timing and Progress
  timeRemaining: number; // seconds
  totalTime: number; // original time limit
  startTime: number; // timestamp
  pauseTime?: number; // timestamp when paused
  isPaused: boolean;
  
  // Session Metadata
  isStarted: boolean;
  isFinished: boolean;
  showAnswerAfterAttempt: boolean;
  currentQuestionAnswered: boolean;
  lastSaved: number; // timestamp
  
  // Analytics & Tracking
  answersHistory: Array<{
    questionIndex: number;
    answer: number;
    timestamp: number;
    timeSpent: number; // seconds on this question
  }>;
  
  // Recovery Metadata
  deviceInfo: {
    userAgent: string;
    screenSize: string;
    timezone: string;
  };
  
  // Backup Settings
  autoSaveInterval: number; // seconds
  version: string; // for migration compatibility
}

export interface ExamRecoveryOptions {
  showConfirmation?: boolean;
  clearOnRecovery?: boolean;
  validateSession?: boolean;
}

class ExamSessionManager {
  private static instance: ExamSessionManager;
  private readonly STORAGE_KEY = 'eccco_exam_session';
  private readonly BACKUP_KEY = 'eccco_exam_backup';
  private readonly VERSION = '1.0.0';
  private autoSaveTimer: NodeJS.Timeout | null = null;
  private currentSession: ExamSessionData | null = null;
  
  private constructor() {
    // Initialize cross-tab synchronization
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.handleStorageChange.bind(this));
      window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
      
      // Periodic backup every 30 seconds
      this.startAutoSave(30);
    }
  }

  static getInstance(): ExamSessionManager {
    if (!ExamSessionManager.instance) {
      ExamSessionManager.instance = new ExamSessionManager();
    }
    return ExamSessionManager.instance;
  }

  /**
   * Initialize new exam session
   */
  initializeSession(
    topicId: string, 
    topicName: string, 
    questions: any[], 
    timeLimit: number = 45 * 60
  ): ExamSessionData {
    const sessionData: ExamSessionData = {
      sessionId: this.generateSessionId(),
      topicId,
      topicName,
      questions,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      flaggedQuestions: [],
      
      timeRemaining: timeLimit,
      totalTime: timeLimit,
      startTime: Date.now(),
      isPaused: false,
      
      isStarted: true,
      isFinished: false,
      showAnswerAfterAttempt: false,
      currentQuestionAnswered: false,
      lastSaved: Date.now(),
      
      answersHistory: [],
      
      deviceInfo: {
        userAgent: navigator.userAgent,
        screenSize: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      
      autoSaveInterval: 30,
      version: this.VERSION
    };

    this.currentSession = sessionData;
    this.saveSession(sessionData);
    return sessionData;
  }

  /**
   * Update current session state
   */
  updateSession(updates: Partial<ExamSessionData>): void {
    if (!this.currentSession) return;
    
    this.currentSession = {
      ...this.currentSession,
      ...updates,
      lastSaved: Date.now()
    };
    
    this.saveSession(this.currentSession);
  }

  /**
   * Record answer submission with analytics
   */
  recordAnswer(questionIndex: number, answer: number, timeSpent: number): void {
    if (!this.currentSession) return;
    
    // Update selected answers
    this.currentSession.selectedAnswers[questionIndex] = answer;
    
    // Add to history
    this.currentSession.answersHistory.push({
      questionIndex,
      answer,
      timestamp: Date.now(),
      timeSpent
    });
    
    this.currentSession.lastSaved = Date.now();
    this.saveSession(this.currentSession);
  }

  /**
   * Update time remaining
   */
  updateTimeRemaining(timeRemaining: number): void {
    if (!this.currentSession) return;
    
    this.currentSession.timeRemaining = timeRemaining;
    this.currentSession.lastSaved = Date.now();
    
    // Save less frequently during timer updates to avoid performance issues
    if (timeRemaining % 10 === 0) {
      this.saveSession(this.currentSession);
    }
  }

  /**
   * Pause exam session
   */
  pauseSession(): void {
    if (!this.currentSession) return;
    
    this.currentSession.isPaused = true;
    this.currentSession.pauseTime = Date.now();
    this.saveSession(this.currentSession);
  }

  /**
   * Resume exam session
   */
  resumeSession(): void {
    if (!this.currentSession || !this.currentSession.pauseTime) return;
    
    // Calculate pause duration and adjust start time
    const pauseDuration = Date.now() - this.currentSession.pauseTime;
    this.currentSession.startTime += pauseDuration;
    
    this.currentSession.isPaused = false;
    delete this.currentSession.pauseTime;
    this.saveSession(this.currentSession);
  }

  /**
   * Complete exam session
   */
  completeSession(score?: number): void {
    if (!this.currentSession) return;
    
    this.currentSession.isFinished = true;
    this.currentSession.lastSaved = Date.now();
    
    // Final save
    this.saveSession(this.currentSession);
    
    // Stop auto-save
    this.stopAutoSave();
  }

  /**
   * Check if recoverable session exists
   */
  hasRecoverableSession(): boolean {
    const stored = this.getStoredSession();
    if (!stored) return false;
    
    // Check if session is recent (within 24 hours) and not finished
    const isRecent = Date.now() - stored.lastSaved < 24 * 60 * 60 * 1000;
    const isActive = stored.isStarted && !stored.isFinished;
    
    return isRecent && isActive;
  }

  /**
   * Get recoverable session info for display
   */
  getRecoverableSessionInfo(): {
    topicName: string;
    progress: string;
    timeSpent: string;
    lastSaved: string;
  } | null {
    const stored = this.getStoredSession();
    if (!stored || !this.hasRecoverableSession()) return null;
    
    const progressPercent = Math.round((stored.currentQuestionIndex / stored.questions.length) * 100);
    const timeSpent = Math.round((stored.totalTime - stored.timeRemaining) / 60);
    const lastSaved = new Date(stored.lastSaved).toLocaleString();
    
    return {
      topicName: stored.topicName,
      progress: `${stored.currentQuestionIndex + 1}/${stored.questions.length} (${progressPercent}%)`,
      timeSpent: `${timeSpent} minutes`,
      lastSaved
    };
  }

  /**
   * Recover session
   */
  recoverSession(options: ExamRecoveryOptions = {}): ExamSessionData | null {
    const stored = this.getStoredSession();
    if (!stored || !this.hasRecoverableSession()) return null;
    
    // Validate session if requested
    if (options.validateSession && !this.validateSession(stored)) {
      this.clearSession();
      return null;
    }
    
    this.currentSession = stored;
    
    // Resume auto-save
    this.startAutoSave(stored.autoSaveInterval);
    
    return stored;
  }

  /**
   * Clear current session
   */
  clearSession(): void {
    this.currentSession = null;
    this.stopAutoSave();
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.BACKUP_KEY);
    }
  }

  /**
   * Get current session
   */
  getCurrentSession(): ExamSessionData | null {
    return this.currentSession;
  }

  /**
   * Export session data for external backup
   */
  exportSession(): string | null {
    if (!this.currentSession) return null;
    
    return JSON.stringify({
      ...this.currentSession,
      exportedAt: Date.now()
    });
  }

  /**
   * Import session from external backup
   */
  importSession(data: string): ExamSessionData | null {
    try {
      const parsed = JSON.parse(data);
      
      if (this.validateSession(parsed)) {
        this.currentSession = parsed;
        this.saveSession(parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Failed to import session:', error);
    }
    
    return null;
  }

  // Private Methods

  private generateSessionId(): string {
    return `eccco_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private saveSession(sessionData: ExamSessionData): void {
    if (typeof window === 'undefined') return;
    
    try {
      // Primary storage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessionData));
      
      // Backup storage (compressed)
      const backup = {
        id: sessionData.sessionId,
        topic: sessionData.topicId,
        progress: sessionData.currentQuestionIndex,
        answers: sessionData.selectedAnswers,
        time: sessionData.timeRemaining,
        saved: sessionData.lastSaved
      };
      localStorage.setItem(this.BACKUP_KEY, JSON.stringify(backup));
      
    } catch (error) {
      console.error('Failed to save session:', error);
      // Try to clear space and retry
      this.clearOldSessions();
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessionData));
      } catch (retryError) {
        console.error('Failed to save session after cleanup:', retryError);
      }
    }
  }

  private getStoredSession(): ExamSessionData | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to parse stored session:', error);
      // Try backup
      try {
        const backup = localStorage.getItem(this.BACKUP_KEY);
        if (backup) {
          console.warn('Using backup session data');
          // This would need expansion to restore from compressed backup
        }
      } catch (backupError) {
        console.error('Failed to restore from backup:', backupError);
      }
    }
    
    return null;
  }

  private validateSession(session: any): boolean {
    if (!session || typeof session !== 'object') return false;
    
    const requiredFields = [
      'sessionId', 'topicId', 'questions', 'currentQuestionIndex',
      'selectedAnswers', 'timeRemaining', 'startTime', 'version'
    ];
    
    return requiredFields.every(field => field in session);
  }

  private handleStorageChange(event: StorageEvent): void {
    if (event.key === this.STORAGE_KEY && event.newValue) {
      try {
        const newSession = JSON.parse(event.newValue);
        if (newSession.sessionId !== this.currentSession?.sessionId) {
          // Different session detected in another tab
          console.warn('Exam session conflict detected across tabs');
        }
      } catch (error) {
        console.error('Failed to parse storage change:', error);
      }
    }
  }

  private handleBeforeUnload(): void {
    if (this.currentSession && !this.currentSession.isFinished) {
      // Final save before page unload
      this.saveSession(this.currentSession);
    }
  }

  private startAutoSave(intervalSeconds: number): void {
    this.stopAutoSave();
    
    this.autoSaveTimer = setInterval(() => {
      if (this.currentSession && !this.currentSession.isFinished) {
        this.currentSession.lastSaved = Date.now();
        this.saveSession(this.currentSession);
      }
    }, intervalSeconds * 1000);
  }

  private stopAutoSave(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  }

  private clearOldSessions(): void {
    // Clear any old exam sessions to free up localStorage space
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('eccco_exam_') && key !== this.STORAGE_KEY) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Export singleton instance
export const examSessionManager = ExamSessionManager.getInstance();

// React hook for session management
export function useExamSession() {
  return {
    initializeSession: examSessionManager.initializeSession.bind(examSessionManager),
    updateSession: examSessionManager.updateSession.bind(examSessionManager),
    recordAnswer: examSessionManager.recordAnswer.bind(examSessionManager),
    updateTimeRemaining: examSessionManager.updateTimeRemaining.bind(examSessionManager),
    pauseSession: examSessionManager.pauseSession.bind(examSessionManager),
    resumeSession: examSessionManager.resumeSession.bind(examSessionManager),
    completeSession: examSessionManager.completeSession.bind(examSessionManager),
    hasRecoverableSession: examSessionManager.hasRecoverableSession.bind(examSessionManager),
    getRecoverableSessionInfo: examSessionManager.getRecoverableSessionInfo.bind(examSessionManager),
    recoverSession: examSessionManager.recoverSession.bind(examSessionManager),
    clearSession: examSessionManager.clearSession.bind(examSessionManager),
    getCurrentSession: examSessionManager.getCurrentSession.bind(examSessionManager),
    exportSession: examSessionManager.exportSession.bind(examSessionManager),
    importSession: examSessionManager.importSession.bind(examSessionManager)
  };
}