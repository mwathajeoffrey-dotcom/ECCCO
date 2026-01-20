'use client';

import { logger } from '@/lib/logger';

/**
 * Advanced Learning Analytics Dashboard
 * 
 * Comprehensive dashboard showing learning insights, adaptive recommendations,
 * performance metrics, and personalized study plans for ECCCO users.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface LearningInsight {
  type: 'strength' | 'weakness' | 'improvement' | 'recommendation';
  category: string;
  title: string;
  description: string;
  evidence: string[];
  confidence: number;
  actionItems: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedImpact: number;
}

interface AdaptiveRecommendation {
  id: string;
  type: 'question' | 'topic' | 'study_plan' | 'guideline' | 'practice_mode';
  title: string;
  description: string;
  reasoning: string;
  targetTopics: string[];
  estimatedDifficulty: number;
  estimatedTime: number;
  expectedOutcome: string;
  confidence: number;
  metadata: {
    algorithm: string;
    factors: string[];
  };
}

interface PerformanceMetrics {
  overall: {
    accuracy: number;
    speed: number;
    consistency: number;
    improvement: number;
    retentionRate: number;
  };
  learningVelocity: {
    current: number;
    trend: 'increasing' | 'decreasing' | 'stable';
    prediction: number;
  };
  cognitiveLoad: {
    average: number;
    peak: number;
    optimal: number;
    fatigue: number;
  };
  topTopics: Array<{
    topicId: string;
    mastery: number;
    confidence: number;
    timeInvested: number;
    lastAccessed: string;
    progress: number;
    difficulty: number;
  }>;
}

interface DashboardData {
  insights: LearningInsight[];
  recommendations: AdaptiveRecommendation[];
  performance: PerformanceMetrics;
}

export default function LearningAnalyticsDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, [selectedTimeframe]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics/learning?action=dashboard&timeframe=${selectedTimeframe}`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        logger.error('Failed to load analytics data:', result.error);
        // Generate mock data for demonstration
        setData(generateMockData());
      }
    } catch (error) {
      logger.error('Error loading analytics data:', error instanceof Error ? error : new Error(String(error)));
      // Generate mock data for demonstration
      setData(generateMockData());
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = (): DashboardData => {
    return {
      insights: [
        {
          type: 'strength',
          category: 'cardiology',
          title: 'Excellent ECG Interpretation Skills',
          description: 'Your accuracy in ECG interpretation is 92%, well above average',
          evidence: ['High accuracy across 45 ECG questions', 'Consistent performance over time'],
          confidence: 0.92,
          actionItems: ['Consider teaching others', 'Advance to complex arrhythmias'],
          priority: 'low',
          estimatedImpact: 0.3,
        },
        {
          type: 'weakness',
          category: 'toxicology',
          title: 'Toxicology Knowledge Gaps',
          description: 'Your accuracy in toxicology is 58%, indicating knowledge gaps',
          evidence: ['Low accuracy across 23 toxicology questions', 'Difficulty with antidote protocols'],
          confidence: 0.84,
          actionItems: ['Review toxicology guidelines', 'Practice more poison management cases'],
          priority: 'high',
          estimatedImpact: 0.7,
        },
        {
          type: 'improvement',
          category: 'trauma',
          title: 'Strong Improvement in Trauma Management',
          description: 'Your trauma scores improved 23% over the last month',
          evidence: ['Accuracy increased from 67% to 82%', 'Faster response times'],
          confidence: 0.89,
          actionItems: ['Maintain current study pattern', 'Consider advanced trauma topics'],
          priority: 'medium',
          estimatedImpact: 0.5,
        },
      ],
      recommendations: [
        {
          id: 'rec_1',
          type: 'topic',
          title: 'Focus on Pediatric Emergencies',
          description: 'Based on your performance patterns, pediatric emergency topics would benefit from concentrated study',
          reasoning: 'Low mastery score (52%) and high potential for improvement',
          targetTopics: ['pediatric-emergencies', 'pediatric-resuscitation'],
          estimatedDifficulty: 4,
          estimatedTime: 45,
          expectedOutcome: 'Improved pediatric emergency management skills',
          confidence: 0.83,
          metadata: {
            algorithm: 'topic_mastery_analysis',
            factors: ['low_mastery', 'improvement_potential', 'knowledge_gaps'],
          },
        },
        {
          id: 'rec_2',
          type: 'study_plan',
          title: 'Implement Spaced Repetition',
          description: 'Your forgetting curve suggests you would benefit from spaced repetition learning',
          reasoning: 'Performance drops after 2-3 days without practice',
          targetTopics: [],
          estimatedDifficulty: 0,
          estimatedTime: 20,
          expectedOutcome: 'Better long-term retention',
          confidence: 0.76,
          metadata: {
            algorithm: 'retention_analysis',
            factors: ['forgetting_curve', 'retention_rate'],
          },
        },
      ],
      performance: {
        overall: {
          accuracy: 0.78,
          speed: 2.3,
          consistency: 0.85,
          improvement: 0.12,
          retentionRate: 0.73,
        },
        learningVelocity: {
          current: 3.4,
          trend: 'increasing',
          prediction: 3.8,
        },
        cognitiveLoad: {
          average: 0.65,
          peak: 0.89,
          optimal: 0.6,
          fatigue: 0.25,
        },
        topTopics: [
          {
            topicId: 'cardiology',
            mastery: 0.92,
            confidence: 0.88,
            timeInvested: 1800,
            lastAccessed: new Date().toISOString(),
            progress: 0.95,
            difficulty: 4,
          },
          {
            topicId: 'emergency-procedures',
            mastery: 0.84,
            confidence: 0.79,
            timeInvested: 2100,
            lastAccessed: new Date().toISOString(),
            progress: 0.87,
            difficulty: 5,
          },
          {
            topicId: 'toxicology',
            mastery: 0.58,
            confidence: 0.62,
            timeInvested: 900,
            lastAccessed: new Date().toISOString(),
            progress: 0.45,
            difficulty: 3,
          },
        ],
      },
    };
  };

  const formatTopicName = (topicId: string) => {
    return topicId
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return '💪';
      case 'weakness': return '📚';
      case 'improvement': return '📈';
      case 'recommendation': return '💡';
      default: return '📊';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'strength': return 'bg-green-50 border-green-200 text-green-800';
      case 'weakness': return 'bg-red-50 border-red-200 text-red-800';
      case 'improvement': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'recommendation': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your learning analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load analytics data. Please try again.</p>
          <button 
            onClick={loadDashboardData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-2 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Learning Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights into your medical education journey</p>
          
          {/* Timeframe Selector */}
          <div className="mt-4 flex space-x-2">
            {['7d', '30d', '90d', 'all'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-blue-50'
                }`}
              >
                {timeframe === 'all' ? 'All Time' : timeframe.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <div className="flex space-x-1 bg-white rounded-lg p-1">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'insights', name: 'Insights', icon: '🧠' },
              { id: 'recommendations', name: 'Recommendations', icon: '💡' },
              { id: 'performance', name: 'Performance', icon: '📈' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-blue-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Performance Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overall Accuracy</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {(data.performance.overall.accuracy * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-2xl">🎯</div>
                </div>
                <div className="mt-2">
                  <span className={`text-sm ${
                    data.performance.overall.improvement > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.performance.overall.improvement > 0 ? '↗️' : '↘️'} 
                    {Math.abs(data.performance.overall.improvement * 100).toFixed(1)}% from last period
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Learning Speed</p>
                    <p className="text-3xl font-bold text-green-600">
                      {data.performance.overall.speed.toFixed(1)}
                    </p>
                    <p className="text-xs text-gray-500">questions/min</p>
                  </div>
                  <div className="text-2xl">⚡</div>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">
                    {getTrendIcon(data.performance.learningVelocity.trend)} {data.performance.learningVelocity.trend}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Consistency</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {(data.performance.overall.consistency * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-2xl">🎭</div>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Stable performance</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cognitive Load</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {(data.performance.cognitiveLoad.average * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="text-2xl">🧠</div>
                </div>
                <div className="mt-2">
                  <span className={`text-sm ${
                    data.performance.cognitiveLoad.fatigue < 0.3 ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {data.performance.cognitiveLoad.fatigue < 0.3 ? 'Optimal' : 'High fatigue'}
                  </span>
                </div>
              </div>
            </div>

            {/* Top Insights and Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Insights */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                <div className="space-y-3">
                  {data.insights.slice(0, 3).map((insight, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}>
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">{getInsightIcon(insight.type)}</span>
                        <div className="flex-1">
                          <h4 className="font-medium">{insight.title}</h4>
                          <p className="text-sm opacity-90 mt-1">{insight.description}</p>
                          <div className="flex items-center mt-2 space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(insight.priority)}`}></div>
                            <span className="text-xs font-medium">{insight.priority} priority</span>
                            <span className="text-xs">• {(insight.confidence * 100).toFixed(0)}% confidence</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Recommendations */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Recommendations</h3>
                <div className="space-y-3">
                  {data.recommendations.slice(0, 3).map((rec, index) => (
                    <div key={index} className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">🎯</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{rec.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                          <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                            <span>⏱️ {rec.estimatedTime} min</span>
                            <span>📊 Level {rec.estimatedDifficulty}</span>
                            <span>🎲 {(rec.confidence * 100).toFixed(0)}% match</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Topic Mastery Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Mastery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.performance.topTopics.map((topic, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">{formatTopicName(topic.topicId)}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Mastery</span>
                        <span className="font-medium">{(topic.mastery * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${topic.mastery * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Progress: {(topic.progress * 100).toFixed(0)}%</span>
                        <span>Level {topic.difficulty}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Learning Insights</h3>
              <div className="space-y-4">
                {data.insights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <span className="text-xl">{getInsightIcon(insight.type)}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{insight.title}</h4>
                          <p className="text-sm opacity-90 mt-1">{insight.description}</p>
                          
                          {/* Evidence */}
                          <div className="mt-3">
                            <h5 className="text-sm font-medium mb-1">Evidence:</h5>
                            <ul className="text-sm opacity-90 space-y-1">
                              {insight.evidence.map((evidence, idx) => (
                                <li key={idx} className="flex items-start space-x-1">
                                  <span>•</span>
                                  <span>{evidence}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Action Items */}
                          <div className="mt-3">
                            <h5 className="text-sm font-medium mb-1">Recommended Actions:</h5>
                            <ul className="text-sm opacity-90 space-y-1">
                              {insight.actionItems.map((action, idx) => (
                                <li key={idx} className="flex items-start space-x-1">
                                  <span>→</span>
                                  <span>{action}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(insight.priority)} text-white`}>
                          {insight.priority}
                        </div>
                        <div className="text-xs text-gray-500">
                          {(insight.confidence * 100).toFixed(0)}% confidence
                        </div>
                        <div className="text-xs text-gray-500">
                          {(insight.estimatedImpact * 100).toFixed(0)}% impact
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Adaptive Recommendations</h3>
              <div className="space-y-4">
                {data.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">🎯</span>
                          <h4 className="font-semibold text-lg text-gray-900">{rec.title}</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {rec.type}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{rec.description}</p>
                        
                        <div className="bg-blue-50 p-3 rounded-lg mb-3">
                          <h5 className="text-sm font-medium text-blue-900 mb-1">Why this recommendation?</h5>
                          <p className="text-sm text-blue-800">{rec.reasoning}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Difficulty:</span>
                            <div className="font-medium">Level {rec.estimatedDifficulty}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Time:</span>
                            <div className="font-medium">{rec.estimatedTime} min</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Confidence:</span>
                            <div className="font-medium">{(rec.confidence * 100).toFixed(0)}%</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Algorithm:</span>
                            <div className="font-medium text-xs">{rec.metadata.algorithm}</div>
                          </div>
                        </div>

                        {rec.targetTopics.length > 0 && (
                          <div className="mt-3">
                            <span className="text-sm text-gray-500">Target Topics:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {rec.targetTopics.map((topic, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                                  {formatTopicName(topic)}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-3 p-2 bg-green-50 rounded">
                          <span className="text-sm text-green-800">Expected Outcome: {rec.expectedOutcome}</span>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Detailed Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Performance</h3>
                <div className="space-y-4">
                  {Object.entries(data.performance.overall).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, value * 100)}%` }}
                          ></div>
                        </div>
                        <span className="font-medium w-12 text-right">
                          {(value * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Velocity</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {data.performance.learningVelocity.current.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">questions/hour</div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <span>{getTrendIcon(data.performance.learningVelocity.trend)}</span>
                      <span className="capitalize">{data.performance.learningVelocity.trend}</span>
                    </div>
                    <div className="text-gray-500">
                      Predicted: {data.performance.learningVelocity.prediction.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cognitive Load Analysis */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cognitive Load Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {(data.performance.cognitiveLoad.average * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">Average Load</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {(data.performance.cognitiveLoad.peak * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">Peak Load</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {(data.performance.cognitiveLoad.optimal * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">Optimal Range</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {(data.performance.cognitiveLoad.fatigue * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">Fatigue Level</div>
                </div>
              </div>
            </div>

            {/* Topic Performance Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Topic Performance Details</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2">Topic</th>
                      <th className="text-center py-2">Mastery</th>
                      <th className="text-center py-2">Confidence</th>
                      <th className="text-center py-2">Progress</th>
                      <th className="text-center py-2">Time Invested</th>
                      <th className="text-center py-2">Difficulty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.performance.topTopics.map((topic, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 font-medium">{formatTopicName(topic.topicId)}</td>
                        <td className="text-center">
                          <div className="flex items-center justify-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${topic.mastery * 100}%` }}
                              ></div>
                            </div>
                            <span>{(topic.mastery * 100).toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="text-center">{(topic.confidence * 100).toFixed(1)}%</td>
                        <td className="text-center">{(topic.progress * 100).toFixed(0)}%</td>
                        <td className="text-center">{Math.round(topic.timeInvested / 60)}m</td>
                        <td className="text-center">Level {topic.difficulty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}