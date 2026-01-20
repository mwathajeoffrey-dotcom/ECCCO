"use client";
import { logger } from '@/lib/logger';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  Bookmark,
  FileText,
  Trash2,
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  StickyNote,
  BookmarkCheck,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { ERROR_MESSAGES, SUCCESS_MESSAGES, getErrorFromFetch } from "@/lib/error-messages";

interface BookmarkData {
  questionId: string;
  category: string;
  notes?: string;
  createdAt: string;
}

export default function BookmarksPage() {
  const { isSignedIn, user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "with-notes" | "no-notes">("all");

  // Fetch bookmarks on component mount
  useEffect(() => {
    if (isSignedIn) {
      fetchBookmarks();
    } else {
      setLoading(false);
    }
  }, [isSignedIn]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bookmarks?userId=${user?.id}`);

      if (!response.ok) {
        const errorMsg = ERROR_MESSAGES.LOAD_FAILED;
        toast.error(errorMsg.title, { description: errorMsg.message });
        throw new Error("Failed to fetch bookmarks");
      }

      const data = await response.json();
      logger.debug("📚 Fetched bookmarks:", data);
      if (data.success && data.bookmarks) {
        setBookmarks(data.bookmarks);
      }
    } catch (error) {
      logger.error("Failed to fetch bookmarks:", error);
      const errorMsg = getErrorFromFetch(error);
      toast.error(errorMsg.title, { description: errorMsg.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (questionId: string) => {
    try {
      const response = await fetch("/api/bookmarks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, userId: user?.id }),
      });

      if (response.ok) {
        setBookmarks(bookmarks.filter((b) => b.questionId !== questionId));
        toast.success(SUCCESS_MESSAGES.BOOKMARK_REMOVED);
      } else {
        const errorMsg = ERROR_MESSAGES.DELETE_FAILED;
        toast.error(errorMsg.title, { description: errorMsg.message });
      }
    } catch (error) {
      logger.error("Failed to delete bookmark:", error);
      const errorMsg = getErrorFromFetch(error);
      toast.error(errorMsg.title, { description: errorMsg.message });
    }
  };

  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      bookmark.questionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.notes?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "all" || (filter === "with-notes" && bookmark.notes) || (filter === "no-notes" && !bookmark.notes);

    return matchesSearch && matchesFilter;
  });

  // Show sign-in prompt if not signed in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to view your bookmarked questions and notes.</p>
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Bookmarks</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {bookmarks.length} saved {bookmarks.length === 1 ? "question" : "questions"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[250px] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookmarks by question ID, category, or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                All ({bookmarks.length})
              </button>
              <button
                onClick={() => setFilter("with-notes")}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  filter === "with-notes"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                With Notes ({bookmarks.filter((b) => b.notes).length})
              </button>
              <button
                onClick={() => setFilter("no-notes")}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  filter === "no-notes"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                No Notes ({bookmarks.filter((b) => !b.notes).length})
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}

        {/* Bookmarks List */}
        {!loading && filteredBookmarks.length > 0 && (
          <div className="space-y-4">
            {filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark.questionId}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <BookmarkCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Question ID: {bookmark.questionId}
                      </h3>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded">
                        {bookmark.category}
                      </span>
                    </div>

                    {bookmark.notes && (
                      <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <StickyNote className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <span className="text-sm font-medium text-amber-900 dark:text-amber-200">Your Notes:</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{bookmark.notes}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Saved {new Date(bookmark.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/practice/${bookmark.category.toLowerCase()}?questionId=${bookmark.questionId}`}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="View Question"
                    >
                      <FileText className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(bookmark.questionId)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredBookmarks.length === 0 && bookmarks.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Bookmarks Yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Start bookmarking questions while practicing to save them for later review. You can also add personal
              notes to each bookmark!
            </p>
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="w-5 h-5" />
              Start Practicing
            </Link>
          </div>
        )}

        {/* No Results State */}
        {!loading && filteredBookmarks.length === 0 && bookmarks.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Matching Bookmarks</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filter settings</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilter("all");
              }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
