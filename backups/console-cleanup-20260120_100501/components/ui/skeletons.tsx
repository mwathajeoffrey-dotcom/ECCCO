import React from "react";

// Base Skeleton Component
interface SkeletonProps {
  className?: string;
  variant?: "rectangular" | "circular" | "text";
  animation?: "pulse" | "wave" | "none";
  style?: React.CSSProperties;
}

export function Skeleton({ className = "", variant = "rectangular", animation = "pulse", style }: SkeletonProps) {
  const baseClasses = "bg-gray-200 dark:bg-gray-700";

  const variantClasses = {
    rectangular: "rounded-md",
    circular: "rounded-full",
    text: "rounded h-4",
  };

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-shimmer",
    none: "",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

// Question Skeleton (for practice/quiz questions)
export function QuestionSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md" role="status" aria-label="Loading question">
      {/* Question Number */}
      <Skeleton className="h-6 w-32 mb-4" />

      {/* Question Text */}
      <div className="space-y-2 mb-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="flex gap-4 justify-between">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

// Quiz Card Skeleton (for quiz sessions list)
export function QuizCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md" role="status" aria-label="Loading quiz">
      <Skeleton className="h-6 w-48 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />

      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
      </div>

      <Skeleton className="h-10 w-full" />
    </div>
  );
}

// Dashboard Stats Skeleton (4-grid stats display)
export function DashboardStatsSkeleton() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      role="status"
      aria-label="Loading dashboard statistics"
    >
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-start justify-between mb-4">
            <Skeleton className="h-12 w-12" variant="circular" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-8 w-20 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
      ))}
    </div>
  );
}

// Leaderboard Skeleton
interface LeaderboardSkeletonProps {
  rows?: number;
}

export function LeaderboardSkeleton({ rows = 10 }: LeaderboardSkeletonProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      role="status"
      aria-label="Loading leaderboard"
    >
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700">
        <Skeleton className="h-6 w-48" />
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-4">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-10 w-10" variant="circular" />
            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Topic Card Skeleton
export function TopicCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md" role="status" aria-label="Loading topic">
      <Skeleton className="h-10 w-10 mb-4" variant="circular" />
      <Skeleton className="h-6 w-40 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}

// Topic Grid Skeleton
interface TopicGridSkeletonProps {
  count?: number;
}

export function TopicGridSkeleton({ count = 12 }: TopicGridSkeletonProps) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="status"
      aria-label="Loading topics"
    >
      {Array.from({ length: count }).map((_, i) => (
        <TopicCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Bookmark List Skeleton
interface BookmarkListSkeletonProps {
  count?: number;
}

export function BookmarkListSkeleton({ count = 5 }: BookmarkListSkeletonProps) {
  return (
    <div className="space-y-4" role="status" aria-label="Loading bookmarks">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <Skeleton className="h-5 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <Skeleton className="h-10 w-10" variant="circular" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Generic Table Skeleton
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 10, columns = 5 }: TableSkeletonProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      role="status"
      aria-label="Loading table"
    >
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-5 flex-1" />
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex gap-4">
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton key={j} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Generic List Skeleton
interface ListSkeletonProps {
  items?: number;
}

export function ListSkeleton({ items = 5 }: ListSkeletonProps) {
  return (
    <div className="space-y-3" role="status" aria-label="Loading list">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <Skeleton className="h-5 w-2/3 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}

// Participant List Skeleton (for quiz participants)
interface ParticipantListSkeletonProps {
  count?: number;
}

export function ParticipantListSkeleton({ count = 8 }: ParticipantListSkeletonProps) {
  return (
    <div className="space-y-2" role="status" aria-label="Loading participants">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
          <Skeleton className="h-10 w-10" variant="circular" />
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-6 w-12" />
        </div>
      ))}
    </div>
  );
}

// Chart Skeleton
interface ChartSkeletonProps {
  height?: string;
}

export function ChartSkeleton({ height = "h-64" }: ChartSkeletonProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md" role="status" aria-label="Loading chart">
      <Skeleton className="h-6 w-48 mb-6" />
      <div className={`${height} flex items-end gap-2 mb-4`}>
        {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
          <Skeleton key={i} className="flex-1" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="flex gap-4 justify-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

// Page Skeleton (full page layout)
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6" role="status" aria-label="Loading page">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-6 w-96" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        <DashboardStatsSkeleton />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    </div>
  );
}

// Loading Message (for screen readers)
export function LoadingMessage({ message = "Loading content, please wait..." }: { message?: string }) {
  return (
    <div role="status" aria-live="polite" className="sr-only">
      {message}
    </div>
  );
}
