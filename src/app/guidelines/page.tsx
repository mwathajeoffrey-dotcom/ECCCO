"use client";
import { logger } from '@/lib/logger';

import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  Bookmark,
  BookmarkCheck,
  Star,
  FileText,
  Calendar,
  Users,
  Grid,
  List,
  ExternalLink,
  WifiOff,
  AlertTriangle,
  BookOpen,
  CheckCircle,
  Shield,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import guidelinesService, { MedicalGuideline, GuidelineCategory } from "@/lib/guidelines/service";

// Force dynamic rendering - don't try to statically generate
export const dynamic = "force-dynamic";

export default function GuidelinesPage() {
  const [guidelines, setGuidelines] = useState<MedicalGuideline[]>([]);
  const [categories, setCategories] = useState<GuidelineCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize data
    setCategories(guidelinesService.getCategories());
    setGuidelines(guidelinesService.searchGuidelines(""));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Filter guidelines based on search and filters
    const filtered = guidelinesService.searchGuidelines(searchQuery, {
      category: selectedCategory || undefined,
      difficulty: selectedDifficulty || undefined,
    });
    setGuidelines(filtered);
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const handleBookmark = async (guidelineId: string) => {
    const userId = "current-user"; // In real app, get from auth
    const isCurrentlyBookmarked = guidelinesService.isBookmarked(userId, guidelineId);

    if (isCurrentlyBookmarked) {
      await guidelinesService.removeBookmark(userId, guidelineId);
    } else {
      await guidelinesService.bookmarkGuideline(userId, guidelineId);
    }

    // Refresh guidelines to update bookmark status
    const updated = guidelinesService.searchGuidelines(searchQuery, {
      category: selectedCategory || undefined,
      difficulty: selectedDifficulty || undefined,
    });
    setGuidelines(updated);
  };

  const handleDownload = async (guideline: MedicalGuideline) => {
    await guidelinesService.trackAccess(guideline.id);
    // In a real app, this would trigger PDF download
    window.open(`/guidelines/viewer/${guideline.id}`, "_blank");
  };

  const featuredGuidelines = guidelinesService.getFeaturedGuidelines(3);
  const recentlyUpdated = guidelinesService.getRecentlyUpdated(3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Medical Guidelines Library</h1>
                <p className="text-gray-600 mt-1">Evidence-based clinical protocols and references</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {viewMode === "grid" ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search guidelines, organizations, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {showFilters && (
              <div className="flex flex-wrap gap-4 lg:w-96">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Levels</option>
                  <option value="basic">Basic</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Featured Guidelines */}
        {!searchQuery && !selectedCategory && !selectedDifficulty && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Guidelines</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredGuidelines.map((guideline) => (
                <div
                  key={guideline.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium`}
                        style={{ backgroundColor: `${guideline.category.color}20`, color: guideline.category.color }}
                      >
                        <span className="mr-1">{guideline.category.icon}</span>
                        {guideline.category.name}
                      </span>
                      <button onClick={() => handleBookmark(guideline.id)} className="p-1 hover:bg-gray-100 rounded">
                        {guideline.bookmarked ? (
                          <BookmarkCheck className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Bookmark className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{guideline.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{guideline.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{guideline.organization}</span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {guideline.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guidelines Grid/List */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery || selectedCategory || selectedDifficulty ? "Search Results" : "All Guidelines"}
            <span className="text-lg font-normal text-gray-500 ml-2">({guidelines.length})</span>
          </h2>

          {guidelines.length > 0 && (
            <div className="text-sm text-gray-500">
              Showing {guidelines.length} of {guidelinesService.searchGuidelines("").length} guidelines
            </div>
          )}
        </div>

        {guidelines.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No guidelines found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {guidelines.map((guideline) => (
              <GuidelineCard
                key={guideline.id}
                guideline={guideline}
                viewMode={viewMode}
                onBookmark={() => handleBookmark(guideline.id)}
                onDownload={() => handleDownload(guideline)}
              />
            ))}
          </div>
        )}

        {/* Recently Updated */}
        {!searchQuery && !selectedCategory && !selectedDifficulty && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Updated</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {recentlyUpdated.map((guideline) => (
                <div key={guideline.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center mb-3">
                    <Calendar className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-green-600 font-medium">
                      Updated {new Date(guideline.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{guideline.title}</h3>
                  <p className="text-gray-600 text-sm">{guideline.organization}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GuidelineCard({
  guideline,
  viewMode,
  onBookmark,
  onDownload,
}: {
  guideline: MedicalGuideline;
  viewMode: "grid" | "list";
  onBookmark: () => void;
  onDownload: () => void;
}) {
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-3`}
                style={{ backgroundColor: `${guideline.category.color}20`, color: guideline.category.color }}
              >
                <span className="mr-1">{guideline.category.icon}</span>
                {guideline.category.name}
              </span>

              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  guideline.difficulty === "basic"
                    ? "bg-green-100 text-green-800"
                    : guideline.difficulty === "intermediate"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {guideline.difficulty}
              </span>

              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                Level {guideline.evidenceLevel}
              </span>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">{guideline.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{guideline.description}</p>

            <div className="flex items-center text-sm text-gray-500 space-x-6">
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {guideline.organization}
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(guideline.publicationDate).getFullYear()}
              </span>
              <span className="flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                {guideline.pageCount} pages
              </span>
              <span className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                {guideline.downloadCount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-6">
            <div className="flex items-center text-sm text-gray-500">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              {guideline.rating}
            </div>

            {guideline.offline && <WifiOff className="h-4 w-4 text-green-500" />}

            <button onClick={onBookmark} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              {guideline.bookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-blue-600" />
              ) : (
                <Bookmark className="h-5 w-5 text-gray-400" />
              )}
            </button>

            <button
              onClick={onDownload}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium`}
            style={{ backgroundColor: `${guideline.category.color}20`, color: guideline.category.color }}
          >
            <span className="mr-1">{guideline.category.icon}</span>
            {guideline.category.name}
          </span>

          <div className="flex items-center space-x-1">
            {guideline.offline && <WifiOff className="h-4 w-4 text-green-500" />}
            <button onClick={onBookmark} className="p-1 hover:bg-gray-100 rounded">
              {guideline.bookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-blue-600" />
              ) : (
                <Bookmark className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{guideline.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{guideline.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{guideline.organization}</span>
          <span className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            {guideline.rating}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                guideline.difficulty === "basic"
                  ? "bg-green-100 text-green-800"
                  : guideline.difficulty === "intermediate"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {guideline.difficulty}
            </span>
            <span className="text-xs text-gray-500">{guideline.pageCount} pages</span>
          </div>

          <button
            onClick={onDownload}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            View PDF
          </button>
        </div>
      </div>
    </div>
  );
}

interface GuidelineReport {
  totalQuestions: number;
  questionsWithOutdatedRefs: number;
  criticalUpdatesNeeded: number;
  moderateUpdatesNeeded: number;
  minorUpdatesNeeded: number;
  topicBreakdown: Record<string, number>;
  recommendations: string[];
  lastChecked: Date;
}

interface OutdatedQuestion {
  id: string;
  topicId: string;
  question: string;
  currentReference: string;
  suggestedUpdate: string;
  severity: "critical" | "moderate" | "minor";
  ageInYears: number;
}

export function GuidelineManagementPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<GuidelineReport | null>(null);
  const [outdatedQuestions, setOutdatedQuestions] = useState<OutdatedQuestion[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<"all" | "critical" | "moderate" | "minor">("all");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const loadGuidelineData = useCallback(async () => {
    try {
      // Mock data - in real implementation, this would call your guideline monitoring API
      const mockReport: GuidelineReport = {
        totalQuestions: 2850,
        questionsWithOutdatedRefs: 247,
        criticalUpdatesNeeded: 23,
        moderateUpdatesNeeded: 89,
        minorUpdatesNeeded: 135,
        topicBreakdown: {
          "cardiac-emergencies": 45,
          "respiratory-emergencies": 38,
          "mechanical-ventilation": 32,
          "trauma-management": 28,
          "sepsis-management": 24,
          "neurological-emergencies": 22,
          toxicology: 18,
          procedures: 15,
          "pharmacology-emergencies": 12,
          "renal-emergencies": 8,
        },
        recommendations: [
          "🚨 URGENT: 23 questions have critically outdated references (>5+ years old)",
          "⚠️ MODERATE: 89 questions need updates for recent guideline changes",
          "📋 MINOR: 135 questions could benefit from newer references",
          '🎯 Focus on "cardiac-emergencies" topic: 45 questions need updates',
          '🎯 Focus on "respiratory-emergencies" topic: 38 questions need updates',
        ],
        lastChecked: new Date(),
      };

      const mockOutdatedQuestions: OutdatedQuestion[] = [
        {
          id: "card-001",
          topicId: "cardiac-emergencies",
          question: "According to heart failure guidelines, what is the first-line treatment?",
          currentReference: "Yancy CW, et al. 2022 AHA/ACC/HFSA Guideline for Heart Failure",
          suggestedUpdate: "AHA/ACC Heart Failure Guidelines 2024",
          severity: "critical",
          ageInYears: 12,
        },
        {
          id: "resp-015",
          topicId: "respiratory-emergencies",
          question: "What is the recommended PEEP strategy for ARDS?",
          currentReference: "Petrucci N, De Feo C. Cochrane Database Syst Rev 2013",
          suggestedUpdate: "ARDSNet Guidelines 2024",
          severity: "moderate",
          ageInYears: 12,
        },
      ];

      setReport(mockReport);
      setOutdatedQuestions(mockOutdatedQuestions);
    } catch (error) {
      logger.error("Error loading guideline data:", error);
    }
  }, []);

  const checkAuthentication = useCallback(async () => {
    try {
      // Check if user has developer access via server-side API
      const response = await fetch("/api/auth/check-developer");
      const data = await response.json();

      setIsAuthenticated(data.isDeveloper);

      if (data.isDeveloper) {
        await loadGuidelineData();
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const handleAuthentication = async () => {
    setAuthError("");
    // Removed hardcoded password - now uses proper role-based authentication
    setAuthError("Please sign in with a developer account to access this page");
  };

  const refreshGuidelines = async () => {
    setLoading(true);
    await loadGuidelineData();
    setLoading(false);
  };

  const exportReport = () => {
    if (!report) return;

    const reportData = {
      generatedAt: new Date().toISOString(),
      summary: report,
      outdatedQuestions: filteredQuestions,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eccco-guideline-report-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50";
      case "moderate":
        return "text-yellow-600 bg-yellow-50";
      case "minor":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="w-4 h-4" />;
      case "moderate":
        return <Calendar className="w-4 h-4" />;
      case "minor":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const filteredQuestions = outdatedQuestions.filter(
    (q) => selectedSeverity === "all" || q.severity === selectedSeverity
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading guideline management...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Guideline Management</h2>
            <p className="text-gray-600 mt-2">Developer access required for guideline administration</p>
          </div>

          {authError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{authError}</div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Access Code</label>
              <input
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAuthentication()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter developer access code"
              />
            </div>

            <button
              onClick={handleAuthentication}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Access Guidelines
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link href="/analytics" className="text-blue-600 hover:text-blue-700 text-sm mr-4">
              ← Analytics Dashboard
            </Link>
            <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm">
              Home
            </Link>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
              <strong>Dev Mode:</strong> Sign in with a developer account to access this page.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Guideline Management</h1>
              <p className="text-gray-600">Monitor and update medical guideline currency across ECCCO platform</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={refreshGuidelines}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>

              <button
                onClick={exportReport}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        {report && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Questions</p>
                    <p className="text-2xl font-bold text-gray-900">{report.totalQuestions.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Critical Updates</p>
                    <p className="text-2xl font-bold text-red-600">{report.criticalUpdatesNeeded}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Moderate Updates</p>
                    <p className="text-2xl font-bold text-yellow-600">{report.moderateUpdatesNeeded}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Minor Updates</p>
                    <p className="text-2xl font-bold text-blue-600">{report.minorUpdatesNeeded}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recommendations</h2>
              <div className="space-y-3">
                {report.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg mr-3">{rec.charAt(0)}</div>
                    <p className="text-gray-700">{rec.substring(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Outdated Questions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Outdated Questions</h2>
                <div className="flex space-x-2">
                  {["all", "critical", "moderate", "minor"].map((severity) => (
                    <button
                      key={severity}
                      onClick={() => setSelectedSeverity(severity as "all" | "critical" | "moderate" | "minor")}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedSeverity === severity
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {severity.charAt(0).toUpperCase() + severity.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Question
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Topic
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Severity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Reference
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Suggested Update
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredQuestions.map((question, index) => (
                      <tr key={question.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">{question.question}</div>
                          <div className="text-xs text-gray-500">ID: {question.id}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{question.topicId.replace(/-/g, " ")}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(
                              question.severity
                            )}`}
                          >
                            {getSeverityIcon(question.severity)}
                            <span className="ml-1">{question.severity}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                          <div className="truncate">{question.currentReference}</div>
                          <div className="text-xs text-gray-400">Age: {question.ageInYears} years</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-600 max-w-xs truncate">
                          {question.suggestedUpdate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
