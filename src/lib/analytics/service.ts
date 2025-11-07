// Analytics service for ECCCO exam platform with database integration
import { v4 as uuidv4 } from 'uuid';

export interface AnalyticsService {
  initialize(): Promise<void>;
  trackPageView(path: string, title?: string): void;
  trackExamStart(topicId: string, topicName: string): void;
  trackQuestionAnswered(questionId: string, isCorrect: boolean, timeSpent: number): void;
  trackExamComplete(topicId: string, score: number, timeSpent: number, questions: any[], answers: any): Promise<void>;
  trackTopicSelection(topicId: string, topicName: string): void;
  trackPDFDownload(topicId: string, score: number): void;
}

class ECCCOAnalyticsService implements AnalyticsService {
  private sessionId: string;
  private userId: string | null = null;
  
  constructor() {
    // Generate or retrieve session ID from localStorage
    if (typeof window !== 'undefined') {
      this.sessionId = localStorage.getItem('eccco_session_id') || uuidv4();
      localStorage.setItem('eccco_session_id', this.sessionId);
    } else {
      this.sessionId = uuidv4();
    }
  }

  async initialize(): Promise<void> {
    console.log('[Analytics] ECCCO Analytics Service initialized with session:', this.sessionId);
  }

  trackPageView(path: string, title?: string): void {
    console.log(`[Analytics] Page view: ${path}${title ? ` - ${title}` : ''}`);
  }

  trackExamStart(topicId: string, topicName: string): void {
    console.log(`[Analytics] Exam started: ${topicName} (${topicId})`);
  }

  trackQuestionAnswered(questionId: string, isCorrect: boolean, timeSpent: number): void {
    console.log(`[Analytics] Question answered: ${questionId}, correct: ${isCorrect}, time: ${timeSpent}s`);
  }

  async trackExamComplete(topicId: string, score: number, timeSpent: number, questions: any[], answers: any): Promise<void> {
    console.log(`[Analytics] Exam completed: ${topicId}, score: ${score}%, time: ${timeSpent}s`);
    
    try {
      // Calculate exam session data
      const totalQuestions = questions.length;
      const correctAnswers = Object.values(answers).filter((answer, index) => 
        answer === questions[index].correctIndex
      ).length;

      // Prepare session data for database
      const sessionData = {
        sessionId: this.sessionId,
        userId: this.userId,
        topicId: topicId,
        questions: JSON.stringify(questions.map(q => ({ 
          id: q.id, 
          question: q.question, 
          correctIndex: q.correctIndex 
        }))),
        answers: JSON.stringify(answers),
        score: score,
        totalQuestions: totalQuestions,
        correctAnswers: correctAnswers,
        totalTime: timeSpent,
        completed: true
      };

      console.log('[Analytics] Saving session data:', sessionData);

      // Save to database via analytics API
      const response = await fetch('/api/dashboard/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData)
      });

      if (!response.ok) {
        throw new Error(`Analytics API error: ${response.status}`);
      }

      const result = await response.json();
      console.log('[Analytics] Session saved successfully:', result);

    } catch (error) {
      console.error('[Analytics] Failed to save session data:', error);
      // Don't throw error to avoid disrupting user experience
    }
  }

  trackTopicSelection(topicId: string, topicName: string): void {
    console.log(`[Analytics] Topic selected: ${topicName} (${topicId})`);
  }

  trackPDFDownload(topicId: string, score: number): void {
    console.log(`[Analytics] PDF downloaded: ${topicId}, score: ${score}%`);
  }

  // Getter for session ID (useful for dashboard API calls)
  getSessionId(): string {
    return this.sessionId;
  }
}

export const analytics = new ECCCOAnalyticsService();