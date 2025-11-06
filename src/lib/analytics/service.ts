// Mock analytics service for ECCCO exam platform
// This provides the interface expected by ExamInterface but doesn't actually track data

export interface AnalyticsService {
  initialize(): Promise<void>;
  trackPageView(path: string, title?: string): void;
  trackExamStart(topicId: string, topicName: string): void;
  trackQuestionAnswered(questionId: string, isCorrect: boolean, timeSpent: number): void;
  trackExamComplete(topicId: string, score: number, timeSpent: number): void;
  trackTopicSelection(topicId: string, topicName: string): void;
  trackPDFDownload(topicId: string, score: number): void;
}

class MockAnalyticsService implements AnalyticsService {
  async initialize(): Promise<void> {
    console.log('[Analytics] Service initialized');
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

  trackExamComplete(topicId: string, score: number, timeSpent: number): void {
    console.log(`[Analytics] Exam completed: ${topicId}, score: ${score}%, time: ${timeSpent}s`);
  }

  trackTopicSelection(topicId: string, topicName: string): void {
    console.log(`[Analytics] Topic selected: ${topicName} (${topicId})`);
  }

  trackPDFDownload(topicId: string, score: number): void {
    console.log(`[Analytics] PDF downloaded: ${topicId}, score: ${score}%`);
  }
}

export const analytics = new MockAnalyticsService();