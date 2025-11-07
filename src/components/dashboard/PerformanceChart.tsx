/**
 * Real-time Performance Chart Component
 * Shows user progress over time with interactive charts
 */

'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, Award, Target } from 'lucide-react';

interface PerformanceChartProps {
  data: Array<{
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
}

export function PerformanceChart({ data, recentActivity }: PerformanceChartProps) {
  const [activeChart, setActiveChart] = useState<'bar' | 'line' | 'pie'>('bar');

  // Prepare data for different chart types
  const barData = data.map(item => ({
    name: item.topicName.length > 15 ? item.topicName.substring(0, 12) + '...' : item.topicName,
    score: item.averageScore,
    attempted: item.attempted,
    correct: item.correct
  }));

  const lineData = recentActivity
    .filter(activity => activity.completed && activity.score !== null)
    .slice(-10)
    .reverse()
    .map((activity, index) => ({
      session: index + 1,
      score: activity.score,
      topic: activity.topicName.length > 10 ? activity.topicName.substring(0, 8) + '...' : activity.topicName,
      date: new Date(activity.createdAt).toLocaleDateString()
    }));

  const pieData = data.slice(0, 5).map(item => ({
    name: item.topicName.length > 15 ? item.topicName.substring(0, 12) + '...' : item.topicName,
    value: item.attempted,
    percentage: item.averageScore
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Performance Analytics
        </h3>
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveChart('bar')}
            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeChart === 'bar'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Scores
          </button>
          <button
            onClick={() => setActiveChart('line')}
            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeChart === 'line'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Trend
          </button>
          <button
            onClick={() => setActiveChart('pie')}
            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeChart === 'pie'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Distribution
          </button>
        </div>
      </div>

      <div className="h-48 sm:h-64">
        {activeChart === 'bar' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                fontSize={10} 
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis fontSize={10} />
              <Tooltip 
                formatter={(value, name) => [
                  `${value}${name === 'score' ? '%' : ''}`,
                  name === 'score' ? 'Score' : name === 'attempted' ? 'Attempted' : 'Correct'
                ]}
              />
              <Bar dataKey="score" fill="#3B82F6" name="score" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeChart === 'line' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="session" fontSize={10} />
              <YAxis domain={[0, 100]} fontSize={10} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Score']}
                labelFormatter={(label) => `Session ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {activeChart === 'pie' && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => window.innerWidth > 640 ? `${name}: ${percentage}%` : `${percentage}%`}
                outerRadius={window.innerWidth > 640 ? 80 : 60}
                fill="#8884d8"
                dataKey="value"
                fontSize={10}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} questions`, 'Attempted']} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

/**
 * Dashboard Statistics Summary Component
 */
export function StatsSummary({ overallStats }: { 
  overallStats: {
    totalQuestions: number;
    averageScore: number;
    learningStreak: number;
    studyTimeHours: number;
  }
}) {
  const stats = [
    {
      icon: Target,
      label: 'Total Questions',
      value: overallStats.totalQuestions.toLocaleString(),
      color: 'blue',
      change: '+12% this week'
    },
    {
      icon: Award,
      label: 'Average Score',
      value: `${overallStats.averageScore}%`,
      color: 'green',
      change: overallStats.averageScore >= 75 ? 'Excellent!' : overallStats.averageScore >= 60 ? 'Good progress' : 'Keep practicing'
    },
    {
      icon: Calendar,
      label: 'Learning Streak',
      value: `${overallStats.learningStreak} days`,
      color: 'purple',
      change: overallStats.learningStreak > 0 ? 'Keep it up!' : 'Start your streak today'
    },
    {
      icon: TrendingUp,
      label: 'Study Time',
      value: `${overallStats.studyTimeHours}h`,
      color: 'orange',
      change: 'Time invested in learning'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 font-medium truncate">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1 truncate">{stat.change}</p>
              </div>
              <div className={`p-2 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]} flex-shrink-0`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}