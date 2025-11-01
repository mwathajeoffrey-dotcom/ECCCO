'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Users, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

interface Topic {
  id: string;
  name: string;
  description: string;
}

export default function PracticePage() {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/topics');
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
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
                  <p className="text-sm text-gray-600">Practice Mode</p>
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/practice" className="text-blue-600 font-medium">
                Practice
              </Link>
              <Link href="/exam" className="text-gray-700 hover:text-blue-600 font-medium">
                Exams
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Practice Options */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Practice Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive topic library to practice specific areas or take mixed questions to test your overall knowledge.
          </p>
        </div>

        {/* Quick Practice Options */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Practice</h3>
            <p className="text-gray-600 text-sm mb-4">10 random questions from all topics</p>
            <Link
              href="/exam"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Start Now
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mixed Review</h3>
            <p className="text-gray-600 text-sm mb-4">30 questions across multiple topics</p>
            <Link
              href="/exam"
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Start Review
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Weak Areas</h3>
            <p className="text-gray-600 text-sm mb-4">Focus on your challenging topics</p>
            <Link
              href="/dashboard"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Analyze
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Study Mode</h3>
            <p className="text-gray-600 text-sm mb-4">Questions with immediate explanations</p>
            <Link
              href="/exam"
              className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
            >
              Study Now
            </Link>
          </div>
        </div>

        {/* Topic Selection */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Practice by Topic</h3>
          <ErrorBoundary fallback={
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-800 mb-4">Unable to load practice topics. Please refresh the page or try again later.</p>
              <Link href="/exam" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Go to Full Exam
              </Link>
            </div>
          }>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-3">
                    <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-900">{topic.name}</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span>30 Questions Available</span>
                    </div>
                    <Link
                      href={`/exam?topic=${topic.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Practice
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </ErrorBoundary>
        </div>

        {/* Study Tips */}
        <div className="bg-blue-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Study Tips for Success</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Effective Practice Strategies</h4>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• Review explanations for both correct and incorrect answers</li>
                <li>• Focus on understanding concepts, not just memorizing</li>
                <li>• Practice regularly with short, focused sessions</li>
                <li>• Identify patterns in your mistakes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">Using This Platform</h4>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• Start with topics you find most challenging</li>
                <li>• Use timed exams to simulate real conditions</li>
                <li>• Track your progress in the dashboard</li>
                <li>• Reference the detailed explanations and guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}