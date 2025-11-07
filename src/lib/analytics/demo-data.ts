/**
 * Analytics Demo Data Service
 * Provides realistic demo data for analytics dashboard when database is unavailable
 */

export interface DashboardData {
  overallStats: {
    totalQuestions: number;
    totalCorrect: number;
    averageScore: number;
    studyTimeHours: number;
    sessionCount: number;
    learningStreak: number;
    strongestTopic: {
      name: string;
      score: number;
    };
    weakestTopic: {
      name: string;
      score: number;
    };
  };
  topicPerformance: Array<{
    topicId: string;
    topicName: string;
    attempted: number;
    correct: number;
    averageScore: number;
    sessionCount: number;
  }>;
  recentActivity: Array<{
    id: string;
    topicName: string;
    score: number | null;
    completed: boolean;
    createdAt: string;
    totalTime: number | null;
  }>;
  lastUpdated: string;
}

export const getDemoAnalyticsData = (): DashboardData => {
  const now = new Date().toISOString();
  
  return {
    overallStats: {
      totalQuestions: 0, // Start with 0 to indicate no real data
      totalCorrect: 0,
      averageScore: 0,
      studyTimeHours: 0,
      sessionCount: 0,
      learningStreak: 0,
      strongestTopic: { name: 'Start practicing to see data', score: 0 },
      weakestTopic: { name: 'Complete exams to track progress', score: 0 }
    },
    topicPerformance: [
      {
        topicId: 'demo-1',
        topicName: 'Complete an exam to see your performance here',
        attempted: 0,
        correct: 0,
        averageScore: 0,
        sessionCount: 0
      }
    ],
    recentActivity: [],
    lastUpdated: now
  };
};

export const getEmptyAnalyticsData = (): DashboardData => {
  return getDemoAnalyticsData();
};