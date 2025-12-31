'use client';

import { useState } from 'react';
import { Search, FileText, Download, ExternalLink, Filter, BookOpen, Heart, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

interface Guideline {
  id: string;
  source: 'nice' | 'who' | 'aha';
  title: string;
  summary: string;
  published: string;
  lastUpdated?: string;
  fullTextUrl: string;
  pdfUrl?: string;
  evidenceLevel?: string;
  recommendations?: string[];
  topics: string[];
  category?: string;
}

export default function GuidelinesSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedSources, setSelectedSources] = useState(['nice', 'who', 'aha']);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedGuideline, setExpandedGuideline] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const sourcesQuery = selectedSources.length > 0 ? `&sources=${selectedSources.join(',')}` : '';
      const response = await fetch(
        `/api/guidelines/search?q=${encodeURIComponent(query)}${sourcesQuery}&limit=30`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    }
    setLoading(false);
  };

  const toggleSource = (source: string) => {
    setSelectedSources(prev =>
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'nice': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'who': return 'bg-green-100 text-green-700 border-green-200';
      case 'aha': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'nice': return <BookOpen className="w-4 h-4" />;
      case 'who': return <Globe className="w-4 h-4" />;
      case 'aha': return <Heart className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Link 
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm"
          >
            ← Back to Dashboard
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <FileText className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Clinical Guidelines Search</h1>
              <p className="text-green-100 mt-2 text-lg">
                Search 1,500+ evidence-based guidelines from NICE, WHO, and AHA
              </p>
            </div>
          </div>
          
          {/* Source Badges */}
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              NICE (500+ UK guidelines)
            </span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm flex items-center gap-2">
              <Globe className="w-4 h-4" />
              WHO (1000+ international)
            </span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm flex items-center gap-2">
              <Heart className="w-4 h-4" />
              AHA (ACLS, BLS, PALS)
            </span>
            <span className="px-4 py-2 bg-green-500/30 backdrop-blur-sm rounded-full text-sm font-semibold">
              💰 100% FREE
            </span>
          </div>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search guidelines... (e.g., 'sepsis', 'ACLS', 'stroke', 'diabetes')"
                className="w-full pl-12 pr-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </span>
              ) : (
                'Search'
              )}
            </button>
          </div>
          
          {/* Source Selection & Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sources:</span>
              {['nice', 'who', 'aha'].map(source => (
                <label key={source} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSources.includes(source)}
                    onChange={() => toggleSource(source)}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm font-medium uppercase">{source}</span>
                </label>
              ))}
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="ml-auto flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">All Categories</option>
                  <option value="ACLS">ACLS</option>
                  <option value="PALS">PALS</option>
                  <option value="BLS">BLS</option>
                  <option value="Cardiac">Cardiac</option>
                  <option value="Stroke">Stroke</option>
                  <option value="Critical Care">Critical Care</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick Search Suggestions */}
      {!results && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Searches:</h3>
          <div className="flex flex-wrap gap-3">
            {['ACLS', 'Sepsis', 'Stroke', 'Diabetes', 'COPD', 'Hypertension', 'PALS', 'Cardiac Arrest', 'Pneumonia'].map(term => (
              <button
                key={term}
                onClick={() => { setQuery(term); }}
                className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-sm font-medium"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Results */}
      {results && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Found {results.total.toLocaleString()} guidelines
            </h2>
            <p className="text-gray-600 mt-1">
              Showing results from {Object.keys(results.sourceBreakdown)
                .map(s => `${s.toUpperCase()} (${results.sourceBreakdown[s]})`)
                .join(', ')}
            </p>
          </div>
          
          <div className="space-y-4">
            {results.guidelines.map((guideline: Guideline) => (
              <div
                key={guideline.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getSourceColor(guideline.source)}`}>
                        {getSourceIcon(guideline.source)}
                        {guideline.source.toUpperCase()}
                      </span>
                      {guideline.category && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                          {guideline.category}
                        </span>
                      )}
                      {guideline.evidenceLevel && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                          Evidence: {guideline.evidenceLevel}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {guideline.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {guideline.summary}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>📅 {new Date(guideline.published).toLocaleDateString()}</span>
                    {guideline.topics && guideline.topics.length > 0 && (
                      <span>🏷️ {guideline.topics.slice(0, 3).join(', ')}</span>
                    )}
                  </div>
                  
                  {/* Recommendations Preview */}
                  {guideline.recommendations && guideline.recommendations.length > 0 && (
                    <div className="mb-4">
                      <button
                        onClick={() => setExpandedGuideline(
                          expandedGuideline === guideline.id ? null : guideline.id
                        )}
                        className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700"
                      >
                        {expandedGuideline === guideline.id ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            Hide Recommendations
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            Show {guideline.recommendations.length} Recommendations
                          </>
                        )}
                      </button>
                      
                      {expandedGuideline === guideline.id && (
                        <ul className="mt-3 space-y-2 pl-4">
                          {guideline.recommendations.map((rec, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex gap-2">
                              <span className="text-green-600 font-bold">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <a
                      href={guideline.fullTextUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2 font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Guideline
                    </a>
                    {guideline.pdfUrl && (
                      <a
                        href={guideline.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2 font-medium"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {results.guidelines.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No guidelines found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-t border-gray-200 mt-12">
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">About NICE Guidelines</h4>
            <p>Evidence-based clinical practice guidelines from the UK\'s National Institute for Health and Care Excellence.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">About WHO Guidelines</h4>
            <p>International health recommendations from the World Health Organization covering global health topics.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">About AHA Guidelines</h4>
            <p>American Heart Association protocols for cardiovascular care, including ACLS, BLS, and PALS algorithms.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
