"use client";
import { logger } from '@/lib/logger';

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Users,
  Search,
  Filter,
  Download,
  Mail,
  Activity,
  TrendingUp,
  TrendingDown,
  Calendar,
  Award,
  BarChart3,
  RefreshCw,
  UserCheck,
  UserX,
  Shield,
  Code,
  ExternalLink,
} from "lucide-react";

interface UserStats {
  totalQuizzes: number;
  totalExams: number;
  totalQuestions: number;
  accuracy: number;
  passedExams: number;
  examPassRate: number;
}

interface User {
  id: string;
  clerkUserId: string;
  email: string;
  createdAt: string;
  lastActive: string;
  isActive: boolean;
  stats: UserStats;
}

interface UserSummary {
  totalUsers: number;
  activeUsers: number;
  totalQuizAttempts: number;
  totalExamAttempts: number;
}

export default function UserManagement() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [summary, setSummary] = useState<UserSummary>({
    totalUsers: 0,
    activeUsers: 0,
    totalQuizAttempts: 0,
    totalExamAttempts: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState<"all" | "active" | "inactive">("all");
  const [sortBy, setSortBy] = useState<"recent" | "name" | "activity">("recent");

  useEffect(() => {
    checkAdminAndLoadUsers();
  }, []);

  const checkAdminAndLoadUsers = async () => {
    try {
      // Check admin status
      const response = await fetch("/api/admin/check");
      const data = await response.json();

      if (!data.isAdmin) {
        window.location.href = "/?error=unauthorized";
        return;
      }

      setIsAdmin(true);
      await loadUsers();
    } catch (err) {
      logger.error("Admin check failed:", err);
      window.location.href = "/login?redirect=/admin/users";
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users");
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
        setSummary(data.summary);
      }
    } catch (err) {
      logger.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users
    .filter((user) => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return user.email.toLowerCase().includes(query) || user.clerkUserId.toLowerCase().includes(query);
      }
      return true;
    })
    .filter((user) => {
      // Filter by activity status
      if (filterActive === "active") return user.isActive;
      if (filterActive === "inactive") return !user.isActive;
      return true;
    })
    .sort((a, b) => {
      // Sort users
      if (sortBy === "recent") {
        return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
      }
      if (sortBy === "name") {
        return a.email.localeCompare(b.email);
      }
      if (sortBy === "activity") {
        return b.stats.totalQuestions - a.stats.totalQuestions;
      }
      return 0;
    });

  const exportUsers = () => {
    const csvContent = [
      [
        "Email",
        "User ID",
        "Created",
        "Last Active",
        "Total Quizzes",
        "Total Questions",
        "Accuracy %",
        "Exam Pass Rate %",
      ],
      ...filteredUsers.map((user) => [
        user.email,
        user.clerkUserId,
        new Date(user.createdAt).toLocaleDateString(),
        new Date(user.lastActive).toLocaleDateString(),
        user.stats.totalQuizzes.toString(),
        user.stats.totalQuestions.toString(),
        user.stats.accuracy.toString(),
        user.stats.examPassRate.toString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eccco-users-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getActivityBadge = (user: User) => {
    if (!user.isActive) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full flex items-center">
          <UserX className="w-3 h-3 mr-1" />
          Inactive
        </span>
      );
    }

    if (user.stats.totalQuestions > 100) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full flex items-center">
          <TrendingUp className="w-3 h-3 mr-1" />
          Highly Active
        </span>
      );
    }

    return (
      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full flex items-center">
        <UserCheck className="w-3 h-3 mr-1" />
        Active
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
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
              <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-700 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-sm text-gray-600">Manage platform users and permissions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadUsers}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={exportUsers}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{summary.totalUsers}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Users</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{summary.activeUsers}</h3>
            <p className="text-gray-600 text-sm mt-1">Active Users (7 days)</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{summary.totalQuizAttempts}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Quiz Attempts</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{summary.totalExamAttempts}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Exam Attempts</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by email or user ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterActive}
                  onChange={(e) => setFilterActive(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Users</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="name">Name (A-Z)</option>
                <option value="activity">Most Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.email}</div>
                          <div className="text-xs text-gray-500">{user.clerkUserId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getActivityBadge(user)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.stats.totalQuestions} questions</div>
                      <div className="text-xs text-gray-500">
                        {user.stats.totalQuizzes} quizzes, {user.stats.totalExams} exams
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.stats.accuracy}% accuracy</div>
                      <div className="text-xs text-gray-500">{user.stats.examPassRate}% exam pass rate</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">
                        Last active: {new Date(user.lastActive).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3" title="View details">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 mr-3" title="Make admin">
                        <Shield className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Make developer">
                        <Code className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No users found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
