'use client';

import { useState } from 'react';
import { Search, FileText, Download, ExternalLink, Filter, BookOpen, Heart, Globe, ChevronDown, ChevronUp, Activity, Pill, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface FlowchartStep {
  id: string;
  type: 'start' | 'action' | 'decision' | 'end';
  label: string;
  details?: string;
  nextSteps?: string[];
  yesPath?: string;
  noPath?: string;
}

interface ClinicalAlgorithm {
  steps: FlowchartStep[];
  keyPoints: string[];
  medications?: {
    name: string;
    dose: string;
    route: string;
    timing: string;
  }[];
  criticalActions: string[];
}

interface QuickReference {
  vitalSigns?: string[];
  drugs?: string[];
  equipment?: string[];
  timing?: string[];
}

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
  algorithm?: ClinicalAlgorithm;
  quickReference?: QuickReference;
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
                    <div className="flex flex-wrap items-center gap-2">
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
                      {guideline.pdfUrl && (
                        <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center gap-1 animate-pulse">
                          <FileText className="w-3 h-3" />
                          FLOWCHART PDF
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
                            Hide Algorithm Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            Show Clinical Algorithm & Flowchart
                          </>
                        )}
                      </button>
                      
                      {expandedGuideline === guideline.id && (
                        <div className="mt-4 space-y-4">
                          {/* Quick Reference Card */}
                          {guideline.quickReference && (
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-200">
                              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                                <Activity className="w-5 h-5" />
                                Quick Reference Card
                              </h4>
                              <div className="grid md:grid-cols-2 gap-4 text-sm">
                                {guideline.quickReference.drugs && (
                                  <div>
                                    <div className="font-semibold text-blue-800 mb-1 flex items-center gap-1">
                                      <Pill className="w-4 h-4" />
                                      Medications
                                    </div>
                                    <ul className="space-y-1">
                                      {guideline.quickReference.drugs.map((drug, idx) => (
                                        <li key={idx} className="text-gray-700 font-mono text-xs bg-white px-2 py-1 rounded">
                                          {drug}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {guideline.quickReference.timing && (
                                  <div>
                                    <div className="font-semibold text-blue-800 mb-1 flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      Critical Timing
                                    </div>
                                    <ul className="space-y-1">
                                      {guideline.quickReference.timing.map((time, idx) => (
                                        <li key={idx} className="text-gray-700 font-mono text-xs bg-white px-2 py-1 rounded">
                                          {time}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Visual Flowchart */}
                          {guideline.algorithm && (
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-green-600" />
                                Clinical Algorithm Flowchart
                              </h4>
                              <div className="space-y-3">
                                {guideline.algorithm.steps.map((step, idx) => (
                                  <div key={step.id} className="relative">
                                    {/* Step Box */}
                                    <div className={`
                                      ${step.type === 'start' ? 'bg-green-100 border-green-500' : ''}
                                      ${step.type === 'action' ? 'bg-blue-100 border-blue-500' : ''}
                                      ${step.type === 'decision' ? 'bg-yellow-100 border-yellow-500' : ''}
                                      ${step.type === 'end' ? 'bg-red-100 border-red-500' : ''}
                                      border-2 rounded-lg p-3 relative
                                    `}>
                                      {/* Step Number */}
                                      <div className="absolute -left-3 -top-3 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                        {idx + 1}
                                      </div>
                                      
                                      {/* Step Type Badge */}
                                      <div className="flex items-center justify-between mb-2">
                                        <span className={`
                                          text-xs font-bold uppercase px-2 py-1 rounded
                                          ${step.type === 'start' ? 'bg-green-600 text-white' : ''}
                                          ${step.type === 'action' ? 'bg-blue-600 text-white' : ''}
                                          ${step.type === 'decision' ? 'bg-yellow-600 text-white' : ''}
                                          ${step.type === 'end' ? 'bg-red-600 text-white' : ''}
                                        `}>
                                          {step.type}
                                        </span>
                                      </div>
                                      
                                      {/* Step Label */}
                                      <h5 className="font-bold text-gray-900 mb-1">
                                        {step.label}
                                      </h5>
                                      
                                      {/* Step Details */}
                                      {step.details && (
                                        <p className="text-sm text-gray-700 whitespace-pre-line mt-2 bg-white p-2 rounded">
                                          {step.details}
                                        </p>
                                      )}
                                      
                                      {/* Decision Paths */}
                                      {step.type === 'decision' && (
                                        <div className="mt-2 flex gap-2 text-xs">
                                          {step.yesPath && (
                                            <span className="bg-green-600 text-white px-2 py-1 rounded font-semibold">
                                              YES → Next
                                            </span>
                                          )}
                                          {step.noPath && (
                                            <span className="bg-red-600 text-white px-2 py-1 rounded font-semibold">
                                              NO → Alt Path
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                    
                                    {/* Arrow to next step */}
                                    {guideline.algorithm && idx < guideline.algorithm.steps.length - 1 && (
                                      <div className="flex justify-center py-2">
                                        <div className="w-1 h-6 bg-gray-400"></div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Medication Table */}
                          {guideline.algorithm?.medications && guideline.algorithm.medications.length > 0 && (
                            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                              <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                                <Pill className="w-5 h-5" />
                                Medication Dosing
                              </h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b-2 border-purple-300">
                                      <th className="text-left py-2 px-2 font-semibold text-purple-900">Drug</th>
                                      <th className="text-left py-2 px-2 font-semibold text-purple-900">Dose</th>
                                      <th className="text-left py-2 px-2 font-semibold text-purple-900">Route</th>
                                      <th className="text-left py-2 px-2 font-semibold text-purple-900">Timing</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {guideline.algorithm.medications.map((med, idx) => (
                                      <tr key={idx} className="border-b border-purple-200 hover:bg-purple-100">
                                        <td className="py-2 px-2 font-semibold text-gray-900">{med.name}</td>
                                        <td className="py-2 px-2 font-mono text-gray-700">{med.dose}</td>
                                        <td className="py-2 px-2 text-gray-700">{med.route}</td>
                                        <td className="py-2 px-2 text-gray-700">{med.timing}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {/* Key Points & Critical Actions */}
                          {guideline.algorithm && (
                            <div className="grid md:grid-cols-2 gap-4">
                              {/* Key Points */}
                              {guideline.algorithm.keyPoints.length > 0 && (
                                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                  <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" />
                                    Key Points
                                  </h4>
                                  <ul className="space-y-1 text-sm">
                                    {guideline.algorithm.keyPoints.map((point, idx) => (
                                      <li key={idx} className="flex gap-2 text-gray-700">
                                        <span className="text-green-600 font-bold">✓</span>
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Critical Actions */}
                              {guideline.algorithm.criticalActions.length > 0 && (
                                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                                  <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" />
                                    Critical Actions
                                  </h4>
                                  <ul className="space-y-1 text-sm">
                                    {guideline.algorithm.criticalActions.map((action, idx) => (
                                      <li key={idx} className="flex gap-2 text-gray-700">
                                        <span className="text-red-600 font-bold">!</span>
                                        <span className="font-semibold">{action}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Text Recommendations (fallback if no algorithm) */}
                          {!guideline.algorithm && guideline.recommendations && (
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
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-3">
                    {guideline.pdfUrl && (
                      <a
                        href={guideline.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 text-sm flex items-center gap-2 font-bold shadow-md"
                      >
                        <FileText className="w-5 h-5" />
                        View Algorithm PDF
                      </a>
                    )}
                    <a
                      href={guideline.fullTextUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2 font-medium shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Full Guideline
                    </a>
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
