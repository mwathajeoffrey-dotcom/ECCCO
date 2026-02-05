"use client";

import { BarChart3, TrendingUp, Users, FileText, Clock, Target } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Platform-wide statistics and insights</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">2,547</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+12.5%</span>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>
              </div>
              <Users className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Questions Answered</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">45,892</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+8.3%</span>
                  <span className="text-xs text-gray-500">vs last week</span>
                </div>
              </div>
              <FileText className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Exams Completed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">1,234</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+15.2%</span>
                  <span className="text-xs text-gray-500">vs last week</span>
                </div>
              </div>
              <Target className="w-12 h-12 text-purple-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Study Time</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">2.4h</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+5.7%</span>
                  <span className="text-xs text-gray-500">vs last week</span>
                </div>
              </div>
              <Clock className="w-12 h-12 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Activity Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Activity</h2>
              <select className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Chart visualization placeholder</p>
              </div>
            </div>
          </div>

          {/* Question Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Question Performance</h2>
              <select className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white">
                <option>All Categories</option>
                <option>Cardiology</option>
                <option>Neurology</option>
              </select>
            </div>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Chart visualization placeholder</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Top Performers This Week</h2>
          <div className="space-y-3">
            {[
              { name: "Sarah Johnson", score: "98%", questions: 245 },
              { name: "Michael Chen", score: "97%", questions: 223 },
              { name: "Emma Davis", score: "96%", questions: 198 },
              { name: "James Wilson", score: "95%", questions: 187 },
              { name: "Olivia Brown", score: "94%", questions: 176 },
            ].map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                    ${index === 0 ? "bg-yellow-500 text-white" : ""}
                    ${index === 1 ? "bg-gray-400 text-white" : ""}
                    ${index === 2 ? "bg-orange-600 text-white" : ""}
                    ${index > 2 ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400" : ""}
                  `}
                  >
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.questions} questions completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{user.score}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">accuracy</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
