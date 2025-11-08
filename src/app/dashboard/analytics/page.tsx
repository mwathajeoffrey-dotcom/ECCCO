/**
 * Enhanced Analytics Page
 * Advanced analytics dashboard with PALS-specific insights
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  BarChart3, 
  Brain,
  ChevronLeft,
  Heart,
  TrendingUp,
  Activity
} from 'lucide-react';
import EnhancedAnalyticsDashboard from '@/components/analytics/EnhancedAnalyticsDashboard';
import PALSSpecificAnalytics from '@/components/analytics/PALSSpecificAnalytics';

export default function AnalyticsPage() {
  const [activeView, setActiveView] = useState<'enhanced' | 'pals'>('enhanced');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Dashboard
              </Link>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Advanced Analytics</h1>
                  <p className="text-sm text-gray-600">Deep insights and performance analysis</p>
                </div>
              </div>
            </div>

            <nav className="flex space-x-6">
              <Link href="/practice" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
                Practice
              </Link>
              <Link href="/exam" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
                Exams
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium text-sm">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Type Selector */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow p-1 max-w-md mx-auto">
            <div className="flex">
              <button
                onClick={() => setActiveView('enhanced')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'enhanced'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Brain className="h-4 w-4" />
                <span>Enhanced Analytics</span>
              </button>
              
              <button
                onClick={() => setActiveView('pals')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeView === 'pals'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Heart className="h-4 w-4" />
                <span>PALS Analytics</span>
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Content */}
        <div className="transition-all duration-300">
          {activeView === 'enhanced' ? (
            <EnhancedAnalyticsDashboard />
          ) : (
            <PALSSpecificAnalytics />
          )}
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Performance Trends</h4>
                <p className="text-sm text-gray-600">Track your progress over time with detailed trend analysis</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Mistake Patterns</h4>
                <p className="text-sm text-gray-600">Identify and address recurring mistake patterns</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Personalized Learning</h4>
                <p className="text-sm text-gray-600">Get customized recommendations based on your performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}