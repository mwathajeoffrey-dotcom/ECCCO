/**
 * Enhanced Analytics Service - PALS-Specific Analytics
 * Advanced analytics with difficulty analysis, mistake patterns, and personalized recommendations
 */

import { analyticsV2, AnalyticsSummary, ExamSession } from './analytics-v2';

export interface QuestionDifficultyAnalysis {
  difficulty: 'easy' | 'medium' | 'hard';
  totalAttempted: number;
  correctAnswers: number;
  accuracy: number;
  averageTimeSpent: number;
  commonMistakes: string[];
}

export interface TopicDrillDown {
  topicId: string;
  topicName: string;
  overallAccuracy: number;
  difficultyBreakdown: QuestionDifficultyAnalysis[];
  timeEfficiency: 'excellent' | 'good' | 'needs-improvement' | 'slow';
  masteryLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  recommendedActions: string[];
}

export interface MistakePattern {
  pattern: string;
  frequency: number;
  severity: 'low' | 'medium' | 'high';
  affectedTopics: string[];
  recommendation: string;
}

export interface LearningPath {
  currentLevel: string;
  nextMilestone: string;
  recommendedStudyTime: number;
  priorityTopics: Array<{
    topicName: string;
    priority: 'high' | 'medium' | 'low';
    reason: string;
    estimatedTime: number;
  }>;
  customizedQuestions: Array<{
    questionType: string;
    difficulty: string;
    count: number;
  }>;
}

export interface EnhancedAnalytics extends AnalyticsSummary {
  difficultyAnalysis: QuestionDifficultyAnalysis[];
  topicDrillDown: TopicDrillDown[];
  mistakePatterns: MistakePattern[];
  learningPath: LearningPath;
  performanceTrends: Array<{
    date: string;
    score: number;
    topic: string;
    difficulty: string;
    timeSpent: number;
  }>;
  recommendations: Array<{
    type: 'study' | 'practice' | 'review' | 'strength';
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    action: string;
    estimatedBenefit: string;
  }>;
}

class EnhancedAnalyticsService {
  
  /**
   * Generate enhanced analytics with PALS-specific insights
   */
  async generateEnhancedAnalytics(sessionId?: string): Promise<EnhancedAnalytics> {
    // Get base analytics
    const baseAnalytics = analyticsV2.getAnalyticsSummary();
    
    // Get detailed session data for analysis
    const sessions = await this.getDetailedSessions(sessionId);
    
    // Generate enhanced components
    const difficultyAnalysis = this.analyzeDifficultyPerformance(sessions);
    const topicDrillDown = this.generateTopicDrillDown(sessions);
    const mistakePatterns = this.identifyMistakePatterns(sessions);
    const learningPath = this.generatePersonalizedLearningPath(sessions, difficultyAnalysis);
    const performanceTrends = this.analyzePerformanceTrends(sessions);
    const recommendations = this.generateRecommendations(sessions, difficultyAnalysis, mistakePatterns);

    return {
      ...baseAnalytics,
      difficultyAnalysis,
      topicDrillDown,
      mistakePatterns,
      learningPath,
      performanceTrends,
      recommendations
    };
  }

  /**
   * Analyze performance by question difficulty
   */
  private analyzeDifficultyPerformance(sessions: ExamSession[]): QuestionDifficultyAnalysis[] {
    const difficultyStats = new Map<string, {
      attempted: number;
      correct: number;
      totalTime: number;
      mistakes: Array<{ questionId: string; topic: string }>;
    }>();

    sessions.forEach(session => {
      session.questions.forEach((question, index) => {
        const difficulty = question.difficulty || 'medium';
        const isCorrect = session.answers[index] === question.correctIndex;
        const timeSpent = session.timeSpent / session.questions.length; // Average time per question

        if (!difficultyStats.has(difficulty)) {
          difficultyStats.set(difficulty, {
            attempted: 0,
            correct: 0,
            totalTime: 0,
            mistakes: []
          });
        }

        const stats = difficultyStats.get(difficulty)!;
        stats.attempted++;
        if (isCorrect) stats.correct++;
        stats.totalTime += timeSpent;

        if (!isCorrect) {
          stats.mistakes.push({
            questionId: question.id,
            topic: question.topicId
          });
        }
      });
    });

    return Array.from(difficultyStats.entries()).map(([difficulty, stats]) => ({
      difficulty: difficulty as 'easy' | 'medium' | 'hard',
      totalAttempted: stats.attempted,
      correctAnswers: stats.correct,
      accuracy: stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0,
      averageTimeSpent: stats.attempted > 0 ? Math.round(stats.totalTime / stats.attempted) : 0,
      commonMistakes: this.extractCommonMistakes(stats.mistakes)
    }));
  }

  /**
   * Generate detailed topic performance analysis
   */
  private generateTopicDrillDown(sessions: ExamSession[]): TopicDrillDown[] {
    const topicMap = new Map<string, {
      name: string;
      questions: Array<{ difficulty: string; correct: boolean; timeSpent: number }>;
    }>();

    sessions.forEach(session => {
      session.questions.forEach((question, index) => {
        const topicId = question.topicId;
        const isCorrect = session.answers[index] === question.correctIndex;
        const timeSpent = session.timeSpent / session.questions.length;

        if (!topicMap.has(topicId)) {
          topicMap.set(topicId, {
            name: session.topicName,
            questions: []
          });
        }

        topicMap.get(topicId)!.questions.push({
          difficulty: question.difficulty || 'medium',
          correct: isCorrect,
          timeSpent
        });
      });
    });

    return Array.from(topicMap.entries()).map(([topicId, data]) => {
      const totalQuestions = data.questions.length;
      const correctAnswers = data.questions.filter(q => q.correct).length;
      const overallAccuracy = Math.round((correctAnswers / totalQuestions) * 100);
      const averageTime = data.questions.reduce((sum, q) => sum + q.timeSpent, 0) / totalQuestions;

      // Difficulty breakdown
      const difficultyBreakdown = this.generateDifficultyBreakdown(data.questions);

      // Time efficiency assessment
      const timeEfficiency = this.assessTimeEfficiency(averageTime, overallAccuracy);

      // Mastery level
      const masteryLevel = this.assessMasteryLevel(overallAccuracy, difficultyBreakdown);

      // Recommended actions
      const recommendedActions = this.generateTopicRecommendations(
        overallAccuracy,
        timeEfficiency,
        masteryLevel,
        difficultyBreakdown
      );

      return {
        topicId,
        topicName: data.name,
        overallAccuracy,
        difficultyBreakdown,
        timeEfficiency,
        masteryLevel,
        recommendedActions
      };
    });
  }

  /**
   * Identify common mistake patterns
   */
  private identifyMistakePatterns(sessions: ExamSession[]): MistakePattern[] {
    const patterns: MistakePattern[] = [];

    // Pattern 1: Difficulty-based mistakes
    const difficultyMistakes = this.analyzeDifficultyMistakes(sessions);
    if (difficultyMistakes.hardQuestionFailure > 0.7) {
      patterns.push({
        pattern: 'Struggling with complex scenarios',
        frequency: Math.round(difficultyMistakes.hardQuestionFailure * 100),
        severity: 'high',
        affectedTopics: difficultyMistakes.affectedTopics,
        recommendation: 'Focus on advanced clinical reasoning and complex case studies'
      });
    }

    // Pattern 2: Time management issues
    const timePatterns = this.analyzeTimePatterns(sessions);
    if (timePatterns.rushingMistakes > 0.3) {
      patterns.push({
        pattern: 'Making errors due to rushing',
        frequency: Math.round(timePatterns.rushingMistakes * 100),
        severity: 'medium',
        affectedTopics: timePatterns.affectedTopics,
        recommendation: 'Practice timed scenarios and improve reading comprehension'
      });
    }

    // Pattern 3: Topic-specific weaknesses
    const topicWeaknesses = this.analyzeTopicWeaknesses(sessions);
    topicWeaknesses.forEach(weakness => {
      patterns.push({
        pattern: `Consistent errors in ${weakness.topicName}`,
        frequency: weakness.errorRate,
        severity: weakness.errorRate > 50 ? 'high' : 'medium',
        affectedTopics: [weakness.topicName],
        recommendation: weakness.recommendation
      });
    });

    return patterns;
  }

  /**
   * Generate personalized learning path
   */
  private generatePersonalizedLearningPath(
    sessions: ExamSession[],
    difficultyAnalysis: QuestionDifficultyAnalysis[]
  ): LearningPath {
    const overallAccuracy = this.calculateOverallAccuracy(sessions);
    const currentLevel = this.determineLearningLevel(overallAccuracy, difficultyAnalysis);
    
    // Determine next milestone
    const nextMilestone = this.determineNextMilestone(currentLevel, overallAccuracy);
    
    // Calculate recommended study time
    const recommendedStudyTime = this.calculateRecommendedStudyTime(currentLevel, sessions.length);
    
    // Identify priority topics
    const priorityTopics = this.identifyPriorityTopics(sessions, difficultyAnalysis);
    
    // Generate customized question recommendations
    const customizedQuestions = this.generateQuestionRecommendations(currentLevel, priorityTopics);

    return {
      currentLevel,
      nextMilestone,
      recommendedStudyTime,
      priorityTopics,
      customizedQuestions
    };
  }

  /**
   * Analyze performance trends over time
   */
  private analyzePerformanceTrends(sessions: ExamSession[]): Array<{
    date: string;
    score: number;
    topic: string;
    difficulty: string;
    timeSpent: number;
  }> {
    return sessions
      .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime())
      .map(session => {
        const avgDifficulty = this.calculateAverageDifficulty(session.questions);
        return {
          date: new Date(session.completedAt).toISOString().split('T')[0],
          score: session.score,
          topic: session.topicName,
          difficulty: avgDifficulty,
          timeSpent: session.timeSpent
        };
      });
  }

  /**
   * Generate actionable recommendations
   */
  private generateRecommendations(
    sessions: ExamSession[],
    difficultyAnalysis: QuestionDifficultyAnalysis[],
    mistakePatterns: MistakePattern[]
  ): Array<{
    type: 'study' | 'practice' | 'review' | 'strength';
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    action: string;
    estimatedBenefit: string;
  }> {
    const recommendations = [];

    // High-priority recommendations based on mistake patterns
    mistakePatterns
      .filter(pattern => pattern.severity === 'high')
      .forEach(pattern => {
        recommendations.push({
          type: 'study' as const,
          priority: 'high' as const,
          title: `Address ${pattern.pattern}`,
          description: `You have a ${pattern.frequency}% error rate in this area`,
          action: pattern.recommendation,
          estimatedBenefit: 'Could improve overall score by 10-15%'
        });
      });

    // Difficulty-based recommendations
    const hardQuestions = difficultyAnalysis.find(d => d.difficulty === 'hard');
    if (hardQuestions && hardQuestions.accuracy < 60) {
      recommendations.push({
        type: 'practice' as const,
        priority: 'high' as const,
        title: 'Improve Complex Scenario Performance',
        description: `${hardQuestions.accuracy}% accuracy on difficult questions`,
        action: 'Practice advanced PALS scenarios and decision trees',
        estimatedBenefit: 'Significant improvement in challenging cases'
      });
    }

    // Strengths to maintain
    const strengths = this.identifyStrengths(sessions, difficultyAnalysis);
    strengths.forEach(strength => {
      recommendations.push({
        type: 'strength' as const,
        priority: 'low' as const,
        title: `Maintain Excellence in ${strength.area}`,
        description: `Strong performance: ${strength.accuracy}% accuracy`,
        action: 'Continue regular practice to maintain proficiency',
        estimatedBenefit: 'Sustain high performance level'
      });
    });

    return recommendations.slice(0, 8); // Limit to top 8 recommendations
  }

  // Helper methods
  private async getDetailedSessions(sessionId?: string): Promise<ExamSession[]> {
    // In a real implementation, this would fetch from the database
    // For now, we'll use the analytics service data
    const summary = analyticsV2.getAnalyticsSummary();
    return summary.recentSessions.map(session => ({
      ...session,
      questions: [], // Would be populated from stored question data
      answers: {}
    })) as ExamSession[];
  }

  private extractCommonMistakes(mistakes: Array<{ questionId: string; topic: string }>): string[] {
    const topicCounts = mistakes.reduce((acc, mistake) => {
      acc[mistake.topic] = (acc[mistake.topic] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(topicCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([topic]) => `${topic} concepts`);
  }

  private generateDifficultyBreakdown(questions: Array<{ difficulty: string; correct: boolean; timeSpent: number }>): QuestionDifficultyAnalysis[] {
    const breakdown = questions.reduce((acc, q) => {
      if (!acc[q.difficulty]) {
        acc[q.difficulty] = { total: 0, correct: 0, time: 0 };
      }
      acc[q.difficulty].total++;
      if (q.correct) acc[q.difficulty].correct++;
      acc[q.difficulty].time += q.timeSpent;
      return acc;
    }, {} as Record<string, { total: number; correct: number; time: number }>);

    return Object.entries(breakdown).map(([difficulty, stats]) => ({
      difficulty: difficulty as 'easy' | 'medium' | 'hard',
      totalAttempted: stats.total,
      correctAnswers: stats.correct,
      accuracy: Math.round((stats.correct / stats.total) * 100),
      averageTimeSpent: Math.round(stats.time / stats.total),
      commonMistakes: []
    }));
  }

  private assessTimeEfficiency(averageTime: number, accuracy: number): 'excellent' | 'good' | 'needs-improvement' | 'slow' {
    if (averageTime < 60 && accuracy > 80) return 'excellent';
    if (averageTime < 90 && accuracy > 70) return 'good';
    if (averageTime < 120) return 'needs-improvement';
    return 'slow';
  }

  private assessMasteryLevel(accuracy: number, difficultyBreakdown: QuestionDifficultyAnalysis[]): 'beginner' | 'intermediate' | 'advanced' | 'expert' {
    const hardAccuracy = difficultyBreakdown.find(d => d.difficulty === 'hard')?.accuracy || 0;
    
    if (accuracy >= 90 && hardAccuracy >= 80) return 'expert';
    if (accuracy >= 80 && hardAccuracy >= 60) return 'advanced';
    if (accuracy >= 70) return 'intermediate';
    return 'beginner';
  }

  private generateTopicRecommendations(
    accuracy: number,
    timeEfficiency: string,
    masteryLevel: string,
    difficultyBreakdown: QuestionDifficultyAnalysis[]
  ): string[] {
    const recommendations = [];

    if (accuracy < 70) {
      recommendations.push('Review fundamental concepts and guidelines');
    }
    if (timeEfficiency === 'slow') {
      recommendations.push('Practice timed scenarios to improve speed');
    }
    if (masteryLevel === 'beginner') {
      recommendations.push('Start with basic scenarios before advancing');
    }

    const hardAccuracy = difficultyBreakdown.find(d => d.difficulty === 'hard')?.accuracy || 0;
    if (hardAccuracy < 60) {
      recommendations.push('Focus on complex clinical decision-making');
    }

    return recommendations;
  }

  private analyzeDifficultyMistakes(sessions: ExamSession[]): {
    hardQuestionFailure: number;
    affectedTopics: string[];
  } {
    let hardQuestions = 0;
    let hardMistakes = 0;
    const topicSet = new Set<string>();

    sessions.forEach(session => {
      session.questions.forEach((question, index) => {
        if (question.difficulty === 'hard') {
          hardQuestions++;
          if (session.answers[index] !== question.correctIndex) {
            hardMistakes++;
            topicSet.add(session.topicName);
          }
        }
      });
    });

    return {
      hardQuestionFailure: hardQuestions > 0 ? hardMistakes / hardQuestions : 0,
      affectedTopics: Array.from(topicSet)
    };
  }

  private analyzeTimePatterns(sessions: ExamSession[]): {
    rushingMistakes: number;
    affectedTopics: string[];
  } {
    // Simplified implementation - would analyze time per question vs accuracy
    return {
      rushingMistakes: 0.2, // 20% rushing-related mistakes
      affectedTopics: ['All topics']
    };
  }

  private analyzeTopicWeaknesses(sessions: ExamSession[]): Array<{
    topicName: string;
    errorRate: number;
    recommendation: string;
  }> {
    const topicStats = new Map<string, { total: number; errors: number }>();

    sessions.forEach(session => {
      const topicName = session.topicName;
      if (!topicStats.has(topicName)) {
        topicStats.set(topicName, { total: 0, errors: 0 });
      }
      
      const stats = topicStats.get(topicName)!;
      stats.total += session.totalQuestions;
      stats.errors += (session.totalQuestions - session.correctAnswers);
    });

    return Array.from(topicStats.entries())
      .map(([topicName, stats]) => ({
        topicName,
        errorRate: Math.round((stats.errors / stats.total) * 100),
        recommendation: this.getTopicSpecificRecommendation(topicName, stats.errors / stats.total)
      }))
      .filter(topic => topic.errorRate > 30); // Only include significant weaknesses
  }

  private getTopicSpecificRecommendation(topicName: string, errorRate: number): string {
    const recommendations: Record<string, string> = {
      'Pediatric Advanced Life Support': 'Review PALS algorithms and practice dosage calculations',
      'Basic Life Support': 'Practice CPR techniques and rescue breathing protocols',
      'Advanced Cardiac Life Support': 'Focus on rhythm recognition and medication protocols'
    };

    return recommendations[topicName] || 'Review core concepts and practice questions';
  }

  private calculateOverallAccuracy(sessions: ExamSession[]): number {
    const totalQuestions = sessions.reduce((sum, s) => sum + s.totalQuestions, 0);
    const totalCorrect = sessions.reduce((sum, s) => sum + s.correctAnswers, 0);
    return totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  }

  private determineLearningLevel(accuracy: number, difficultyAnalysis: QuestionDifficultyAnalysis[]): string {
    if (accuracy >= 90) return 'Expert Level';
    if (accuracy >= 80) return 'Advanced';
    if (accuracy >= 70) return 'Intermediate';
    return 'Beginner';
  }

  private determineNextMilestone(currentLevel: string, accuracy: number): string {
    const milestones = {
      'Beginner': 'Reach 70% overall accuracy',
      'Intermediate': 'Achieve 80% accuracy consistently',
      'Advanced': 'Master complex scenarios (90%+)',
      'Expert Level': 'Maintain excellence and mentor others'
    };

    return milestones[currentLevel] || 'Continue improving';
  }

  private calculateRecommendedStudyTime(level: string, sessionsCompleted: number): number {
    const baseTime = {
      'Beginner': 120,      // 2 hours per week
      'Intermediate': 90,   // 1.5 hours per week
      'Advanced': 60,       // 1 hour per week
      'Expert Level': 30    // 30 minutes per week
    };

    return baseTime[level] || 90;
  }

  private identifyPriorityTopics(sessions: ExamSession[], difficultyAnalysis: QuestionDifficultyAnalysis[]): Array<{
    topicName: string;
    priority: 'high' | 'medium' | 'low';
    reason: string;
    estimatedTime: number;
  }> {
    // Analyze topic performance and return prioritized list
    const topicPerformance = this.analyzeTopicPerformance(sessions);
    
    return topicPerformance.map(topic => ({
      topicName: topic.name,
      priority: topic.accuracy < 70 ? 'high' : topic.accuracy < 85 ? 'medium' : 'low',
      reason: topic.accuracy < 70 ? 'Below passing threshold' : 
              topic.accuracy < 85 ? 'Room for improvement' : 'Maintain proficiency',
      estimatedTime: topic.accuracy < 70 ? 45 : topic.accuracy < 85 ? 30 : 15
    }));
  }

  private analyzeTopicPerformance(sessions: ExamSession[]): Array<{ name: string; accuracy: number }> {
    const topicMap = new Map<string, { correct: number; total: number }>();

    sessions.forEach(session => {
      const topicName = session.topicName;
      if (!topicMap.has(topicName)) {
        topicMap.set(topicName, { correct: 0, total: 0 });
      }
      
      const stats = topicMap.get(topicName)!;
      stats.correct += session.correctAnswers;
      stats.total += session.totalQuestions;
    });

    return Array.from(topicMap.entries()).map(([name, stats]) => ({
      name,
      accuracy: Math.round((stats.correct / stats.total) * 100)
    }));
  }

  private generateQuestionRecommendations(level: string, priorityTopics: any[]): Array<{
    questionType: string;
    difficulty: string;
    count: number;
  }> {
    const recommendations = {
      'Beginner': [
        { questionType: 'Basic concepts', difficulty: 'easy', count: 15 },
        { questionType: 'Simple scenarios', difficulty: 'medium', count: 10 },
        { questionType: 'Complex cases', difficulty: 'hard', count: 5 }
      ],
      'Intermediate': [
        { questionType: 'Core concepts', difficulty: 'medium', count: 15 },
        { questionType: 'Clinical scenarios', difficulty: 'hard', count: 10 },
        { questionType: 'Review basics', difficulty: 'easy', count: 5 }
      ],
      'Advanced': [
        { questionType: 'Complex scenarios', difficulty: 'hard', count: 20 },
        { questionType: 'Edge cases', difficulty: 'hard', count: 8 },
        { questionType: 'Mixed review', difficulty: 'medium', count: 7 }
      ],
      'Expert Level': [
        { questionType: 'Advanced scenarios', difficulty: 'hard', count: 25 },
        { questionType: 'Rare cases', difficulty: 'hard', count: 10 }
      ]
    };

    return recommendations[level] || recommendations['Intermediate'];
  }

  private calculateAverageDifficulty(questions: any[]): string {
    const difficulties = questions.map(q => q.difficulty || 'medium');
    const scores = difficulties.map(d => ({ easy: 1, medium: 2, hard: 3 }[d] || 2));
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    if (average <= 1.3) return 'easy';
    if (average <= 2.3) return 'medium';
    return 'hard';
  }

  private identifyStrengths(sessions: ExamSession[], difficultyAnalysis: QuestionDifficultyAnalysis[]): Array<{
    area: string;
    accuracy: number;
  }> {
    // Find areas with >85% accuracy
    return difficultyAnalysis
      .filter(d => d.accuracy >= 85)
      .map(d => ({
        area: `${d.difficulty} questions`,
        accuracy: d.accuracy
      }));
  }
}

// Export singleton instance
export const enhancedAnalytics = new EnhancedAnalyticsService();