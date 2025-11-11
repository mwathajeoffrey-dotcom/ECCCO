'use client';

import { useState, useEffect } from 'react';
import { BookOpen, TrendingUp, Target, Clock, Award, BarChart3, Users, Calendar, AlertCircle, Loader2, Play } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';

// Simplified Dashboard with Better Error Handling
interface SimpleDashboardData {
  hasData: boolean;
  totalExams: number;
  averageScore: number;
  studyTime: number;
  lastActivity?: string;
  error?: string;
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<SimpleDashboardData>({
    hasData: false,
    totalExams: 0,
    averageScore: 0,
    studyTime: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    
    // Set a timeout to show dashboard even if API is slow
    const timeout = setTimeout(() => {
      if (isLoading) {
        setDashboardData({
          hasData: false,
          totalExams: 0,
          averageScore: 0,
          studyTime: 0,
          error: 'Loading timeout - please refresh or take your first exam'
        });
        setIsLoading(false);
      }
    }, 10000); // 10 second timeout
    
    return () => clearTimeout(timeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Use the existing user stats API instead of the complex analytics API
      const response = await fetch('/api/user/stats', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      if (response.ok) {
        const stats = await response.json();
        
        setDashboardData({
          hasData: stats.totalAttempts > 0,
          totalExams: stats.totalAttempts || 0,
          averageScore: Math.round(stats.averageScore || 0),
          studyTime: Math.round((stats.totalTimeSpent || 0) / 60), // Convert to minutes
          lastActivity: stats.recentActivity?.[0]?.createdAt
        });
      } else if (response.status === 401) {
        // User not authenticated - show welcome screen
        setDashboardData({
          hasData: false,
          totalExams: 0,
          averageScore: 0,
          studyTime: 0,
          error: 'Please sign in to view your progress'
        });
      } else {
        // Other API error
        setDashboardData({
          hasData: false,
          totalExams: 0,
          averageScore: 0,
          studyTime: 0,
          error: 'Unable to load progress data'
        });
      }
    } catch (error) {
      // Network or other error
      console.error('Dashboard error:', error);
      setDashboardData({
        hasData: false,
        totalExams: 0,
        averageScore: 0,
        studyTime: 0,
        error: 'Connection error - check your internet'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="ECCCO" 
        subtitle="Learning Dashboard" 
        currentPage="dashboard"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Your Learning Dashboard</h2>
          <p className="text-sm sm:text-base text-gray-600">
            {dashboardData.hasData 
              ? "Track your progress and continue your medical education journey" 
              : "Start your medical education journey by taking your first exam"
            }
          </p>
          {dashboardData.error && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex flex-col items-center">
                <p className="text-yellow-800 text-sm mb-2">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  {dashboardData.error}
                </p>
                {dashboardData.error.includes('sign in') && (
                  <Link 
                    href="/api/auth/signin" 
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Sign In →
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {dashboardData.hasData ? (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Exams Completed</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{dashboardData.totalExams}</p>
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
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{dashboardData.averageScore}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Study Time</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{dashboardData.studyTime}m</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                  </div>
                  <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Progress</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {dashboardData.averageScore >= 80 ? 'Excellent' : 
                       dashboardData.averageScore >= 70 ? 'Good' : 
                       dashboardData.averageScore >= 60 ? 'Fair' : 'Improving'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Continue Learning</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href="/exam"
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Play className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-blue-900">Take New Exam</h4>
                    <p className="text-sm text-blue-700">Test your knowledge</p>
                  </div>
                </Link>

                <Link
                  href="/exam?mode=study"
                  className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <BookOpen className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-green-900">Study Mode</h4>
                    <p className="text-sm text-green-700">Practice without time pressure</p>
                  </div>
                </Link>

                <button
                  onClick={loadDashboardData}
                  className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <BarChart3 className="w-6 h-6 text-purple-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-purple-900">Refresh Data</h4>
                    <p className="text-sm text-purple-700">Update your progress</p>
                  </div>
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Welcome Section for New Users */
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 text-center">
            <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Welcome to ECCCO Medical Education
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Start your medical education journey with our comprehensive exam platform. 
              Take exams, track your progress, and improve your medical knowledge.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Link
                href="/exam"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Your First Exam
              </Link>
              
              <Link
                href="/exam?mode=study"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Practice in Study Mode
              </Link>
            </div>
          </div>
        )}

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Comprehensive Exams</h3>
            <p className="text-gray-600 text-sm">
              5000+ medical questions across emergency medicine, critical care, and more.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Progress Tracking</h3>
            <p className="text-gray-600 text-sm">
              Monitor your performance with detailed analytics and insights.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Study Modes</h3>
            <p className="text-gray-600 text-sm">
              Choose between timed exams or untimed study sessions with instant feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}