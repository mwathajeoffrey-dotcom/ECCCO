# 🛠️ UX Implementation Guide - Code Examples

**Companion to:** UX_IMPROVEMENT_ROADMAP.md  
**Focus:** Practical code snippets for implementing improvements

---

## 1. 🏠 ENHANCED DASHBOARD - "Continue Learning" Section

### **Component: ContinueLearning.tsx**

```typescript
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Clock, BookOpen, TrendingUp } from 'lucide-react';

interface InProgressSession {
  id: string;
  type: 'quiz' | 'exam' | 'reading';
  title: string;
  progress: number; // 0-100
  currentQuestion?: number;
  totalQuestions?: number;
  lastAccessed: Date;
  href: string;
}

export default function ContinueLearning() {
  const [sessions, setSessions] = useState<InProgressSession[]>([]);

  useEffect(() => {
    // Fetch from localStorage or API
    const savedSessions = localStorage.getItem('inProgressSessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  if (sessions.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Play className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Ready to Start Learning?
        </h3>
        <p className="text-gray-600 mb-6">
          Begin a quiz or exam and it'll appear here for quick access
        </p>
        <Link
          href="/practice"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          <Play className="w-5 h-5" />
          Start Practice
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Play className="w-6 h-6 text-blue-600" />
        Pick Up Where You Left Off
      </h2>
      
      <div className="grid gap-4">
        {sessions.map((session) => (
          <motion.div
            key={session.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-md border-2 border-transparent hover:border-blue-500 transition-all"
          >
            <Link href={session.href}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {session.type === 'quiz' && <BookOpen className="w-6 h-6 text-blue-600" />}
                    {session.type === 'exam' && <TrendingUp className="w-6 h-6 text-blue-600" />}
                    {session.type === 'reading' && <BookOpen className="w-6 h-6 text-blue-600" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{session.title}</h3>
                    <p className="text-sm text-gray-600">
                      {session.currentQuestion && session.totalQuestions
                        ? `Question ${session.currentQuestion} of ${session.totalQuestions}`
                        : `${session.progress}% complete`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {getTimeAgo(session.lastAccessed)}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${session.progress}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
```

---

## 2. 🔥 STUDY STREAKS COMPONENT

### **Component: StudyStreak.tsx**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Calendar, Trophy, Target } from 'lucide-react';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: Date;
  weeklyActivity: boolean[]; // Last 7 days
}

export default function StudyStreak() {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: new Date(),
    weeklyActivity: [false, false, false, false, false, false, false]
  });

  useEffect(() => {
    // Fetch from API/localStorage
    const savedStreak = localStorage.getItem('studyStreak');
    if (savedStreak) {
      setStreakData(JSON.parse(savedStreak));
    }
  }, []);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const canRecoverStreak = streakData.currentStreak > 0 && !isToday(streakData.lastStudyDate);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center"
          >
            <Flame className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <h3 className="text-3xl font-black text-gray-900">
              {streakData.currentStreak} Day{streakData.currentStreak !== 1 ? 's' : ''}
            </h3>
            <p className="text-sm text-gray-600">Current Streak</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2 text-gray-600">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-lg font-bold">{streakData.longestStreak}</span>
          </div>
          <p className="text-xs text-gray-500">Best Streak</p>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Last 7 Days</p>
        <div className="grid grid-cols-7 gap-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => {
            const isActive = streakData.weeklyActivity[index];
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-semibold ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-400 border-2 border-gray-200'
                }`}
              >
                <span>{day}</span>
                {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full mt-1" />}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Streak Recovery */}
      {canRecoverStreak && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-3 text-sm"
        >
          <p className="font-semibold text-yellow-800 mb-2">
            ⚠️ Your streak is at risk!
          </p>
          <p className="text-yellow-700 mb-3">
            Study today to keep your {streakData.currentStreak}-day streak alive, or use a streak freeze.
          </p>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold text-xs hover:bg-yellow-600 transition-colors">
            Use Streak Freeze (1 remaining)
          </button>
        </motion.div>
      )}

      {/* Next Milestone */}
      <div className="mt-4 pt-4 border-t border-orange-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Next milestone: {getNextMilestone(streakData.currentStreak)} days
          </span>
          <span className="font-bold text-orange-600">
            {getNextMilestone(streakData.currentStreak) - streakData.currentStreak} to go
          </span>
        </div>
      </div>
    </div>
  );
}

function getNextMilestone(current: number): number {
  const milestones = [7, 14, 30, 60, 100, 365];
  return milestones.find(m => m > current) || 365;
}
```

---

## 3. 🔍 GLOBAL SEARCH BAR

### **Component: GlobalSearch.tsx**

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, FileText, Activity, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: string;
  type: 'question' | 'guideline' | 'trial' | 'flowchart';
  title: string;
  subtitle?: string;
  href: string;
}

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search API call (debounced)
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Search error:', error);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      router.push(results[selectedIndex].href);
      setIsOpen(false);
      setQuery('');
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'question': return BookOpen;
      case 'guideline': return FileText;
      case 'trial': return Activity;
      case 'flowchart': return Activity;
      default: return Search;
    }
  };

  return (
    <>
      {/* Search Button/Input */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 w-full max-w-md px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-left"
      >
        <Search className="w-5 h-5 text-gray-400" />
        <span className="text-gray-500">Search questions, trials, guidelines...</span>
        <kbd className="ml-auto px-2 py-1 bg-white rounded text-xs font-semibold text-gray-600 border border-gray-300">
          ⌘K
        </kbd>
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Search Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                <Search className="w-6 h-6 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search across all content..."
                  className="flex-1 text-lg outline-none"
                  autoFocus
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {results.length === 0 && query.length >= 2 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No results found for &quot;{query}&quot;</p>
                  </div>
                ) : (
                  results.map((result, index) => {
                    const Icon = getIcon(result.type);
                    const isSelected = index === selectedIndex;

                    return (
                      <motion.button
                        key={result.id}
                        onClick={() => {
                          router.push(result.href);
                          setIsOpen(false);
                          setQuery('');
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center gap-4 p-4 transition-colors ${
                          isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          result.type === 'question' ? 'bg-blue-100' :
                          result.type === 'guideline' ? 'bg-green-100' :
                          result.type === 'trial' ? 'bg-purple-100' :
                          'bg-orange-100'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-gray-900">{result.title}</p>
                          {result.subtitle && (
                            <p className="text-sm text-gray-600">{result.subtitle}</p>
                          )}
                        </div>

                        {isSelected && <ArrowRight className="w-5 h-5 text-blue-600" />}
                      </motion.button>
                    );
                  })
                )}
              </div>

              {/* Footer Hints */}
              <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white rounded border border-gray-300">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white rounded border border-gray-300">Enter</kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white rounded border border-gray-300">Esc</kbd>
                  Close
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## 4. 🏆 ACHIEVEMENTS SYSTEM

### **Component: AchievementBadge.tsx**

```typescript
'use client';

import { motion } from 'framer-motion';
import { Award, Lock } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number; // 0-100 for locked achievements
}

interface AchievementBadgeProps {
  achievement: Achievement;
  onClick?: () => void;
}

export default function AchievementBadge({ achievement, onClick }: AchievementBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
      whileTap={{ scale: achievement.unlocked ? 0.95 : 1 }}
      onClick={onClick}
      className={`relative p-6 rounded-2xl cursor-pointer transition-all ${
        achievement.unlocked
          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 shadow-lg'
          : 'bg-gray-50 border-2 border-gray-200 opacity-60'
      }`}
    >
      {/* Badge Icon */}
      <div className="flex justify-center mb-4">
        <div
          className={`relative w-20 h-20 rounded-full flex items-center justify-center text-4xl ${
            achievement.unlocked
              ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-xl'
              : 'bg-gray-300'
          }`}
        >
          {achievement.unlocked ? (
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.6 }}
            >
              {achievement.icon}
            </motion.span>
          ) : (
            <Lock className="w-8 h-8 text-gray-500" />
          )}
        </div>

        {/* Sparkles for unlocked */}
        {achievement.unlocked && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * Math.PI) / 4) * 40,
                  y: Math.sin((i * Math.PI) / 4) * 40,
                }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            ))}
          </>
        )}
      </div>

      {/* Title & Description */}
      <h3 className={`text-lg font-bold text-center mb-2 ${
        achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
      }`}>
        {achievement.title}
      </h3>
      <p className={`text-sm text-center ${
        achievement.unlocked ? 'text-gray-700' : 'text-gray-400'
      }`}>
        {achievement.description}
      </p>

      {/* Progress Bar for Locked */}
      {!achievement.unlocked && achievement.progress !== undefined && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300"
              style={{ width: `${achievement.progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-1">
            {achievement.progress}% complete
          </p>
        </div>
      )}

      {/* Unlock Date */}
      {achievement.unlocked && achievement.unlockedAt && (
        <p className="text-xs text-gray-500 text-center mt-3">
          Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
        </p>
      )}
    </motion.div>
  );
}

// Usage in page:
export function AchievementsGrid() {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first quiz',
      icon: '🎯',
      unlocked: true,
      unlockedAt: new Date('2026-01-01'),
    },
    {
      id: '2',
      title: 'Perfectionist',
      description: 'Score 100% on any quiz',
      icon: '💯',
      unlocked: false,
      progress: 75,
    },
    {
      id: '3',
      title: 'Marathon Runner',
      description: 'Complete a 50-question exam',
      icon: '🏃',
      unlocked: true,
      unlockedAt: new Date('2026-01-02'),
    },
    // ... more achievements
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map((achievement) => (
        <AchievementBadge key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
}
```

---

## 5. 📱 MOBILE BOTTOM NAVIGATION

### **Component: MobileBottomNav.tsx**

```typescript
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, BookOpen, Library, BarChart3, User } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/practice', icon: BookOpen, label: 'Practice' },
  { href: '/emergency-references', icon: Library, label: 'Library' },
  { href: '/learning-analytics', icon: BarChart3, label: 'Stats' },
  { href: '/dashboard', icon: User, label: 'Me' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-40 safe-area-bottom">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center gap-1"
            >
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-full"
                />
              )}

              {/* Icon */}
              <Icon
                className={`w-6 h-6 transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}
              />

              {/* Label */}
              <span
                className={`text-xs font-medium transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// Add to layout.tsx:
// <MobileBottomNav />
// And add padding to main content: pb-20 lg:pb-0
```

---

## 6. 🎯 PERSONALIZED RECOMMENDATIONS

### **Component: PersonalizedRecommendations.tsx**

```typescript
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingDown, Target, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Recommendation {
  id: string;
  type: 'weak_area' | 'suggested_quiz' | 'new_content';
  title: string;
  description: string;
  href: string;
  priority: number;
  icon: string;
}

export default function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    // Fetch recommendations based on user performance
    async function fetchRecommendations() {
      try {
        const response = await fetch('/api/recommendations');
        const data = await response.json();
        setRecommendations(data.recommendations || []);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    }

    fetchRecommendations();
  }, []);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-yellow-500" />
        Recommended For You
      </h2>

      <div className="grid gap-4">
        {recommendations.map((rec, index) => {
          const IconComponent = 
            rec.type === 'weak_area' ? TrendingDown :
            rec.type === 'suggested_quiz' ? Target :
            Sparkles;

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={rec.href}>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{rec.icon}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                          {rec.type === 'weak_area' ? 'Needs Practice' :
                           rec.type === 'suggested_quiz' ? 'Suggested' :
                           'New Content'}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-gray-900 text-lg mb-1">
                        {rec.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {rec.description}
                      </p>
                    </div>

                    <ArrowRight className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
```

---

## 7. API ROUTE: Recommendations Logic

### **File: /api/recommendations/route.ts**

```typescript
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

export async function GET() {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch user's performance data
  // const userPerformance = await getUserPerformance(userId);

  // Mock data for demonstration
  const recommendations = [
    {
      id: '1',
      type: 'weak_area',
      title: 'Respiratory Management',
      description: 'Your average score is 68%. Practice 10 more questions to improve.',
      href: '/practice?topic=respiratory',
      priority: 1,
      icon: '🫁',
    },
    {
      id: '2',
      type: 'suggested_quiz',
      title: 'ACLS Cardiac Arrest Scenarios',
      description: 'Based on your progress, this quiz will help reinforce key concepts.',
      href: '/practice/acls?focus=cardiac-arrest',
      priority: 2,
      icon: '❤️',
    },
    {
      id: '3',
      type: 'new_content',
      title: '2025 ACLS Guidelines Update',
      description: 'New guidelines just added! Stay up to date with the latest protocols.',
      href: '/guidelines/acls-2025',
      priority: 3,
      icon: '📘',
    },
  ];

  return NextResponse.json({ recommendations });
}
```

---

## 🎨 STYLING TIPS

### **Consistent Design Tokens (tailwind.config.js)**

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Primary blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        success: {
          light: '#d1fae5',
          DEFAULT: '#10b981',
          dark: '#065f46',
        },
        warning: {
          light: '#fef3c7',
          DEFAULT: '#f59e0b',
          dark: '#92400e',
        },
        error: {
          light: '#fee2e2',
          DEFAULT: '#ef4444',
          dark: '#991b1b',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
};
```

---

**Next Steps:**
1. Copy these components into your project
2. Adjust styling to match your brand
3. Connect to your actual APIs
4. Test on mobile devices
5. Gather user feedback!

