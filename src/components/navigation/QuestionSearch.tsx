'use client';

import { logger } from '@/lib/logger';

import { useState, useEffect, useRef } from 'react';
import { Search, FileText, Tag, ChevronRight, Loader2, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Question {
  id: string;
  text: string;
  topic?: string;
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface QuestionSearchProps {
  onSelect?: () => void; // Callback to close sidebar on mobile
}

export default function QuestionSearch({ onSelect }: QuestionSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/questions?limit=100');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        logger.debug('📊 API Response:', data);
        
        // The API returns 'questions' not 'data'
        const questionsList = data.questions || [];
        if (data.success && Array.isArray(questionsList)) {
          setQuestions(questionsList);
          
          // Extract unique topics/categories
          const topicsSet = new Set<string>();
          questionsList.forEach((q: Question) => {
            if (q.topic) topicsSet.add(q.topic);
            if (q.category) topicsSet.add(q.category);
          });
          const topics = Array.from(topicsSet).sort();
          logger.debug('📚 Extracted topics:', topics.length, topics);
          setAvailableTopics(topics);
        }
      } catch (error) {
        logger.error('Error fetching questions:', error);
        // Keep empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredQuestions([]);
      setIsOpen(false);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    const searchLower = searchQuery.toLowerCase();
    
    const filtered = questions.filter(
      (q) =>
        q.text.toLowerCase().includes(searchLower) ||
        q.category?.toLowerCase().includes(searchLower) ||
        q.topic?.toLowerCase().includes(searchLower)
    );

    setFilteredQuestions(filtered.slice(0, 8)); // Limit to 8 results
    setIsOpen(filtered.length > 0);
  }, [searchQuery, questions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowTopics(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuestionSelect = (questionId: string) => {
    router.push(`/practice?question=${questionId}`);
    setSearchQuery('');
    setIsOpen(false);
    setShowTopics(false);
    onSelect?.(); // Close sidebar on mobile
  };

  const handleTopicSelect = (topic: string) => {
    setSearchQuery(topic);
    setShowTopics(false);
    setHasSearched(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'hard':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input with Topics Button */}
      <div className="space-y-2">
        <div className="relative">
          {isLoading && !hasSearched ? (
            <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400 animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          )}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (filteredQuestions.length > 0) setIsOpen(true);
            }}
            placeholder="Search questions..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>

        {/* Browse Topics Button */}
        <button
          onClick={() => setShowTopics(!showTopics)}
          className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <span className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-500" />
            Browse Topics ({availableTopics.length})
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showTopics ? 'rotate-180' : ''}`} />
        </button>

        {/* Topics Dropdown */}
        {showTopics && (
          <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            <div className="p-2 space-y-1">
              {availableTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleTopicSelect(topic)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && filteredQuestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {filteredQuestions.length} Questions Found
            </div>
            <div className="space-y-1">
              {filteredQuestions.map((question) => (
                <button
                  key={question.id}
                  onClick={() => handleQuestionSelect(question.id)}
                  className="w-full text-left px-3 py-3 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-700">
                        {question.text}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {question.topic && (
                          <>
                            <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                              <Tag className="w-3 h-3" />
                              {question.topic}
                            </span>
                            <span className="text-gray-300">•</span>
                          </>
                        )}
                        <span className="text-xs text-gray-500">{question.category}</span>
                        {question.difficulty && (
                          <>
                            <span className="text-gray-300">•</span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${getDifficultyColor(
                                question.difficulty
                              )}`}
                            >
                              {question.difficulty}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>

            {/* See All Results */}
            <div className="mt-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  router.push(`/practice?search=${encodeURIComponent(searchQuery)}`);
                  setSearchQuery('');
                  setIsOpen(false);
                  onSelect?.();
                }}
                className="w-full px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-center"
              >
                See all results for "{searchQuery}"
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {hasSearched && searchQuery && filteredQuestions.length === 0 && !isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
          <div className="text-center">
            <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 mb-1">No questions found</p>
            <p className="text-xs text-gray-500">
              Try different keywords like "sepsis", "ACLS", "airway", etc.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
