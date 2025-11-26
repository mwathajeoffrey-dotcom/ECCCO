'use client';

import { useState } from 'react';
import { X, Sparkles, BookOpen, TrendingUp } from 'lucide-react';

export default function NewFeatureBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                New Release • November 2025
              </span>
            </div>
            
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              🎉 OB/GYN Content Doubled: 480 Questions Now Available!
            </h3>
            
            <div className="space-y-2 text-sm sm:text-base">
              <p className="font-medium">
                We've added <span className="text-yellow-300 font-bold">240 new medical comorbidity questions</span> with 2024-2025 evidence-based guidelines!
              </p>
              
              <div className="flex flex-wrap gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm">16 comprehensive topics</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm">8 new high-risk pregnancy topics</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/20">
                <p className="text-xs sm:text-sm opacity-90">
                  <span className="font-semibold">New Topics:</span> Cardiac Disease, Diabetes, Hypertensive Disorders, Thromboembolism, 
                  Infectious Disease, Renal Disease, Thyroid Disorders, Hematologic Disorders
                </p>
              </div>

              <div className="flex gap-3 mt-4">
                <a
                  href="/exam?filter=new"
                  className="inline-flex items-center px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold text-sm hover:bg-yellow-50 transition-colors shadow-md"
                >
                  Try New Questions →
                </a>
                <a
                  href="/obgyn-references"
                  className="inline-flex items-center gap-1 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg font-medium text-sm hover:bg-white/20 transition-colors border border-white/30"
                >
                  <BookOpen className="w-4 h-4" />
                  View Guidelines & References
                </a>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
            aria-label="Dismiss announcement"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
