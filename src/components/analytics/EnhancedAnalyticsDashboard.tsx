'use client';

/**
 * Enhanced Analytics Dashboard Component
 * Advanced analytics visualization with PALS-specific insights
 */

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Brain, 
  AlertTriangle, 
  CheckCircle,
  BarChart3,
  PieChart,
  Calendar,
  BookOpen,
  Award,
  Lightbulb
} from 'lucide-react';
import { enhancedAnalytics, EnhancedAnalytics } from '@/lib/analytics/enhanced-analytics';

export const EnhancedAnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<EnhancedAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'difficulty' | 'topics' | 'patterns' | 'path'>('overview');

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await enhancedAnalytics.generateEnhancedAnalytics();
        setAnalytics(data);
      } catch (error) {
        logger.error('Failed to load enhanced analytics', error instanceof Error ? error : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg">Loading advanced analytics...</span>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-6 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Unavailable</h3>
        <p className="text-gray-600">Unable to load analytics data. Please try again later.</p>
      </div>
    );
  }

  const tabConfig = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'difficulty', label: 'Difficulty Analysis', icon: Target },
    { key: 'topics', label: 'Topic Breakdown', icon: BookOpen },
    { key: 'patterns', label: 'Mistake Patterns', icon: AlertTriangle },
    { key: 'path', label: 'Learning Path', icon: Brain }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Enhanced Analytics</h1>
        <p className="text-gray-600">Advanced insights and personalized recommendations for PALS mastery</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabConfig.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'overview' && <OverviewTab analytics={analytics} />}
        {activeTab === 'difficulty' && <DifficultyAnalysisTab analytics={analytics} />}
        {activeTab === 'topics' && <TopicBreakdownTab analytics={analytics} />}
        {activeTab === 'patterns' && <MistakePatternsTab analytics={analytics} />}
        {activeTab === 'path' && <LearningPathTab analytics={analytics} />}
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab: React.FC<{ analytics: EnhancedAnalytics }> = ({ analytics }) => {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Overall Performance"
          value={`${analytics.averageScore}%`}
          icon={TrendingUp}
          color="blue"
          subtitle="Across all topics"
        />
        <MetricCard
          title="Study Sessions"
          value={analytics.totalSessions.toString()}
          icon={Calendar}
          color="green"
          subtitle="Completed"
        />
        <MetricCard
          title="Time Invested"
          value={`${Math.round(analytics.totalTimeSpent / 60)}h`}
          icon={Clock}
          color="purple"
          subtitle="Total study time"
        />
        <MetricCard
          title="Learning Level"
          value={analytics.learningPath.currentLevel}
          icon={Award}
          color="orange"
          subtitle="Current mastery"
        />
      </div>

      {/* Performance Trends */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
        <div className="space-y-4">
          {analytics.performanceTrends.slice(-10).map((trend, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <span className="font-medium text-gray-900">{trend.topic}</span>
                <span className="text-sm text-gray-600 ml-2">({trend.date})</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  trend.difficulty === 'hard' ? 'bg-red-100 text-red-800' :
                  trend.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {trend.difficulty}
                </span>
                <span className="font-bold text-lg">{trend.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Recommendations</h3>
        <div className="space-y-4">
          {analytics.recommendations.slice(0, 3).map((rec, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{rec.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                  <p className="text-sm text-blue-600 mt-2">{rec.action}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {rec.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Difficulty Analysis Tab Component
const DifficultyAnalysisTab: React.FC<{ analytics: EnhancedAnalytics }> = ({ analytics }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance by Difficulty Level</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analytics.difficultyAnalysis.map((difficulty) => (
            <div key={difficulty.difficulty} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className={`font-semibold text-lg capitalize ${
                  difficulty.difficulty === 'easy' ? 'text-green-600' :
                  difficulty.difficulty === 'medium' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {difficulty.difficulty}
                </h4>
                <span className="text-2xl font-bold">{difficulty.accuracy}%</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions Attempted:</span>
                  <span className="font-medium">{difficulty.totalAttempted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Correct Answers:</span>
                  <span className="font-medium">{difficulty.correctAnswers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Time:</span>
                  <span className="font-medium">{difficulty.averageTimeSpent}s</span>
                </div>
              </div>

              {difficulty.commonMistakes.length > 0 && (
                <div className="mt-4 pt-3 border-t">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Common Mistakes:</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {difficulty.commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-400 mr-1">•</span>
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Progression Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Difficulty Progression Strategy</h3>
        <div className="space-y-4">
          {analytics.learningPath.customizedQuestions.map((question, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <span className="font-medium text-gray-900">{question.questionType}</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                  question.difficulty === 'hard' ? 'bg-red-100 text-red-800' :
                  question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {question.difficulty}
                </span>
              </div>
              <span className="text-lg font-bold">{question.count} questions</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Topic Breakdown Tab Component
const TopicBreakdownTab: React.FC<{ analytics: EnhancedAnalytics }> = ({ analytics }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {analytics.topicDrillDown.map((topic) => (
          <div key={topic.topicId} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{topic.topicName}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-2xl font-bold">{topic.overallAccuracy}%</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    topic.masteryLevel === 'expert' ? 'bg-purple-100 text-purple-800' :
                    topic.masteryLevel === 'advanced' ? 'bg-blue-100 text-blue-800' :
                    topic.masteryLevel === 'intermediate' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {topic.masteryLevel}
                  </span>
                </div>
              </div>
              <div className={`p-2 rounded-full ${
                topic.timeEfficiency === 'excellent' ? 'bg-green-100' :
                topic.timeEfficiency === 'good' ? 'bg-blue-100' :
                topic.timeEfficiency === 'needs-improvement' ? 'bg-yellow-100' :
                'bg-red-100'
              }`}>
                <Clock className={`h-5 w-5 ${
                  topic.timeEfficiency === 'excellent' ? 'text-green-600' :
                  topic.timeEfficiency === 'good' ? 'text-blue-600' :
                  topic.timeEfficiency === 'needs-improvement' ? 'text-yellow-600' :
                  'text-red-600'
                }`} />
              </div>
            </div>

            {/* Difficulty Breakdown */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Difficulty Performance</h4>
              <div className="space-y-2">
                {topic.difficultyBreakdown.map((diff) => (
                  <div key={diff.difficulty} className="flex items-center justify-between">
                    <span className="text-sm capitalize text-gray-600">{diff.difficulty}:</span>
                    <span className="font-medium">{diff.accuracy}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Actions */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {topic.recommendedActions.map((action, index) => (
                  <li key={index} className="flex items-start">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mistake Patterns Tab Component
const MistakePatternsTab: React.FC<{ analytics: EnhancedAnalytics }> = ({ analytics }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Identified Mistake Patterns</h3>
        
        {analytics.mistakePatterns.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Significant Patterns Found</h4>
            <p className="text-gray-600">Great work! No concerning mistake patterns detected in your performance.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {analytics.mistakePatterns.map((pattern, index) => (
              <div key={index} className={`border-l-4 pl-4 ${
                pattern.severity === 'high' ? 'border-red-500' :
                pattern.severity === 'medium' ? 'border-yellow-500' :
                'border-green-500'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900">{pattern.pattern}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        pattern.severity === 'high' ? 'bg-red-100 text-red-800' :
                        pattern.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {pattern.severity} severity
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Frequency:</strong> {pattern.frequency}% of attempts
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Affected topics:</strong> {pattern.affectedTopics.join(', ')}
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm text-blue-800">
                        <strong>Recommendation:</strong> {pattern.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pattern Prevention Tips */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Prevention Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Before Studying</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Review previous mistakes</li>
              <li>• Set specific learning goals</li>
              <li>• Ensure adequate rest</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">During Practice</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Read questions carefully</li>
              <li>• Take your time with complex scenarios</li>
              <li>• Justify your reasoning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Learning Path Tab Component
const LearningPathTab: React.FC<{ analytics: EnhancedAnalytics }> = ({ analytics }) => {
  return (
    <div className="space-y-6">
      {/* Current Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Learning Journey</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900">Current Level</h4>
            <p className="text-lg font-bold text-blue-600">{analytics.learningPath.currentLevel}</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900">Next Milestone</h4>
            <p className="text-sm text-green-600 font-medium">{analytics.learningPath.nextMilestone}</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900">Recommended Time</h4>
            <p className="text-lg font-bold text-purple-600">{analytics.learningPath.recommendedStudyTime} min/week</p>
          </div>
        </div>
      </div>

      {/* Priority Topics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Focus Areas</h3>
        
        <div className="space-y-4">
          {analytics.learningPath.priorityTopics.map((topic, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-gray-900">{topic.topicName}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    topic.priority === 'high' ? 'bg-red-100 text-red-800' :
                    topic.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {topic.priority} priority
                  </span>
                </div>
                <p className="text-sm text-gray-600">{topic.reason}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{topic.estimatedTime}min</p>
                <p className="text-xs text-gray-500">Est. time</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customized Questions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Question Mix</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analytics.learningPath.customizedQuestions.map((question, index) => (
            <div key={index} className="p-4 border rounded-lg text-center">
              <h4 className="font-medium text-gray-900 mb-2">{question.questionType}</h4>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                question.difficulty === 'hard' ? 'bg-red-100 text-red-800' :
                question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {question.difficulty}
              </div>
              <p className="text-2xl font-bold text-blue-600">{question.count}</p>
              <p className="text-xs text-gray-500">questions</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard: React.FC<{
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  color: 'blue' | 'green' | 'purple' | 'orange';
  subtitle: string;
}> = ({ title, value, icon: Icon, color, subtitle }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default EnhancedAnalyticsDashboard;