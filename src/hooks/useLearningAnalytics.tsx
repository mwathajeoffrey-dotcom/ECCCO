/**
 * Learning Analytics Integration Hooks
 * 
 * Provides seamless integration of learning analytics tracking
 * throughout the ECCCO application with automatic session recording,
 * response pattern analysis, and performance monitoring.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { learningAnalytics } from '@/lib/analytics/learningAnalytics';

interface LearningSessionConfig {
  topicId: string;
  userId?: string;
  difficultyLevel: number;
  learningObjectives?: string[];
  enableRealTimeTracking?: boolean;
}

interface QuestionResponse {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  responseTime: number;
  confidenceLevel?: number;
  hintsUsed?: number;
  attempts?: number;
}

interface SessionMetrics {
  questionsAttempted: number;
  correctAnswers: number;
  timeSpent: number;
  averageResponseTime: number;
  accuracy: number;
  completionRate: number;
  confidenceScores: number[];
}

interface AnalyticsData {
  insights: any[];
  recommendations: any[];
  performance: any;
  loading: boolean;
  error: string | null;
}

/**
 * Hook for tracking learning sessions with automatic analytics recording
 */
export function useLearningSession(config: LearningSessionConfig) {
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionMetrics, setSessionMetrics] = useState<SessionMetrics>({
    questionsAttempted: 0,
    correctAnswers: 0,
    timeSpent: 0,
    averageResponseTime: 0,
    accuracy: 0,
    completionRate: 0,
    confidenceScores: [],
  });

  const sessionStartTime = useRef<Date | null>(null);
  const responsePatterns = useRef<QuestionResponse[]>([]);
  const sessionId = useRef<string>(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const startSession = useCallback(() => {
    sessionStartTime.current = new Date();
    setSessionActive(true);
    responsePatterns.current = [];
    setSessionMetrics({
      questionsAttempted: 0,
      correctAnswers: 0,
      timeSpent: 0,
      averageResponseTime: 0,
      accuracy: 0,
      completionRate: 0,
      confidenceScores: [],
    });

    console.log(`Learning session started: ${sessionId.current}`);
  }, []);

  const recordResponse = useCallback((response: QuestionResponse) => {
    if (!sessionActive || !sessionStartTime.current) return;

    responsePatterns.current.push(response);

    setSessionMetrics(prev => {
      const newQuestionsAttempted = prev.questionsAttempted + 1;
      const newCorrectAnswers = prev.correctAnswers + (response.isCorrect ? 1 : 0);
      const newAccuracy = newCorrectAnswers / newQuestionsAttempted;
      const totalResponseTime = responsePatterns.current.reduce((sum, r) => sum + r.responseTime, 0);
      const newAverageResponseTime = totalResponseTime / newQuestionsAttempted;
      const newConfidenceScores = response.confidenceLevel 
        ? [...prev.confidenceScores, response.confidenceLevel]
        : prev.confidenceScores;

      return {
        questionsAttempted: newQuestionsAttempted,
        correctAnswers: newCorrectAnswers,
        timeSpent: Math.round((Date.now() - sessionStartTime.current!.getTime()) / 1000),
        averageResponseTime: newAverageResponseTime,
        accuracy: newAccuracy,
        completionRate: newQuestionsAttempted / (newQuestionsAttempted + 1), // Estimate based on current progress
        confidenceScores: newConfidenceScores,
      };
    });

    // Real-time tracking for immediate insights
    if (config.enableRealTimeTracking && responsePatterns.current.length % 5 === 0) {
      generateRealTimeInsights();
    }
  }, [sessionActive, config.enableRealTimeTracking]);

  const endSession = useCallback(async (completed: boolean = true) => {
    if (!sessionActive || !sessionStartTime.current) return null;

    const endTime = new Date();
    const finalMetrics = sessionMetrics;

    try {
      // Record session in analytics system
      const sessionData = {
        userId: config.userId || 'anonymous',
        startTime: sessionStartTime.current,
        endTime,
        topicId: config.topicId,
        questionsAttempted: finalMetrics.questionsAttempted,
        correctAnswers: finalMetrics.correctAnswers,
        timeSpent: finalMetrics.timeSpent,
        difficultyLevel: config.difficultyLevel,
        completionRate: completed ? 1.0 : finalMetrics.completionRate,
        confidenceScores: finalMetrics.confidenceScores,
        responsePatterns: responsePatterns.current.map(r => ({
          questionId: r.questionId,
          responseTime: r.responseTime,
          isCorrect: r.isCorrect,
          confidenceLevel: r.confidenceLevel || 3,
          attempts: r.attempts || 1,
          hintsUsed: r.hintsUsed || 0,
          difficultyRating: config.difficultyLevel,
          topicTags: [config.topicId],
          cognitiveLoad: calculateCognitiveLoad(r, responsePatterns.current),
        })),
        learningObjectives: config.learningObjectives || [],
        metadata: {
          sessionId: sessionId.current,
          completed,
          browserInfo: navigator.userAgent,
          timestamp: endTime.toISOString(),
        },
      };

      const recordedSessionId = await learningAnalytics.recordLearningSession(sessionData);
      
      setSessionActive(false);
      sessionStartTime.current = null;

      console.log(`Learning session ended: ${recordedSessionId}`);
      return recordedSessionId;
    } catch (error) {
      console.error('Failed to record learning session:', error);
      return null;
    }
  }, [sessionActive, sessionMetrics, config]);

  const generateRealTimeInsights = useCallback(async () => {
    if (!config.userId || responsePatterns.current.length < 3) return;

    try {
      // Generate quick insights based on current session
      const recentAccuracy = responsePatterns.current.slice(-5).reduce((sum, r) => sum + (r.isCorrect ? 1 : 0), 0) / 5;
      const avgResponseTime = responsePatterns.current.slice(-5).reduce((sum, r) => sum + r.responseTime, 0) / 5;

      if (recentAccuracy < 0.4) {
        console.log('Real-time insight: Consider reviewing fundamentals or reducing difficulty');
      } else if (recentAccuracy > 0.9 && avgResponseTime < 30000) {
        console.log('Real-time insight: Ready for higher difficulty level');
      }

      if (avgResponseTime > 120000) {
        console.log('Real-time insight: Consider time management strategies');
      }
    } catch (error) {
      console.error('Failed to generate real-time insights:', error);
    }
  }, [config.userId]);

  const calculateCognitiveLoad = (response: QuestionResponse, allResponses: QuestionResponse[]): number => {
    // Simplified cognitive load calculation
    const timeFactor = Math.min(1, response.responseTime / 60000); // Normalize to 1 minute
    const difficultyFactor = config.difficultyLevel / 7;
    const accuracyStress = response.isCorrect ? 0 : 0.3;
    const consistencyFactor = allResponses.length > 1 ? 
      Math.abs(response.responseTime - allResponses[allResponses.length - 2].responseTime) / 60000 : 0;

    return Math.min(1, (timeFactor + difficultyFactor + accuracyStress + consistencyFactor) / 4);
  };

  return {
    sessionActive,
    sessionMetrics,
    sessionId: sessionId.current,
    startSession,
    recordResponse,
    endSession,
    generateRealTimeInsights,
  };
}

/**
 * Hook for fetching and managing learning analytics data
 */
export function useLearningAnalytics(userId?: string, autoRefresh: boolean = false) {
  const [data, setData] = useState<AnalyticsData>({
    insights: [],
    recommendations: [],
    performance: null,
    loading: true,
    error: null,
  });

  const [refreshInterval, setRefreshInterval] = useState<number | null>(null);

  const fetchAnalytics = useCallback(async (timeframe?: { start: Date; end: Date }) => {
    if (!userId && userId !== 'anonymous') return;

    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      const [insights, recommendations, performance] = await Promise.all([
        learningAnalytics.analyzeResponsePatterns(userId || 'anonymous', timeframe),
        learningAnalytics.generateAdaptiveRecommendations(userId || 'anonymous'),
        learningAnalytics.calculatePerformanceMetrics(userId || 'anonymous'),
      ]);

      setData({
        insights,
        recommendations,
        performance,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Failed to fetch learning analytics:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load analytics',
      }));
    }
  }, [userId]);

  const refreshAnalytics = useCallback(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(refreshAnalytics, 30000); // Refresh every 30 seconds
      setRefreshInterval(interval);
      return () => clearInterval(interval);
    } else if (refreshInterval) {
      clearInterval(refreshInterval);
      setRefreshInterval(null);
    }
  }, [autoRefresh, refreshAnalytics, refreshInterval]);

  return {
    ...data,
    refreshAnalytics,
    fetchAnalytics,
  };
}

/**
 * Hook for generating and managing study plans
 */
export function useStudyPlans(userId?: string) {
  const [studyPlans, setStudyPlans] = useState<any[]>([]);
  const [activeStudyPlan, setActiveStudyPlan] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateStudyPlan = useCallback(async (preferences: {
    dailyTimeAvailable: number;
    preferredDifficulty: number;
    focusAreas: string[];
    timeline: number;
    goals: string[];
  }) => {
    if (!userId) return null;

    try {
      setLoading(true);
      setError(null);

      const studyPlan = await learningAnalytics.generateStudyPlan(userId, preferences);
      
      setStudyPlans(prev => [studyPlan, ...prev]);
      setActiveStudyPlan(studyPlan);

      return studyPlan;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate study plan';
      setError(errorMessage);
      console.error('Failed to generate study plan:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const loadStudyPlans = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      // In a real implementation, this would fetch from the database
      // For now, we'll use a mock implementation
      const mockStudyPlans = [];
      setStudyPlans(mockStudyPlans);
    } catch (error) {
      console.error('Failed to load study plans:', error);
      setError('Failed to load study plans');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadStudyPlans();
  }, [loadStudyPlans]);

  return {
    studyPlans,
    activeStudyPlan,
    loading,
    error,
    generateStudyPlan,
    setActiveStudyPlan,
    refreshStudyPlans: loadStudyPlans,
  };
}

/**
 * Hook for real-time performance monitoring
 */
export function usePerformanceMonitor(userId?: string, sessionConfig?: LearningSessionConfig) {
  const [performanceAlerts, setPerformanceAlerts] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const monitorPerformance = useCallback((sessionMetrics: SessionMetrics) => {
    const alerts: string[] = [];
    const recs: string[] = [];

    // Check for performance issues
    if (sessionMetrics.accuracy < 0.5 && sessionMetrics.questionsAttempted >= 5) {
      alerts.push('Low accuracy detected - consider reviewing fundamentals');
      recs.push('Take a break and review the topic guidelines');
    }

    if (sessionMetrics.averageResponseTime > 120000) { // 2 minutes
      alerts.push('Extended response times detected');
      recs.push('Consider time management strategies');
    }

    if (sessionMetrics.questionsAttempted > 20 && sessionMetrics.accuracy > 0.85) {
      recs.push('Great performance! Ready for higher difficulty?');
    }

    // Cognitive load estimation
    const estimatedCognitiveLoad = Math.min(1, 
      (sessionMetrics.averageResponseTime / 60000) * 0.4 +
      (1 - sessionMetrics.accuracy) * 0.3 +
      (sessionConfig?.difficultyLevel || 1) / 7 * 0.3
    );

    if (estimatedCognitiveLoad > 0.8) {
      alerts.push('High cognitive load detected');
      recs.push('Consider taking a short break');
    }

    setPerformanceAlerts(alerts);
    setRecommendations(recs);
  }, [sessionConfig]);

  return {
    performanceAlerts,
    recommendations,
    monitorPerformance,
  };
}

/**
 * Hook for tracking adaptive difficulty adjustment
 */
export function useAdaptiveDifficulty(initialDifficulty: number = 3) {
  const [currentDifficulty, setCurrentDifficulty] = useState(initialDifficulty);
  const [adjustmentHistory, setAdjustmentHistory] = useState<Array<{
    timestamp: Date;
    oldDifficulty: number;
    newDifficulty: number;
    reason: string;
  }>>([]);

  const adjustDifficulty = useCallback((sessionMetrics: SessionMetrics, force?: boolean) => {
    if (sessionMetrics.questionsAttempted < 5 && !force) return;

    let newDifficulty = currentDifficulty;
    let reason = '';

    // Increase difficulty if performing well
    if (sessionMetrics.accuracy >= 0.85 && sessionMetrics.averageResponseTime < 45000) {
      newDifficulty = Math.min(7, currentDifficulty + 1);
      reason = 'High accuracy and good response time';
    }
    // Decrease difficulty if struggling
    else if (sessionMetrics.accuracy < 0.6) {
      newDifficulty = Math.max(1, currentDifficulty - 1);
      reason = 'Low accuracy indicates need for review';
    }
    // Decrease difficulty if taking too long
    else if (sessionMetrics.averageResponseTime > 120000) {
      newDifficulty = Math.max(1, currentDifficulty - 1);
      reason = 'Extended response times suggest difficulty too high';
    }

    if (newDifficulty !== currentDifficulty) {
      setAdjustmentHistory(prev => [...prev, {
        timestamp: new Date(),
        oldDifficulty: currentDifficulty,
        newDifficulty,
        reason,
      }]);
      setCurrentDifficulty(newDifficulty);
      
      console.log(`Difficulty adjusted: ${currentDifficulty} → ${newDifficulty} (${reason})`);
    }
  }, [currentDifficulty]);

  const resetDifficulty = useCallback((difficulty: number = initialDifficulty) => {
    setCurrentDifficulty(difficulty);
    setAdjustmentHistory([]);
  }, [initialDifficulty]);

  return {
    currentDifficulty,
    adjustmentHistory,
    adjustDifficulty,
    resetDifficulty,
  };
}

export default {
  useLearningSession,
  useLearningAnalytics,
  useStudyPlans,
  usePerformanceMonitor,
  useAdaptiveDifficulty,
};