/**
 * Shared API Response Types
 * Standardize all API responses across the platform
 */

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
  statusCode?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta?: {
    count: number;
    total: number;
    page?: number;
    pageSize?: number;
    hasMore?: boolean;
  };
}

export interface QuestionsApiResponse {
  success: boolean;
  count: number;
  total: number;
  questions: any[];
  error?: string;
  details?: string;
}

export interface EvidenceSearchResult {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  doi?: string;
  pmid?: string;
  abstract?: string;
  url?: string;
  source: "pubmed" | "crossref" | "europepmc";
}

// ============================================================================
// Topic Types
// ============================================================================

export interface Topic {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  _count?: {
    questions: number;
  };
}

// ============================================================================
// Question Types
// ============================================================================

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  topicId: string;
  topic?: Topic;
  references?: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ============================================================================
// User & Stats Types
// ============================================================================

export interface UserStats {
  stats: {
    questions: {
      total: number;
      correct: number;
      incorrect: number;
    };
    examSessions: {
      total: number;
      averageScore: number;
      bestScore: number;
      currentStreak: number;
    };
    overall: {
      studyHours: number;
      lastActive: Date | string;
    };
  };
  topicPerformance: Array<{
    topicId: string;
    topicName: string;
    questionsAnswered: number;
    correctAnswers: number;
    percentage: number;
  }>;
  recentSessions?: Array<{
    id: string;
    topicName: string;
    score: number;
    date: Date | string;
  }>;
}

// ============================================================================
// Quiz Arena Types
// ============================================================================

export interface QuizSession {
  id: string;
  title: string;
  description: string | null;
  accessCode: string;
  status: "waiting" | "active" | "paused" | "completed";
  hostId: string;
  currentQuestionIndex: number;
  timePerQuestion: number;
  pointsPerQuestion: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  questions?: Question[];
  participants?: QuizParticipant[];
  settings?: QuizSettings;
}

export interface QuizParticipant {
  id: string;
  sessionId: string;
  playerName: string;
  score: number;
  correctAnswers: number;
  joinedAt: Date | string;
}

export interface QuizSettings {
  playMusic?: boolean;
  playSound?: boolean;
  showAnswerAfter?: boolean;
  randomizeQuestions?: boolean;
  randomizeOptions?: boolean;
}

export interface CreateQuizRequest {
  title: string;
  description?: string;
  timePerQuestion: number;
  pointsPerQuestion: number;
  questionIds: string[];
  settings?: QuizSettings;
}

export interface CreateQuizResponse {
  session: QuizSession;
  accessCode: string;
  message?: string;
}

// ============================================================================
// Feedback Types
// ============================================================================

export interface FeedbackSubmission {
  userName?: string;
  userEmail: string;
  type: "bug" | "feature" | "question" | "complaint";
  category?: string;
  subject: string;
  message: string;
  pageUrl?: string;
  userAgent?: string;
}

export interface FeedbackResponse {
  success: boolean;
  message: string;
  id: string;
}

export interface GuidelineSearchResult {
  id: string;
  source: "nice" | "who" | "aha";
  title: string;
  summary: string;
  published: string;
  lastUpdated?: string;
  fullTextUrl: string;
  pdfUrl?: string;
  topics: string[];
  category?: string;
}
