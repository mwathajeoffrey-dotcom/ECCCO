"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { logger } from "@/lib/logger";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Activity,
  TrendingUp,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  ChevronLeft,
  Wifi,
  RefreshCw,
  Eye,
  UserCheck,
  Radio,
  Zap,
  FileText,
  Mail,
} from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  activeToday: number;
  totalQuestions: number;
  totalReferences: number;
  quizzesCompleted: number;
  feedbackMessages: number;
  systemHealth: "healthy" | "warning" | "error";
  recentUsers?: number;
  recentActivity?: number;
  avgQuestionsPerUser?: number;
  onlineUsers?: number;
  activeNow?: number;
}

interface RecentActivity {
  id: string;
  type: "quiz" | "exam" | "question" | "signup";
  userEmail: string;
  timestamp: Date;
  details?: string;
}

interface DashboardData {
  stats: DashboardStats;
  growth?: {
    usersByDay: Array<{ date: Date; count: number }>;
  };
  activity?: {
    topQuestions: Array<{ questionId: string; attempts: number }>;
  };
  recentActivity?: RecentActivity[];
  onlineUsers?: number;
}

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeToday: 0,
    totalQuestions: 0,
    totalReferences: 0,
    quizzesCompleted: 0,
    feedbackMessages: 0,
    systemHealth: "healthy",
    recentUsers: 0,
    recentActivity: 0,
    avgQuestionsPerUser: 0,
    onlineUsers: 0,
    activeNow: 0,
  });

  const fetchDashboardStats = useCallback(async (isAutoRefresh = false) => {
    try {
      if (!isAutoRefresh) {
        setIsRefreshing(true);
      }

      const response = await fetch("/api/admin/dashboard");

      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.statusText}`);
      }

      const data: DashboardData = await response.json();

      setStats(data.stats);
      setOnlineUsers(data.onlineUsers || 0);
      setRecentActivity(data.recentActivity || []);
      setLastUpdate(new Date());

      logger.info("Dashboard stats loaded", {
        totalUsers: data.stats.totalUsers,
        activeToday: data.stats.activeToday,
        systemHealth: data.stats.systemHealth,
        onlineUsers: data.onlineUsers,
      });
    } catch (err) {
      logger.error("Failed to fetch stats:", err instanceof Error ? err : new Error(String(err)));
      setStats((prev) => ({ ...prev, systemHealth: "error" }));
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch("/api/admin/check");
        const data = await response.json();

        if (!data.isAdmin) {
          window.location.href = "/?error=unauthorized";
          return;
        }

        setIsAdmin(true);
        await fetchDashboardStats();

        // Start auto-refresh every 30 seconds
        const interval = setInterval(() => {
          fetchDashboardStats(true);
        }, 30000);

        return () => clearInterval(interval);
      } catch (err) {
        logger.error("Admin check failed:", err instanceof Error ? err : new Error(String(err)));
        window.location.href = "/login?redirect=/admin/dashboard";
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [fetchDashboardStats]);

  const handleManualRefresh = () => {
    fetchDashboardStats(false);
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "quiz":
        return <BarChart3 className="w-4 h-4" />;
      case "exam":
        return <FileText className="w-4 h-4" />;
      case "question":
        return <BookOpen className="w-4 h-4" />;
      case "signup":
        return <UserCheck className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">ECCCO Platform Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Real-time indicator */}
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-200">
                <div className="relative">
                  <Radio className="w-4 h-4 text-green-600" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                </div>
                <span className="text-sm font-medium text-green-700">Live</span>
              </div>

              {/* Last updated */}
              <div className="text-sm text-gray-500">Updated {formatTimeAgo(lastUpdate)}</div>

              {/* Manual refresh button */}
              <button
                onClick={handleManualRefresh}
                disabled={isRefreshing}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh dashboard"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 ${isRefreshing ? "animate-spin" : ""}`} />
              </button>

              <Link href="/admin/users" className="text-gray-700 hover:text-blue-600 font-medium">
                Users ({stats.totalUsers})
              </Link>
              <Link href="/admin/feedback" className="text-gray-700 hover:text-blue-600 font-medium">
                Feedback
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Health Alert */}
        {stats.systemHealth !== "healthy" && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              stats.systemHealth === "error" ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"
            }`}
          >
            <div className="flex items-start space-x-3">
              <AlertCircle
                className={`w-5 h-5 mt-0.5 ${stats.systemHealth === "error" ? "text-red-600" : "text-yellow-600"}`}
              />
              <div>
                <h3 className={`font-semibold ${stats.systemHealth === "error" ? "text-red-900" : "text-yellow-900"}`}>
                  System Status: {stats.systemHealth === "error" ? "Attention Required" : "Warning"}
                </h3>
                <p className={`text-sm mt-1 ${stats.systemHealth === "error" ? "text-red-700" : "text-yellow-700"}`}>
                  Last checked: {formatTimeAgo(lastUpdate)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Real-time Stats - Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Online Users - Real-time */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Wifi className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-xs font-medium uppercase">Live</span>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium opacity-90">Online Now</h3>
              <p className="text-4xl font-bold">{onlineUsers}</p>
              <p className="text-sm opacity-75">Active users</p>
            </div>
          </div>

          {/* Active Today */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  stats.activeToday > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                }`}
              >
                {stats.activeToday > 0 ? "+" + stats.activeToday : stats.activeToday}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-600">Active Today</h3>
              <p className="text-4xl font-bold text-gray-900">{stats.activeToday}</p>
              <p className="text-sm text-gray-500">Last 24 hours</p>
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
                +{stats.recentUsers || 0} this week
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
              <p className="text-4xl font-bold text-gray-900">{stats.totalUsers}</p>
              <p className="text-sm text-gray-500">Registered accounts</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <div className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-semibold">Last hour</div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-600">Recent Activity</h3>
              <p className="text-4xl font-bold text-gray-900">{stats.recentActivity || 0}</p>
              <p className="text-sm text-gray-500">Actions taken</p>
            </div>
          </div>
        </div>

        {/* Content Stats - Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Questions</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalQuestions.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">In question bank</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Quizzes</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.quizzesCompleted.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Total completions</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">References</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalReferences.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Evidence articles</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Feedback</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.feedbackMessages.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">User messages</p>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span>Live Activity Feed</span>
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">Real-time</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              {recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.slice(0, 10).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{activity.userEmail}</p>
                        <p className="text-sm text-gray-600">{activity.details || `Completed ${activity.type}`}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No recent activity</p>
                  <p className="text-sm mt-1">Activity will appear here in real-time</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Performance Metrics</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Avg Questions/User</span>
                    <span className="font-semibold text-gray-900">{stats.avgQuestionsPerUser || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min(((stats.avgQuestionsPerUser || 0) / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">User Engagement Rate</span>
                    <span className="font-semibold text-gray-900">
                      {stats.totalUsers > 0 ? Math.round((stats.activeToday / stats.totalUsers) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${stats.totalUsers > 0 ? (stats.activeToday / stats.totalUsers) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/admin/users"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center group"
                >
                  <Users className="w-6 h-6 mx-auto mb-2 text-gray-600 group-hover:text-blue-600" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Manage Users</span>
                </Link>

                <Link
                  href="/admin/feedback"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-center group"
                >
                  <MessageSquare className="w-6 h-6 mx-auto mb-2 text-gray-600 group-hover:text-green-600" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">View Feedback</span>
                </Link>

                <Link
                  href="/admin/evidence"
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-center group"
                >
                  <BookOpen className="w-6 h-6 mx-auto mb-2 text-gray-600 group-hover:text-purple-600" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">Evidence</span>
                </Link>

                <button
                  onClick={handleManualRefresh}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all text-center group"
                >
                  <RefreshCw className="w-6 h-6 mx-auto mb-2 text-gray-600 group-hover:text-orange-600" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Refresh</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="mt-6 bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <CheckCircle
              className={`w-5 h-5 ${
                stats.systemHealth === "healthy"
                  ? "text-green-600"
                  : stats.systemHealth === "warning"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            />
            <span>System Health</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-900">Database</p>
              <p className="text-2xl font-bold text-green-700">Operational</p>
              <p className="text-xs text-green-600 mt-1">All connections healthy</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-900">API</p>
              <p className="text-2xl font-bold text-blue-700">Active</p>
              <p className="text-xs text-blue-600 mt-1">Response time &lt; 200ms</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm font-medium text-purple-900">Authentication</p>
              <p className="text-2xl font-bold text-purple-700">Secure</p>
              <p className="text-xs text-purple-600 mt-1">Clerk integration active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
