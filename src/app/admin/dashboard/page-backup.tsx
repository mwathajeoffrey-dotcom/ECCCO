"use client";

import { useState, useEffect, useRef } from "react";
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
  Settings,
  Database,
  Zap,
  FileText,
  Mail,
  ChevronLeft,
  Wifi,
  RefreshCw,
  Eye,
  UserCheck,
  Radio,
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
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
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

  useEffect(() => {
    checkAdminStatus();
    
    // Cleanup interval on unmount
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

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
      refreshIntervalRef.current = setInterval(() => {
        fetchDashboardStats(true);
      }, 30000);
    } catch (err) {
      logger.error("Admin check failed:", err instanceof Error ? err : new Error(String(err)));
      window.location.href = "/login?redirect=/admin/dashboard";
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async (isAutoRefresh = false) => {
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
      });
    } catch (err) {
      logger.error("Failed to fetch stats:", err instanceof Error ? err : new Error(String(err)));
      // Set fallback stats in case of error
      setStats({
        totalUsers: 0,
        activeToday: 0,
        totalQuestions: 0,
        totalReferences: 0,
        quizzesCompleted: 0,
        feedbackMessages: 0,
        systemHealth: "error",
        recentUsers: 0,
        recentActivity: 0,
        avgQuestionsPerUser: 0,
      });
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
              <Link href="/admin/users" className="text-gray-700 hover:text-blue-600 font-medium">
                Users ({stats.totalUsers})
              </Link>
              <Link href="/admin/evidence" className="text-gray-700 hover:text-blue-600 font-medium">
                Manage Evidence
              </Link>
              <Link href="/admin/feedback" className="text-gray-700 hover:text-blue-600 font-medium">
                Feedback ({stats.feedbackMessages})
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Health Banner */}
        <div
          className={`rounded-lg p-4 mb-8 ${
            stats.systemHealth === "healthy"
              ? "bg-green-50 border border-green-200"
              : stats.systemHealth === "warning"
              ? "bg-yellow-50 border border-yellow-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="flex items-center">
            {stats.systemHealth === "healthy" ? (
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            ) : stats.systemHealth === "warning" ? (
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-3" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            )}
            <div>
              <p
                className={`font-semibold ${
                  stats.systemHealth === "healthy"
                    ? "text-green-900"
                    : stats.systemHealth === "warning"
                    ? "text-yellow-900"
                    : "text-red-900"
                }`}
              >
                System Status: {stats.systemHealth === "healthy" ? "All Systems Operational" : "Attention Required"}
              </p>
              <p
                className={`text-sm ${
                  stats.systemHealth === "healthy"
                    ? "text-green-700"
                    : stats.systemHealth === "warning"
                    ? "text-yellow-700"
                    : "text-red-700"
                }`}
              >
                Last checked: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+{stats.recentUsers || 0} this week</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Users</p>
            <p className="text-gray-500 text-xs mt-2">{stats.activeToday} active today</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-blue-600 font-medium">{stats.avgQuestionsPerUser || 0}/user avg</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{stats.totalQuestions.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm mt-1">Practice Questions</p>
            <p className="text-gray-500 text-xs mt-2">Available in database</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-sm text-blue-600 font-medium">Evidence-based</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{stats.totalReferences.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm mt-1">Evidence References</p>
            <p className="text-gray-500 text-xs mt-2">Published & curated</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+89 today</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{stats.quizzesCompleted}</h3>
            <p className="text-gray-600 text-sm mt-1">Quizzes Completed</p>
            <p className="text-gray-500 text-xs mt-2">All time total</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-blue-600" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/admin/evidence"
                className="flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Manage Evidence</span>
              </Link>
              <Link
                href="/admin/feedback"
                className="flex items-center justify-center space-x-2 bg-purple-50 hover:bg-purple-100 text-purple-700 px-4 py-3 rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">View Feedback</span>
              </Link>
              <button
                onClick={() => (window.location.href = "/api/admin/export")}
                className="flex items-center justify-center space-x-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-3 rounded-lg transition-colors"
              >
                <Database className="w-4 h-4" />
                <span className="text-sm font-medium">Export Data</span>
              </button>
              <Link
                href="/admin/settings"
                className="flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
              Recent Feedback
              {stats.feedbackMessages > 0 && (
                <span className="ml-2 bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                  {stats.feedbackMessages} new
                </span>
              )}
            </h3>
            <div className="space-y-3">
              {stats.feedbackMessages > 0 ? (
                <>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium">New feature request</p>
                      <p className="text-xs text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <Link
                    href="/admin/feedback"
                    className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All Feedback →
                  </Link>
                </>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No new feedback</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-600" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New user registration</p>
                <p className="text-xs text-gray-600">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Quiz completed by user</p>
                <p className="text-xs text-gray-600">12 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New evidence reference added</p>
                <p className="text-xs text-gray-600">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
