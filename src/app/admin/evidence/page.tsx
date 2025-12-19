'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Search, Plus, Check, X, Loader2, Database, BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface PubMedArticle {
  pmid: string;
  doi?: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  abstract?: string;
}

interface Evidence {
  id: string;
  pmid: string | null;
  doi: string | null;
  title: string;
  authors: string;
  journal: string;
  year: number;
  abstract: string | null;
  specialty: string;
  category: string;
  status: string;
  createdAt: string;
  views: number;
  bookmarks: number;
}

export default function AdminEvidencePage() {
  const { user } = useUser();
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('Emergency Medicine');
  const [category, setCategory] = useState('Clinical Trial');
  const [limit, setLimit] = useState(10);
  const [searchResults, setSearchResults] = useState<PubMedArticle[]>([]);
  const [pendingPapers, setPendingPapers] = useState<Evidence[]>([]);
  const [selectedPapers, setSelectedPapers] = useState<Set<string>>(new Set());
  const [isSearching, setIsSearching] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [message, setMessage] = useState('');

  // Check admin access
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'mwathaje@yahoo.com' || 
                  user?.primaryEmailAddress?.emailAddress === 'admin@eccco.com';

  useEffect(() => {
    if (isAdmin) {
      loadPendingPapers();
    }
  }, [isAdmin]);

  const loadPendingPapers = async () => {
    try {
      const response = await fetch('/api/evidence?status=pending');
      if (response.ok) {
        const data = await response.json();
        setPendingPapers(data.papers || []);
      }
    } catch (error) {
      console.error('Error loading pending papers:', error);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setMessage('Please enter a search query');
      return;
    }

    setIsSearching(true);
    setMessage('');

    try {
      const response = await fetch(
        `/api/pubmed?q=${encodeURIComponent(query)}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setSearchResults(data.articles || []);
      setMessage(`Found ${data.articles?.length || 0} papers`);
    } catch (error) {
      setMessage('Error searching PubMed. Please try again.');
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleImport = async () => {
    if (selectedPapers.size === 0) {
      setMessage('Please select papers to import');
      return;
    }

    setIsImporting(true);
    setMessage('');

    try {
      const papersToImport = searchResults.filter(p => selectedPapers.has(p.pmid));

      const response = await fetch('/api/evidence/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          papers: papersToImport,
          specialty,
          category,
          addedBy: user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Import failed');
      }

      const data = await response.json();
      setMessage(`Successfully imported ${data.imported} papers`);
      setSelectedPapers(new Set());
      setSearchResults([]);
      setQuery('');
      await loadPendingPapers();
    } catch (error) {
      setMessage('Error importing papers. Please try again.');
      console.error('Import error:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/evidence/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'approved',
          reviewedBy: user?.id,
        }),
      });

      if (response.ok) {
        setMessage('Paper approved');
        await loadPendingPapers();
      }
    } catch (error) {
      console.error('Approval error:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/evidence/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'rejected',
          reviewedBy: user?.id,
        }),
      });

      if (response.ok) {
        setMessage('Paper rejected');
        await loadPendingPapers();
      }
    } catch (error) {
      console.error('Rejection error:', error);
    }
  };

  const handleBulkApprove = async () => {
    setIsImporting(true);
    let approved = 0;
    for (const paper of pendingPapers) {
      try {
        await handleApprove(paper.id);
        approved++;
      } catch (error) {
        console.error('Bulk approval error:', error);
      }
    }
    setMessage(`Approved ${approved} papers`);
    setIsImporting(false);
  };

  const togglePaperSelection = (pmid: string) => {
    const newSelection = new Set(selectedPapers);
    if (newSelection.has(pmid)) {
      newSelection.delete(pmid);
    } else {
      newSelection.add(pmid);
    }
    setSelectedPapers(newSelection);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <div className="text-red-600 mb-4">
            <X className="w-16 h-16 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You need administrator privileges to access this page.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Evidence Library Management</h1>
          <p className="text-gray-600">Search PubMed, import papers, and manage the evidence library</p>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg mb-6">
            {message}
          </div>
        )}

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search PubMed
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Query
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g., sepsis treatment, ARDS ventilation"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty
              </label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Emergency Medicine</option>
                <option>Critical Care</option>
                <option>Cardiology</option>
                <option>Pulmonology</option>
                <option>Trauma</option>
                <option>Toxicology</option>
                <option>Pediatric Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Clinical Trial</option>
                <option>Meta-Analysis</option>
                <option>Systematic Review</option>
                <option>Guideline</option>
                <option>Case Report</option>
                <option>Observational Study</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Results
              </label>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value) || 10)}
                min="1"
                max="50"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching PubMed...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Search
              </>
            )}
          </button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Search Results ({searchResults.length})
              </h2>
              <button
                onClick={handleImport}
                disabled={selectedPapers.size === 0 || isImporting}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 flex items-center gap-2"
              >
                {isImporting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Import Selected ({selectedPapers.size})
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {searchResults.map((paper) => (
                <div
                  key={paper.pmid}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedPapers.has(paper.pmid)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => togglePaperSelection(paper.pmid)}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedPapers.has(paper.pmid)}
                      onChange={() => togglePaperSelection(paper.pmid)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{paper.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {paper.authors.slice(0, 3).join(', ')}
                        {paper.authors.length > 3 && ', et al.'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{paper.journal}</span>
                        <span>{paper.year}</span>
                        <span>PMID: {paper.pmid}</span>
                        {paper.doi && (
                          <a
                            href={`https://doi.org/${paper.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            DOI <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      {paper.abstract && (
                        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                          {paper.abstract}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pending Papers */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Pending Review ({pendingPapers.length})
            </h2>
            {pendingPapers.length > 0 && (
              <button
                onClick={handleBulkApprove}
                disabled={isImporting}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 text-sm"
              >
                Approve All
              </button>
            )}
          </div>

          {pendingPapers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No papers pending review</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {pendingPapers.map((paper) => (
                <div key={paper.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{paper.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {JSON.parse(paper.authors).slice(0, 3).join(', ')}
                        {JSON.parse(paper.authors).length > 3 && ', et al.'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                        <span>{paper.journal}</span>
                        <span>{paper.year}</span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          {paper.specialty}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {paper.category}
                        </span>
                      </div>
                      {paper.abstract && (
                        <p className="text-sm text-gray-700 line-clamp-2">{paper.abstract}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(paper.id)}
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                        title="Approve"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleReject(paper.id)}
                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                        title="Reject"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
