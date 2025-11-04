'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Zap, Clock, Wifi, TrendingUp, Database } from 'lucide-react';
import { usePerformanceMonitor } from '@/lib/performance/monitor';
import { performanceCache } from '@/lib/performance/cache';

interface PerformanceStatsProps {
  className?: string;
  showDetailed?: boolean;
}

export function PerformanceStats({ className = '', showDetailed = false }: PerformanceStatsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [performanceData, setPerformanceData] = useState<any>(null);
  const { getPerformanceSummary, getPerformanceScore } = usePerformanceMonitor();

  useEffect(() => {
    const updatePerformanceData = () => {
      const summary = getPerformanceSummary();
      const score = getPerformanceScore();
      const cacheStats = performanceCache.getStats();
      
      setPerformanceData({
        score,
        summary,
        cache: cacheStats,
      });
    };

    updatePerformanceData();
    const interval = setInterval(updatePerformanceData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [getPerformanceSummary, getPerformanceScore]);

  if (!performanceData) return null;

  const { score, summary, cache } = performanceData;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-yellow-600 bg-yellow-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Performance Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`w-12 h-12 rounded-full shadow-lg transition-all duration-200 ${
          isVisible ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
        } border border-gray-200 flex items-center justify-center`}
        title={`Performance Score: ${score}`}
      >
        <Activity className="w-5 h-5" />
      </button>

      {/* Performance Panel */}
      {isVisible && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 space-y-4">
          {/* Performance Score */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Performance Score</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreColor(score)}`}>
              {score}/100
            </span>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            {/* Page Load */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-600">Load Time</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {summary.pageLoad.loadComplete 
                  ? formatTime(summary.pageLoad.loadComplete)
                  : 'N/A'
                }
              </span>
            </div>

            {/* API Response */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Wifi className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-600">API Avg</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {formatTime(summary.api.averageResponseTime || 0)}
              </span>
            </div>

            {/* Cache Hit Rate */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Database className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-600">Cache</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {Math.round((cache.hitRate || 0) * 100)}%
              </span>
            </div>

            {/* Memory Usage */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-600">Memory</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {summary.system?.memoryUsage 
                  ? `${Math.round(summary.system.memoryUsage * 100)}%`
                  : 'N/A'
                }
              </span>
            </div>
          </div>

          {/* Detailed Stats */}
          {showDetailed && (
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Detailed Metrics
              </h4>
              
              {/* Web Vitals */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">First Contentful Paint</span>
                  <span className="font-medium">
                    {summary.pageLoad.firstContentfulPaint 
                      ? formatTime(summary.pageLoad.firstContentfulPaint)
                      : 'N/A'
                    }
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Largest Contentful Paint</span>
                  <span className="font-medium">
                    {summary.pageLoad.largestContentfulPaint 
                      ? formatTime(summary.pageLoad.largestContentfulPaint)
                      : 'N/A'
                    }
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">First Input Delay</span>
                  <span className="font-medium">
                    {summary.pageLoad.firstInputDelay 
                      ? formatTime(summary.pageLoad.firstInputDelay)
                      : 'N/A'
                    }
                  </span>
                </div>
              </div>

              {/* API Stats */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">API Error Rate</span>
                  <span className="font-medium">
                    {Math.round((summary.api.errorRate || 0) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Slowest Endpoint</span>
                  <span className="font-medium text-right max-w-32 truncate">
                    {summary.api.slowestEndpoint || 'N/A'}
                  </span>
                </div>
              </div>

              {/* Cache Stats */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Cache Entries</span>
                  <span className="font-medium">{cache.entryCount || 0}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Cache Size</span>
                  <span className="font-medium">
                    {cache.totalSize 
                      ? `${Math.round(cache.totalSize / 1024)}KB`
                      : '0KB'
                    }
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Performance Tips */}
          {score < 75 && (
            <div className="border-t border-gray-200 pt-3">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-yellow-800">
                    <strong>Performance Tip:</strong> 
                    {score < 50 
                      ? ' Consider refreshing the page or checking your internet connection.'
                      : score < 65
                      ? ' Some features may load slowly. Cache is warming up.'
                      : ' Performance is good but could be optimized further.'
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface PerformanceBadgeProps {
  className?: string;
}

export function PerformanceBadge({ className = '' }: PerformanceBadgeProps) {
  const [score, setScore] = useState<number>(0);
  const { getPerformanceScore } = usePerformanceMonitor();

  useEffect(() => {
    const updateScore = () => {
      setScore(getPerformanceScore());
    };

    updateScore();
    const interval = setInterval(updateScore, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [getPerformanceScore]);

  if (score === 0) return null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className={`inline-flex items-center space-x-1 text-xs ${className}`}>
      <div className={`w-2 h-2 rounded-full ${getScoreColor(score)}`}></div>
      <span className="text-gray-600 font-medium">{score}</span>
    </div>
  );
}