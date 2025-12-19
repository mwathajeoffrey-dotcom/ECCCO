'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { getTypeIcon, getTypeColor, SearchResult } from '@/lib/search';

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save recent searches
  const saveRecentSearch = (searchQuery: string) => {
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Keyboard shortcut to open search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle arrow navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelectResult(results[selectedIndex]);
    }
  };

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
          setSelectedIndex(0);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelectResult = (result: SearchResult) => {
    saveRecentSearch(query);
    setIsOpen(false);
    setQuery('');
    router.push(result.url);
  };

  const handleRecentSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
      >
        <Search className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
          <span>⌘</span>K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search questions, evidence, guidelines, cases..."
              className="flex-1 text-lg outline-none"
            />
            {loading && (
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-lg flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Results or Recent Searches */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim() === '' && recentSearches.length > 0 ? (
              /* Recent Searches */
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <h3 className="text-sm font-semibold text-gray-700">Recent Searches</h3>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearch(search)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : query.trim() !== '' && results.length === 0 && !loading ? (
              /* No Results */
              <div className="p-8 text-center">
                <p className="text-gray-500 mb-2">No results found for &quot;{query}&quot;</p>
                <p className="text-sm text-gray-400">
                  Try different keywords or check your spelling
                </p>
              </div>
            ) : results.length > 0 ? (
              /* Search Results */
              <div className="p-2">
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelectResult(result)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      index === selectedIndex
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{getTypeIcon(result.type)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {result.title}
                          </h4>
                          {result.category && (
                            <span className={`text-xs px-2 py-0.5 rounded ${getTypeColor(result.type)} flex-shrink-0`}>
                              {result.category}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {result.description}
                        </p>
                      </div>
                      <ArrowRight className={`w-5 h-5 flex-shrink-0 ${
                        index === selectedIndex ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">Enter</kbd>
                  <span>Select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">Esc</kbd>
                  <span>Close</span>
                </span>
              </div>
              {results.length > 0 && (
                <span>{results.length} results</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
