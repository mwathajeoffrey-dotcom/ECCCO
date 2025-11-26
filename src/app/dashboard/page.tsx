'use client';

import { useState, useEffect } from 'react';
import { BookOpen, TrendingUp, Target, Clock, Award, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import NewFeatureBanner from '@/components/NewFeatureBanner';

interface Topic {
  id: string;
  name: string;
  description: string;
}

interface PerformanceData {
  topic: string;
  attempted: number;
  correct: number;
  percentage: number;
}

export default function DashboardPage() {
  const [, setTopics] = useState<Topic[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/topics');
        const data = await response.json();
        setTopics(data);
        
        // Mock performance data - in real app this would come from user progress
        const mockPerformance = data.map((topic: Topic) => ({
          topic: topic.name,
          attempted: Math.floor(Math.random() * 100) + 20,
          correct: Math.floor(Math.random() * 80) + 10,
          percentage: Math.floor(Math.random() * 40) + 60
        }));
        setPerformanceData(mockPerformance);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTopics();
  }, []);

  const overallStats = {
    totalQuestions: performanceData.reduce((sum, data) => sum + data.attempted, 0),
    totalCorrect: performanceData.reduce((sum, data) => sum + data.correct, 0),
    averageScore: performanceData.length > 0 
      ? Math.round(performanceData.reduce((sum, data) => sum + data.percentage, 0) / performanceData.length)
      : 0,
    strongestTopic: performanceData.reduce((max, current) => 
      current.percentage > max.percentage ? current : max, 
      { topic: 'N/A', percentage: 0 }
    ),
    weakestTopic: performanceData.reduce((min, current) => 
      current.percentage < min.percentage ? current : min, 
      { topic: 'N/A', percentage: 100 }
    )
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* New Feature Banner */}
      <NewFeatureBanner />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">ECCCO</h1>
                  <p className="text-sm text-gray-600">Performance Dashboard</p>
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/practice" className="text-gray-700 hover:text-blue-600 font-medium">
                Practice
              </Link>
              <Link href="/exam" className="text-gray-700 hover:text-blue-600 font-medium">
                Exams
              </Link>
              <Link href="/dashboard" className="text-blue-600 font-medium">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Learning Progress</h2>
          <p className="text-gray-600">Track your performance and identify areas for improvement</p>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Questions Attempted</p>
                <p className="text-2xl font-bold text-gray-900">{overallStats.totalQuestions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">{overallStats.averageScore}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Strongest Topic</p>
                <p className="text-lg font-bold text-gray-900 truncate">{overallStats.strongestTopic.topic}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Study Time</p>
                <p className="text-2xl font-bold text-gray-900">24h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance by Topic */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Performance by Topic</h3>
          <div className="space-y-4">
            {performanceData.map((data, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{data.topic}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    data.percentage >= 80 
                      ? 'bg-green-100 text-green-800'
                      : data.percentage >= 60
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {data.percentage}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>{data.correct} correct out of {data.attempted} attempted</span>
                  <Link
                    href={`/practice?topic=${data.topic.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Practice More
                  </Link>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      data.percentage >= 80 
                        ? 'bg-green-600'
                        : data.percentage >= 60
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${data.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Actions</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mt-1">
                  <Target className="w-4 h-4 text-red-600" />
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Focus on Weak Areas</h4>
                  <p className="text-gray-600 text-sm">
                    Your weakest topic is <strong>{overallStats.weakestTopic.topic}</strong>. 
                    Consider spending more time on practice questions in this area.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Take Timed Exams</h4>
                  <p className="text-gray-600 text-sm">
                    Practice with our timed exams to simulate real test conditions and improve your pacing.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                  <Award className="w-4 h-4 text-green-600" />
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Review Explanations</h4>
                  <p className="text-gray-600 text-sm">
                    Don&apos;t skip the detailed explanations - they&apos;re key to understanding the concepts behind each question.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Study Plan</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">This Week&apos;s Goals</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Complete 100 practice questions</li>
                  <li>• Focus on {overallStats.weakestTopic.topic}</li>
                  <li>• Take 2 full-length timed exams</li>
                  <li>• Review incorrect answers</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <Link
                    href="/exam"
                    className="block w-full bg-green-600 text-white text-center py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Take Practice Exam
                  </Link>
                  <Link
                    href="/practice"
                    className="block w-full border border-green-600 text-green-600 text-center py-2 rounded-lg font-medium hover:bg-green-50 transition-colors"
                  >
                    Practice Weak Topics
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}