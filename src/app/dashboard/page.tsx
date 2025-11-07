'use client';

import { useState, useEffect } from 'react';
import { BookOpen, TrendingUp, Target, Clock, Award, BarChart3, Users, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { analytics } from '@/lib/analytics/service';

// Dynamic Dashboard with Mobile Responsiveness - v2.0
interface DashboardData {
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

interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null
  });
  
  // Generate session ID for anonymous tracking
  const getSessionId = () => {
    if (typeof window !== 'undefined') {
      let sessionId = localStorage.getItem('eccco-session-id');
      if (!sessionId) {
        sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('eccco-session-id', sessionId);
      }
      return sessionId;
    }
    return 'anonymous';
  };

  const fetchDashboardData = async (retryCount = 0) => {
    console.log('🔍 Starting dashboard data fetch... Attempt:', retryCount + 1);
    setLoadingState({ isLoading: true, error: null });
    
    try {
      // Get session ID from analytics service for consistency
      const sessionId = (analytics as any).getSessionId ? (analytics as any).getSessionId() : getSessionId();
      console.log('📋 Session ID:', sessionId);
      const response = await fetch(`/api/dashboard/analytics?sessionId=${sessionId}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      console.log('📡 API Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch dashboard data: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('📊 API Result:', result);
      
      if (result.success && result.data) {
        console.log('✅ Setting dashboard data:', result.data);
        setDashboardData(result.data);
        setLoadingState({ isLoading: false, error: null });
      } else {
        throw new Error(result.error || 'No data returned from API');
      }
    } catch (error) {
      console.error('❌ Dashboard fetch error:', error);
      
      // Retry once if first attempt fails
      if (retryCount === 0) {
        console.log('🔄 Retrying in 1 second...');
        setTimeout(() => fetchDashboardData(1), 1000);
        return;
      }
      
      setLoadingState({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to load dashboard data' 
      });
      
      console.log('🔄 Falling back to demo data after retry failed');
      // Fallback to demo data if API fails after retry
      setDashboardData(getDemoData());
    }
  };

  // Demo data fallback for new users or API errors
  const getDemoData = (): DashboardData => ({
    overallStats: {
      totalQuestions: 0,
      totalCorrect: 0,
      averageScore: 0,
      studyTimeHours: 0,
      sessionCount: 0,
      learningStreak: 0,
      strongestTopic: { name: 'N/A', score: 0 },
      weakestTopic: { name: 'N/A', score: 0 }
    },
    topicPerformance: [],
    recentActivity: [],
    lastUpdated: new Date().toISOString()
  });

  useEffect(() => {
    fetchDashboardData(0);
    
    // Set up periodic refresh every 5 minutes
    const interval = setInterval(() => fetchDashboardData(0), 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number | null): string => {
    if (!seconds || seconds === 0) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (loadingState.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Your Dashboard</h2>
          <p className="text-gray-600">Fetching your learning progress...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{loadingState.error}</p>
          <button
            onClick={() => fetchDashboardData(0)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { overallStats } = dashboardData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">ECCCO</h1>
                  <p className="text-xs sm:text-sm text-gray-600">Dashboard v2.0 - Mobile Ready</p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => fetchDashboardData(0)}
                disabled={loadingState.isLoading}
                className="flex items-center justify-center sm:justify-start space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 sm:bg-transparent rounded-lg sm:rounded-none border sm:border-0"
              >
                {loadingState.isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
                <span className="text-xs sm:text-sm">
                  Last updated: {formatDate(dashboardData.lastUpdated)}
                </span>
              </button>
              <nav className="flex justify-center space-x-6 sm:space-x-8">
                <Link href="/practice" className="text-gray-700 hover:text-blue-600 font-medium text-sm sm:text-base">
                  Practice
                </Link>
                <Link href="/exam" className="text-gray-700 hover:text-blue-600 font-medium text-sm sm:text-base">
                  Exams
                </Link>
                <Link href="/dashboard" className="text-blue-600 font-medium text-sm sm:text-base">
                  Dashboard
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Your Learning Progress</h2>
          <p className="text-sm sm:text-base text-gray-600 px-4">
            {overallStats.sessionCount > 0 
              ? "Track your performance and identify areas for improvement" 
              : "Start practicing to see your progress here"
            }
          </p>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Questions Attempted</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{overallStats.totalQuestions.toLocaleString()}</p>
                <p className="text-xs text-blue-600">{overallStats.sessionCount} sessions completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Average Score</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{overallStats.averageScore}%</p>
                <p className="text-xs text-green-600">{overallStats.totalCorrect} correct answers</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Learning Streak</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{overallStats.learningStreak}</p>
                <p className="text-xs text-purple-600">consecutive days</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-orange-500">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Study Time</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{overallStats.studyTimeHours}h</p>
                <p className="text-xs text-orange-600">total time invested</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance by Topic or Getting Started */}
        {dashboardData.topicPerformance.length > 0 ? (
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Performance by Topic</h3>
              <span className="text-xs sm:text-sm text-gray-500">
                Based on {overallStats.sessionCount} completed sessions
              </span>
            </div>
            <div className="space-y-4">
              {dashboardData.topicPerformance.map((data, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 space-y-2 sm:space-y-0">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{data.topicName}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium self-start sm:self-auto ${
                      data.averageScore >= 80 
                        ? 'bg-green-100 text-green-800'
                        : data.averageScore >= 60
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {data.averageScore}%
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-600 mb-2 space-y-2 sm:space-y-0">
                    <span>{data.correct} correct out of {data.attempted} attempted • {data.sessionCount} sessions</span>
                    <Link
                      href={`/practice?topic=${data.topicId}`}
                      className="text-blue-600 hover:text-blue-700 font-medium self-start sm:self-auto"
                    >
                      Practice More
                    </Link>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        data.averageScore >= 80 
                          ? 'bg-green-600'
                          : data.averageScore >= 60
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${data.averageScore}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6 sm:mb-8 text-center">
            <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Start Your Learning Journey</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Begin practicing to track your progress across different medical topics.
            </p>
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4 justify-center">
              <Link
                href="/practice"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
              >
                Start Practice Session
              </Link>
              <Link
                href="/exam"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors text-center"
              >
                Take Full Exam
              </Link>
            </div>
          </div>
        )}

        {/* Recent Activity and Recommendations */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Recent Activity
            </h3>
            {dashboardData.recentActivity.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{activity.topicName}</h4>
                      <p className="text-xs text-gray-600">
                        {formatDate(activity.createdAt)} • {formatTime(activity.totalTime)}
                      </p>
                    </div>
                    <div className="flex items-center justify-start sm:justify-end">
                      {activity.completed ? (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          (activity.score || 0) >= 80
                            ? 'bg-green-100 text-green-800'
                            : (activity.score || 0) >= 60
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {activity.score}%
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 text-sm sm:text-base">No recent activity yet</p>
                <p className="text-xs sm:text-sm text-gray-500">Start practicing to see your history here</p>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Personalized Recommendations</h3>
            <div className="space-y-4">
              {overallStats.sessionCount === 0 ? (
                <>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Take Your First Practice Session</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Start with basic topics like BLS or ACLS to get familiar with the platform.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Award className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Set Learning Goals</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Aim for consistency - even 15 minutes daily can make a significant difference.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Target className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Focus on Weak Areas</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Your weakest topic is <strong>{overallStats.weakestTopic.name}</strong> ({overallStats.weakestTopic.score}%). 
                        Consider spending more time on practice questions in this area.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Take Timed Exams</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Practice with our timed exams to simulate real test conditions and improve your pacing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Award className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Maintain Your Streak</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Great job on your {overallStats.learningStreak}-day learning streak! Keep it up with daily practice.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3 text-sm sm:text-base">Quick Actions</h4>
              <div className="space-y-2">
                <Link
                  href="/exam"
                  className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base"
                >
                  Take Practice Exam
                </Link>
                <Link
                  href={overallStats.weakestTopic.name !== 'N/A' 
                    ? `/practice?topic=${overallStats.weakestTopic.name.toLowerCase().replace(/\s+/g, '-')}` 
                    : '/practice'
                  }
                  className="block w-full border border-green-600 text-green-600 text-center py-3 rounded-lg font-medium hover:bg-green-50 transition-colors text-sm sm:text-base"
                >
                  {overallStats.weakestTopic.name !== 'N/A' ? 'Practice Weak Topics' : 'Start Practicing'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}