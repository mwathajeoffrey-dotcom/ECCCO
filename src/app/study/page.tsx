'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { 
  Brain, 
  Calendar, 
  TrendingUp, 
  Target, 
  Flame,
  Clock,
  Award,
  ChevronRight
} from 'lucide-react';

interface StudyStats {
  totalReviews: number;
  todayReviews: number;
  weekReviews: number;
  averageGrade: number;
  streak: number;
  dueCount: number;
  activityByDay: Array<{ date: string; count: number }>;
}

interface ReviewItem {
  id: string;
  questionId: string;
  notes: string | null;
  category: string | null;
  nextReviewDate: Date | null;
  reviewCount: number;
  interval: number;
  priority: number;
}

export default function StudyPage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [stats, setStats] = useState<StudyStats | null>(null);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn && user) {
      fetchData();
    }
  }, [isSignedIn, user]);

  const fetchData = async () => {
    if (!user) return;

    try {
      // Fetch stats and review queue in parallel
      const [statsRes, queueRes] = await Promise.all([
        fetch(`/api/study/stats?userId=${user.id}`),
        fetch(`/api/study/queue?userId=${user.id}&limit=10`)
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }

      if (queueRes.ok) {
        const queueData = await queueRes.json();
        setReviews(queueData.reviews);
      }
    } catch (error) {
      console.error('Error fetching study data:', error);
    } finally {
      setLoading(false);
    }
  };

  const startReview = () => {
    if (reviews.length > 0) {
      // Navigate to first question in review queue
      router.push(`/practice/question/${reviews[0].questionId}?review=true`);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <Brain className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in to Study
          </h2>
          <p className="text-gray-600">
            Track your progress and use spaced repetition to master exam questions.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your study data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Brain className="w-10 h-10 text-blue-600" />
            Study Dashboard
          </h1>
          <p className="text-gray-600">
            Powered by spaced repetition to optimize your learning
          </p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Due Reviews */}
            <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 opacity-80" />
                <span className="text-3xl font-bold">{stats.dueCount}</span>
              </div>
              <p className="text-sm opacity-90">Due for Review</p>
            </div>

            {/* Study Streak */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Flame className="w-8 h-8 opacity-80" />
                <span className="text-3xl font-bold">{stats.streak}</span>
              </div>
              <p className="text-sm opacity-90">Day Streak 🔥</p>
            </div>

            {/* Today's Reviews */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 opacity-80" />
                <span className="text-3xl font-bold">{stats.todayReviews}</span>
              </div>
              <p className="text-sm opacity-90">Reviews Today</p>
            </div>

            {/* Average Grade */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 opacity-80" />
                <span className="text-3xl font-bold">{stats.averageGrade.toFixed(1)}</span>
              </div>
              <p className="text-sm opacity-90">Avg Grade (0-5)</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Review Queue */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-blue-600" />
                  Review Queue
                </h2>
                {reviews.length > 0 && (
                  <button
                    onClick={startReview}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 font-semibold"
                  >
                    Start Reviewing
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <Award className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    All Caught Up! 🎉
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You have no reviews due right now. Great job!
                  </p>
                  <button
                    onClick={() => router.push('/practice')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Practice More Questions
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {reviews.map((review, index) => (
                    <div
                      key={review.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                      onClick={() => router.push(`/practice/question/${review.questionId}?review=true`)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-blue-600">
                              #{index + 1}
                            </span>
                            {review.category && (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                {review.category}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Question ID: {review.questionId}
                          </p>
                          {review.notes && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              📝 {review.notes}
                            </p>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-xs text-gray-500">
                            Reviewed {review.reviewCount}x
                          </p>
                          <p className="text-xs text-gray-500">
                            Interval: {review.interval}d
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Activity & Insights */}
          <div className="space-y-6">
            {/* Weekly Activity */}
            {stats && stats.activityByDay && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Weekly Activity
                </h3>
                <div className="flex items-end justify-between gap-2 h-32">
                  {stats.activityByDay.map((day, index) => {
                    const maxCount = Math.max(...stats.activityByDay.map(d => d.count), 1);
                    const height = (day.count / maxCount) * 100;
                    const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
                    
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center gap-1">
                        <div className="relative flex-1 w-full flex items-end">
                          <div
                            className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                            style={{ height: `${height}%`, minHeight: day.count > 0 ? '8px' : '0' }}
                            title={`${day.count} reviews`}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{dayName}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Learning Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Reviews</span>
                  <span className="font-semibold text-gray-900">{stats?.totalReviews || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-semibold text-gray-900">{stats?.weekReviews || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Grade</span>
                  <span className="font-semibold text-gray-900">
                    {stats?.averageGrade.toFixed(1) || '0.0'} / 5.0
                  </span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">💡 Study Tip</h3>
              <p className="text-sm opacity-90">
                Review daily to maintain your streak! The algorithm optimizes your learning by showing questions when you're about to forget them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
