/**
 * Skeleton Loader Components
 * Provides better perceived performance while content loads
 * Replaces loading spinners with content-aware skeletons
 */

import React from 'react';

interface SkeletonProps {
  className?: string;
}

/**
 * Base Skeleton component
 */
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      role="status"
      aria-label="Loading..."
    />
  );
}

/**
 * Text line skeleton
 */
export function SkeletonText({ className = '', lines = 3 }: SkeletonProps & { lines?: number }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} 
        />
      ))}
    </div>
  );
}

/**
 * Card skeleton for content cards
 */
export function SkeletonCard({ className = '' }: SkeletonProps) {
  return (
    <div className={`border rounded-lg p-6 ${className}`}>
      <Skeleton className="h-6 w-3/4 mb-4" />
      <SkeletonText lines={3} />
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}

/**
 * Question skeleton for quiz interface
 */
export function SkeletonQuestion({ className = '' }: SkeletonProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Question text */}
      <div>
        <Skeleton className="h-5 w-24 mb-3" />
        <SkeletonText lines={4} />
      </div>
      
      {/* Answer options */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-3 p-4 border rounded-lg">
            <Skeleton className="h-5 w-5 rounded-full flex-shrink-0 mt-0.5" />
            <SkeletonText lines={2} className="flex-1" />
          </div>
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-3">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}

/**
 * Table skeleton
 */
export function SkeletonTable({ 
  rows = 5, 
  columns = 4, 
  className = '' 
}: SkeletonProps & { rows?: number; columns?: number }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      <div className="flex gap-4 pb-3 border-b">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-full" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-6 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Dashboard stats skeleton
 */
export function SkeletonStats({ count = 4, className = '' }: SkeletonProps & { count?: number }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border rounded-lg p-6">
          <Skeleton className="h-4 w-20 mb-3" />
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  );
}

/**
 * Avatar skeleton
 */
export function SkeletonAvatar({ size = 'md', className = '' }: SkeletonProps & { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };
  
  return <Skeleton className={`${sizeClasses[size]} rounded-full ${className}`} />;
}

/**
 * Evidence search result skeleton
 */
export function SkeletonEvidenceResult({ className = '' }: SkeletonProps) {
  return (
    <div className={`border-l-4 border-gray-200 bg-white p-6 rounded-lg shadow-sm ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-16" />
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      
      <SkeletonText lines={3} className="mb-4" />
      
      <div className="flex items-center gap-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  );
}

/**
 * List skeleton
 */
export function SkeletonList({ 
  items = 5, 
  className = '' 
}: SkeletonProps & { items?: number }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          <Skeleton className="h-12 w-12 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}

/**
 * Chart skeleton
 */
export function SkeletonChart({ className = '' }: SkeletonProps) {
  return (
    <div className={`border rounded-lg p-6 ${className}`}>
      <Skeleton className="h-6 w-48 mb-6" />
      <div className="flex items-end justify-between gap-2 h-64">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton 
            key={i} 
            className="w-full" 
            style={{ height: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Full page skeleton for dashboard
 */
export function SkeletonDashboard({ className = '' }: SkeletonProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>
      
      <SkeletonStats count={4} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonChart />
        <SkeletonChart />
      </div>
      
      <SkeletonTable rows={10} columns={5} />
    </div>
  );
}

export default Skeleton;
