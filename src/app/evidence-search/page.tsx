'use client';

import { useState } from 'react';
import { 
  Search, Filter, BookOpen, ExternalLink, Download, 
  Calendar, TrendingUp, Award, FileText, ChevronDown, ChevronUp,
  Sparkles, Database, CheckCircle2, Quote, Link2, BookmarkPlus,
  Copy, Check
} from 'lucide-react';

interface Article {
  id: string;
  source: 'pubmed' | 'crossref' | 'europepmc';
  title: string;
  authors: string[];
  journal: string;
  published: string;
  abstract?: string;
  doi?: string;
  pmid?: string;
  url: string;
  citationCount: number;
  isOpenAccess: boolean;
  fullTextUrl?: string;
  // New fields for enhanced display
  aiSummary?: string; // OpenEvidence-style summary
  keyFindings?: string[];
  relevantParagraphs?: Array<{
    text: string;
    context: string;
    relevanceScore?: number;
  }>;
  references?: Array<{
    title: string;
    authors: string;
    url: string;
    doi?: string;
  }>;
}

const POPULAR_JOURNALS = [
  'NEJM', 'Lancet', 'JAMA', 'BMJ', 'Annals of Emergency Medicine',
  'Academic Emergency Medicine', 'Emergency Medicine Journal'
];

const ARTICLE_TYPES = [
  { value: 'clinical-trial', label: 'Clinical Trials' },
  { value: 'review', label: 'Reviews' },
  { value: 'guideline', label: 'Guidelines' },
  { value: 'meta-analysis', label: 'Meta-Analyses' },
  { value: 'case-report', label: 'Case Reports' },
];

export default function EvidenceSearchPage() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [sourceBreakdown, setSourceBreakdown] = useState<Record<string, number>>({});
  
  // New state for OpenEvidence-style UI
  const [showReferences, setShowReferences] = useState(true);
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set());
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [overallSummary, setOverallSummary] = useState<string>('');
  
  // Filters
  const [selectedSources, setSelectedSources] = useState<string[]>(['pubmed', 'crossref', 'europepmc']);
  const [selectedJournal, setSelectedJournal] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [openAccessOnly, setOpenAccessOnly] = useState(false);
  const [hasAbstract, setHasAbstract] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'citations'>('relevance');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: query,
        sources: selectedSources.join(','),
        limit: '30',
        sort: sortBy,
      });
      
      if (selectedJournal) params.append('journal', selectedJournal);
      if (selectedType) params.append('type', selectedType);
      if (dateFrom) params.append('fromDate', dateFrom);
      if (dateTo) params.append('toDate', dateTo);
      if (openAccessOnly) params.append('openAccess', 'true');
      if (hasAbstract) params.append('hasAbstract', 'true');
      
      const response = await fetch(`/api/evidence/search?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setArticles(data.articles);
        setTotalResults(data.totalResults);
        setSourceBreakdown(data.sourceBreakdown || {});
        
        // Generate overall summary from top results (OpenEvidence-style)
        if (data.articles && data.articles.length > 0) {
          const topArticles = data.articles.slice(0, 3);
          const summaryText = topArticles
            .map((a: Article) => a.aiSummary)
            .filter(Boolean)
            .join(' ');
          setOverallSummary(summaryText || 'Based on the current evidence, further research is needed to provide a comprehensive summary.');
        }
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSource = (source: string) => {
    setSelectedSources(prev =>
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const toggleArticle = (articleId: string) => {
    setExpandedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const highlightQuery = (text: string) => {
    if (!query.trim()) return text;
    
    const terms = query.trim().toLowerCase().split(' ').filter(t => t.length > 3);
    let highlighted = text;
    
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
    });
    
    return highlighted;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Database className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black">AI-Powered Evidence Search</h1>
              <p className="text-blue-100 mt-2">
                Search 170M+ articles from PubMed, CrossRef, Europe PMC & top journals
              </p>
            </div>
          </div>
          
          {/* Source Badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              PubMed (35M+ citations)
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              CrossRef (130M+ articles)
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Europe PMC (8M+ full-text)
            </div>
            <div className="px-4 py-2 bg-emerald-500/90 backdrop-blur-md rounded-full text-sm font-black flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              100% FREE APIs
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 mb-6">
          {/* Search Input */}
          <div className="w-full mb-3 sm:mb-0">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder='Try "sepsis trials 2024" or "NEJM stroke guidelines"'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Mobile-Friendly Button Row */}
          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            {/* Search Button - Full width on mobile */}
            <button
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className="w-full sm:flex-1 px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              {loading ? 'Searching...' : 'Search Evidence'}
            </button>
            
            {/* Filters Button - Full width on mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full sm:w-auto px-6 py-3 sm:py-4 border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-semibold"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Sources */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search Sources
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'pubmed', label: 'PubMed', count: '35M+' },
                    { id: 'crossref', label: 'CrossRef', count: '130M+' },
                    { id: 'europepmc', label: 'Europe PMC', count: '8M+' },
                  ].map(source => (
                    <label key={source.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSources.includes(source.id)}
                        onChange={() => toggleSource(source.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{source.label} <span className="text-gray-400">({source.count})</span></span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Journal */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Specific Journal
                </label>
                <select
                  value={selectedJournal}
                  onChange={(e) => setSelectedJournal(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Journals</option>
                  {POPULAR_JOURNALS.map(journal => (
                    <option key={journal} value={journal}>{journal}</option>
                  ))}
                </select>
              </div>

              {/* Article Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Article Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  {ARTICLE_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="date">Newest First</option>
                  <option value="citations">Most Cited</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="md:col-span-2 lg:col-span-3 flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={openAccessOnly}
                    onChange={(e) => setOpenAccessOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Open Access Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasAbstract}
                    onChange={(e) => setHasAbstract(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Has Abstract</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Results Stats */}
        {totalResults > 0 && !loading && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-lg font-semibold text-gray-900">
                {totalResults.toLocaleString()} total results
              </span>
              {Object.entries(sourceBreakdown).map(([source, count]) => (
                <span key={source} className="text-sm text-gray-600">
                  {source}: <span className="font-semibold">{count.toLocaleString()}</span>
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-500">
              Showing {articles.length} articles
            </span>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 font-semibold">Searching across all databases...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
          </div>
        ) : articles.length === 0 && query ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search query or filters</p>
          </div>
        ) : (
          <div className="space-y-6 pb-12">
            {/* OpenEvidence-Style: Overall Summary First */}
            {overallSummary && articles.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Summary</h2>
                    <p className="text-sm text-gray-500">Based on {articles.length} high-quality sources</p>
                  </div>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-800 leading-relaxed text-lg">
                    {overallSummary}
                  </p>
                </div>

                {/* Summary Actions */}
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(overallSummary);
                      setCopiedText('summary');
                      setTimeout(() => setCopiedText(null), 2000);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium text-gray-700"
                  >
                    {copiedText === 'summary' ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Summary
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* OpenEvidence-Style: References Section */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200">
              <button
                onClick={() => setShowReferences(!showReferences)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-bold text-gray-900">References</h2>
                    <p className="text-sm text-gray-500">{articles.length} articles found</p>
                  </div>
                </div>
                {showReferences ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {showReferences && (
                <div className="border-t border-gray-200 divide-y divide-gray-200">
                  {articles.map((article, index) => {
                    const isExpanded = expandedArticles.has(article.id);
                    
                    return (
                      <div key={article.id} className="hover:bg-gray-50 transition-colors">
                        {/* Reference Header - Always Visible */}
                        <div className="px-8 py-6">
                          <div className="flex items-start gap-4">
                            {/* Number Badge */}
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-700">
                              {index + 1}
                            </div>

                            <div className="flex-1">
                              {/* Journal Badge */}
                              <div className="mb-3">
                                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                                  {article.journal}
                                </span>
                                {article.isOpenAccess && (
                                  <span className="inline-block ml-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                                    Open Access
                                  </span>
                                )}
                              </div>

                              {/* Title */}
                              <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                                {article.title}
                              </h3>

                              {/* Authors & Date */}
                              <p className="text-sm text-gray-600 mb-3">
                                {article.authors.slice(0, 3).join(', ')}
                                {article.authors.length > 3 && ', et al.'}
                                {' • '}
                                <span className="text-gray-500">{article.published}</span>
                              </p>

                              {/* Action Buttons */}
                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  onClick={() => toggleArticle(article.id)}
                                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                  {isExpanded ? (
                                    <>
                                      <ChevronUp className="w-4 h-4" />
                                      Hide
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="w-4 h-4" />
                                      Show Details
                                    </>
                                  )}
                                </button>
                                
                                {article.doi && (
                                  <a
                                    href={`https://doi.org/${article.doi}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                                  >
                                    <Link2 className="w-4 h-4" />
                                    View Article
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Expandable Details */}
                        {isExpanded && (
                          <div className="px-8 pb-6 border-t border-gray-200 bg-gray-50">
                            <div className="pt-6 space-y-6">
                              {/* AI Summary */}
                              {article.aiSummary && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                      <Sparkles className="w-4 h-4 text-blue-600" />
                                      AI Summary
                                    </h4>
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(article.aiSummary || '');
                                        setCopiedText(article.id + '-summary');
                                        setTimeout(() => setCopiedText(null), 2000);
                                      }}
                                      className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1"
                                    >
                                      {copiedText === article.id + '-summary' ? (
                                        <>
                                          <Check className="w-3 h-3 text-green-600" />
                                          Copied
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3 h-3" />
                                          Copy
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                                    <p className="text-sm text-gray-800 leading-relaxed">
                                      {article.aiSummary}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Key Findings */}
                              {article.keyFindings && article.keyFindings.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-bold text-gray-900 mb-3">Key Findings</h4>
                                  <ul className="space-y-2">
                                    {article.keyFindings.map((finding, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span dangerouslySetInnerHTML={{ __html: highlightQuery(finding) }} />
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Full Abstract */}
                              {article.abstract && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-sm font-bold text-gray-900">Abstract</h4>
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(article.abstract || '');
                                        setCopiedText(article.id + '-abstract');
                                        setTimeout(() => setCopiedText(null), 2000);
                                      }}
                                      className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1"
                                    >
                                      {copiedText === article.id + '-abstract' ? (
                                        <>
                                          <Check className="w-3 h-3 text-green-600" />
                                          Copied
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3 h-3" />
                                          Copy
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <p 
                                    className="text-sm text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: highlightQuery(article.abstract) }}
                                  />
                                </div>
                              )}

                              {/* Citation Info */}
                              {article.citationCount > 0 && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Award className="w-4 h-4 text-orange-600" />
                                  <span>Cited {article.citationCount} times</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
