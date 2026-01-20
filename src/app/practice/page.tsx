"use client";
import { logger } from '@/lib/logger';

import { useState, useEffect } from "react";
import { BookOpen, Users, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { EnhancedErrorBoundary } from "@/components/ui/EnhancedErrorBoundary";

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
        const response = await fetch("/api/topics");
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        logger.error("Error fetching topics:", error instanceof Error ? error : new Error(String(error)));
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Practice Options */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Practice Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive topic library to practice specific areas or take mixed questions to test your
            overall knowledge.
          </p>
        </div>

        {/* Quick Practice Options + Guidelines & References - All in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
          <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Quick Practice</h3>
            <p className="text-gray-600 text-xs mb-3">10 random questions from all topics</p>
            <Link
              href="/exam?count=10&mode=quick"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors inline-block"
            >
              Start Now
            </Link>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Mixed Review</h3>
            <p className="text-gray-600 text-xs mb-3">30 questions across multiple topics</p>
            <Link
              href="/exam?count=30&topics=mixed"
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors inline-block"
            >
              Start Review
            </Link>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Weak Areas</h3>
            <p className="text-gray-600 text-xs mb-3">Focus on your challenging topics</p>
            <Link
              href="/dashboard"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors inline-block"
            >
              Analyze
            </Link>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Study Mode</h3>
            <p className="text-gray-600 text-xs mb-3">Questions with immediate explanations</p>
            <Link
              href="/exam?mode=study&explanations=immediate"
              className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors inline-block"
            >
              Study Now
            </Link>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-blue-100">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Guidelines</h3>
            <p className="text-gray-600 text-xs mb-3">ACLS, PALS & clinical protocols</p>
            <Link
              href="/guidelines"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors inline-block"
            >
              View All
            </Link>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-green-100">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">References</h3>
            <p className="text-gray-600 text-xs mb-3">30+ landmark trials & evidence</p>
            <Link
              href="/emergency-references"
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors inline-block"
            >
              Browse
            </Link>
          </div>
        </div>

        {/* Topic Selection - Compact cards */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Practice by Topic</h3>
          <EnhancedErrorBoundary
            fallback={
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-800 mb-4">
                  Unable to load practice topics. Please refresh the page or try again later.
                </p>
                <Link
                  href="/exam"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Go to Full Exam
                </Link>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map((topic) => (
                <div key={topic.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-2">
                    <BookOpen className="w-4 h-4 text-blue-600 mr-2" />
                    <h4 className="text-base font-semibold text-gray-900">{topic.name}</h4>
                  </div>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{topic.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <span>30 Questions</span>
                    </div>
                    <Link
                      href={`/exam?topic=${topic.id}`}
                      className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                    >
                      Practice
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </EnhancedErrorBoundary>
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
