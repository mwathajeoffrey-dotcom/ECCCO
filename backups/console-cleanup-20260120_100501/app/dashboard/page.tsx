"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  TrendingUp,
  Target,
  Clock,
  Award,
  BarChart3,
  Library,
  FileText,
  ExternalLink,
  Loader2,
  RefreshCw,
  Gamepad2,
  Users,
  Swords,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { api, ApiError } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import type { UserStats } from "@/types/api";
import { DashboardStatsSkeleton } from "@/components/ui/skeletons";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchUserStats = async () => {
    if (!isLoaded) return;

    // Check if user is signed in
    if (!user) {
      setError("Please sign in to view your dashboard.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const stats = await api.user.getStats();
      setUserStats(stats);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      // Specific error handling based on error type
      if (error instanceof ApiError) {
        if (error.status === 401) {
          setError("Your session has expired. Please sign in again.");
        } else if (error.status === 404) {
          setError("No statistics found yet. Complete an exam to get started!");
        } else if (error.status === 503) {
          setError("Service temporarily unavailable. Retrying...");

          // Auto-retry for service unavailable (max 3 times)
          if (retryCount < 3) {
            setTimeout(() => {
              setRetryCount((prev) => prev + 1);
              fetchUserStats();
            }, 3000);
          }
        } else {
          setError(error.message || "Failed to load your statistics.");
        }
      } else {
        setError("Network error. Please check your connection and try again.");
      }

      // Log error for debugging (development only)
      logger.error("Failed to fetch user stats", error instanceof Error ? error : undefined, {
        userId: user?.id,
        retryCount,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStats();
  }, [isLoaded, user]);

  // Calculate overall stats
  const overallStats = userStats
    ? {
        totalQuestions: userStats.stats?.questions?.total || 0,
        totalCorrect: userStats.stats?.questions?.correct || 0,
        averageScore: userStats.stats?.examSessions?.averageScore || 0,
        bestScore: userStats.stats?.examSessions?.bestScore || 0,
        studyHours: userStats.stats?.overall?.studyHours || 0,
        currentStreak: userStats.stats?.examSessions?.currentStreak || 0,
        strongestTopic:
          userStats.topicPerformance?.length > 0
            ? userStats.topicPerformance.reduce((max, current) => (current.percentage > max.percentage ? current : max))
            : { topicName: "N/A", percentage: 0 },
        weakestTopic:
          userStats.topicPerformance?.length > 0
            ? userStats.topicPerformance.reduce((min, current) => (current.percentage < min.percentage ? current : min))
            : { topicName: "N/A", percentage: 0 },
      }
    : {
        totalQuestions: 0,
        totalCorrect: 0,
        averageScore: 0,
        bestScore: 0,
        studyHours: 0,
        currentStreak: 0,
        strongestTopic: { topicName: "N/A", percentage: 0 },
        weakestTopic: { topicName: "N/A", percentage: 0 },
      };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {user ? `Welcome back, ${user.firstName || "Learner"}!` : "Your Learning Progress"}
          </h2>
          <p className="text-gray-600">Track your performance and identify areas for improvement</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mb-8">
            <DashboardStatsSkeleton />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-red-800 font-medium mb-2">Error Loading Dashboard</p>
                <p className="text-red-700">{error}</p>
                <div className="mt-4 flex gap-3">
                  {error.includes("sign in") ? (
                    <Link
                      href="/auth/signin"
                      className="inline-flex items-center px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Sign In
                    </Link>
                  ) : (
                    <button
                      onClick={fetchUserStats}
                      disabled={loading}
                      className="inline-flex items-center px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                      {loading ? "Retrying..." : "Try Again"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Display */}
        {!loading && !error && (
          <>
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
                    <p className="text-sm font-medium text-gray-600">Study Streak</p>
                    <p className="text-2xl font-bold text-gray-900">{overallStats.currentStreak} days</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Study Time</p>
                    <p className="text-2xl font-bold text-gray-900">{overallStats.studyHours}h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Arena Featured Card */}
            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 rounded-xl shadow-lg p-6 mb-8 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <Gamepad2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold">Quiz Arena</h3>
                      <span className="px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                        NEW
                      </span>
                    </div>
                    <p className="text-white/90 text-lg mb-4">
                      Create competitive live quizzes and challenge your peers in real-time!
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/quiz-arena/create"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg"
                      >
                        <Swords className="w-5 h-5" />
                        Create Quiz
                      </Link>
                      <Link
                        href="/quiz-arena/join"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border-2 border-white/30"
                      >
                        <Users className="w-5 h-5" />
                        Join Quiz
                      </Link>
                      <Link
                        href="/quiz-arena"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border-2 border-white/30"
                      >
                        <Gamepad2 className="w-5 h-5" />
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">5+</div>
                  <div className="text-sm text-white/80">Selection Features</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">Real-time</div>
                  <div className="text-sm text-white/80">Multiplayer</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">800+</div>
                  <div className="text-sm text-white/80">Questions</div>
                </div>
              </div>
            </div>

            {/* Performance by Topic */}
            {userStats && userStats.topicPerformance.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                  Performance by Topic
                </h3>
                <div className="space-y-4">
                  {userStats.topicPerformance.map((topic, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-700">{topic.topicName}</span>
                        <span className="text-sm text-gray-600">
                          {topic.correctAnswers}/{topic.questionsAnswered} ({topic.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            topic.percentage >= 80
                              ? "bg-green-500"
                              : topic.percentage >= 60
                              ? "bg-blue-500"
                              : topic.percentage >= 40
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${topic.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Data State */}
            {!loading && !error && overallStats.totalQuestions === 0 && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 mb-8 text-center">
                <Target className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Start Your Learning Journey!</h3>
                <p className="text-gray-600 mb-6">
                  You haven't attempted any questions yet. Begin practicing to see your progress here.
                </p>
                <Link
                  href="/practice"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Start Practicing
                </Link>
              </div>
            )}

            {/* Evidence Library - Quick Access */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md p-8 mb-8 border-2 border-indigo-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <Library className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Evidence Library</h3>
                    <p className="text-gray-600">Review landmark trials & guidelines before your exams</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                    30 References Available
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Emergency Guidelines */}
                <Link
                  href="/emergency-references"
                  className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-red-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                      <FileText className="w-5 h-5 text-red-600" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Emergency Medicine</h4>
                  <p className="text-sm text-gray-600 mb-3">ACLS, PALS, Sepsis, Stroke, Trauma, ARDS protocols</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-red-600">23 Guidelines & Trials</span>
                    <span className="text-xs text-gray-500">2020-2025</span>
                  </div>
                </Link>

                {/* OB/GYN Guidelines */}
                <Link
                  href="/obgyn-references"
                  className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-pink-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                      <FileText className="w-5 h-5 text-pink-600" />
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-pink-600 transition-colors" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">OB/GYN Medicine</h4>
                  <p className="text-sm text-gray-600 mb-3">Prenatal, labor, postpartum, gynecologic emergencies</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-pink-600">7 ACOG Guidelines</span>
                    <span className="text-xs text-gray-500">2018-2024</span>
                  </div>
                </Link>

                {/* Coming Soon - More Libraries */}
                <div className="bg-white p-5 rounded-lg shadow-sm border-2 border-dashed border-gray-300 opacity-60">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-700 mb-2">More Topics</h4>
                  <p className="text-sm text-gray-500 mb-3">Additional evidence libraries coming soon</p>
                  <span className="text-xs font-semibold text-gray-400">Coming Soon</span>
                </div>
              </div>

              {/* Why Use Evidence Library */}
              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-indigo-200">
                <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Award className="w-4 h-4 text-indigo-600 mr-2" />
                  Why Review Evidence Before Exams?
                </h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>
                      Understand the <strong>evidence basis</strong> behind clinical decisions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>
                      Learn <strong>NNT calculations</strong> and statistical significance
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>
                      Review <strong>landmark trials</strong> cited in guidelines
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span>
                      Access <strong>clinical pearls</strong> from top journals
                    </span>
                  </li>
                </ul>
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
                        Your weakest topic is <strong>{overallStats.weakestTopic.topicName}</strong>. Consider spending
                        more time on practice questions in this area.
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
                        Don&apos;t skip the detailed explanations - they&apos;re key to understanding the concepts
                        behind each question.
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
                      <li>• Focus on {overallStats.weakestTopic.topicName}</li>
                      <li>• Take 2 full-length timed exams</li>
                      <li>• Review incorrect answers</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Quick Actions</h4>
                    <div className="space-y-2">
                      <Link
                        href="/quiz-arena/create"
                        className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <Swords className="w-4 h-4" />
                        Create Live Quiz
                      </Link>
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
          </>
        )}
      </div>
    </div>
  );
}
