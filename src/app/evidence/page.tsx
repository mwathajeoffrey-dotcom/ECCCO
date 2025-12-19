'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Search, BookOpen, ExternalLink, Download, Bookmark, BookmarkCheck, Filter, TrendingUp } from 'lucide-react';
import Link from 'next/link';

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
  summary: string | null;
  keyPoints: string | null;
  clinicalImpact: string | null;
  tags: string | null;
  views: number;
  bookmarks: number;
  createdAt: string;
}

export default function EvidenceLibraryPage() {
  const { user } = useUser();
  const [papers, setPapers] = useState<Evidence[]>([]);
  const [filteredPapers, setFilteredPapers] = useState<Evidence[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState<Evidence | null>(null);
  const [bookmarkedPapers, setBookmarkedPapers] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadPapers();
  }, []);

  useEffect(() => {
    filterAndSortPapers();
  }, [papers, searchQuery, selectedSpecialty, selectedCategory, sortBy]);

  const loadPapers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/evidence?status=approved&limit=100');
      if (response.ok) {
        const data = await response.json();
        setPapers(data.papers || []);
      }
    } catch (error) {
      console.error('Error loading papers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortPapers = () => {
    let filtered = [...papers];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.abstract?.toLowerCase().includes(query) ||
          p.authors.toLowerCase().includes(query) ||
          p.journal.toLowerCase().includes(query)
      );
    }

    // Apply specialty filter
    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter((p) => p.specialty === selectedSpecialty);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'year':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'bookmarked':
        filtered.sort((a, b) => b.bookmarks - a.bookmarks);
        break;
    }

    setFilteredPapers(filtered);
  };

  const generateCitation = (paper: Evidence, format: 'apa' | 'bibtex' | 'vancouver') => {
    const authors = JSON.parse(paper.authors);

    switch (format) {
      case 'apa':
        const apaAuthors = authors.slice(0, 20).join(', ') + (authors.length > 20 ? ', ...' : '');
        return `${apaAuthors} (${paper.year}). ${paper.title}. ${paper.journal}. ${paper.doi ? `https://doi.org/${paper.doi}` : `PMID: ${paper.pmid}`}`;

      case 'vancouver':
        const vancouverAuthors = authors.slice(0, 6).join(', ') + (authors.length > 6 ? ', et al.' : '');
        return `${vancouverAuthors}. ${paper.title}. ${paper.journal}. ${paper.year}.${paper.doi ? ` doi: ${paper.doi}` : paper.pmid ? ` PMID: ${paper.pmid}` : ''}`;

      case 'bibtex':
        const firstAuthor = authors[0]?.split(' ').pop() || 'Unknown';
        return `@article{${firstAuthor}${paper.year},
  title={${paper.title}},
  author={${authors.join(' and ')}},
  journal={${paper.journal}},
  year={${paper.year}},
  ${paper.doi ? `doi={${paper.doi}},` : ''}
  ${paper.pmid ? `pmid={${paper.pmid}},` : ''}
}`;

      default:
        return '';
    }
  };

  const copyCitation = (paper: Evidence, format: 'apa' | 'bibtex' | 'vancouver') => {
    const citation = generateCitation(paper, format);
    navigator.clipboard.writeText(citation);
    alert(`${format.toUpperCase()} citation copied to clipboard!`);
  };

  const toggleBookmark = async (paperId: string) => {
    const newBookmarks = new Set(bookmarkedPapers);
    if (newBookmarks.has(paperId)) {
      newBookmarks.delete(paperId);
    } else {
      newBookmarks.add(paperId);
    }
    setBookmarkedPapers(newBookmarks);
    // TODO: Save bookmark to database
  };

  const specialties = Array.from(new Set(papers.map((p) => p.specialty)));
  const categories = Array.from(new Set(papers.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <BookOpen className="w-10 h-10" />
            Evidence Library
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Curated research from PubMed • {papers.length} papers • Evidence-based emergency medicine
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search papers by title, author, keywords..."
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h2>

              {/* Specialty Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialty
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Specialties</option>
                  {specialties.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="recent">Most Recent</option>
                  <option value="year">Publication Year</option>
                  <option value="popular">Most Viewed</option>
                  <option value="bookmarked">Most Bookmarked</option>
                </select>
              </div>

              {/* Stats */}
              <div className="pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Total Papers:</span>
                    <span className="font-semibold text-gray-900">{papers.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Showing:</span>
                    <span className="font-semibold text-gray-900">{filteredPapers.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Papers List */}
          <div className="md:col-span-3">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading papers...</p>
              </div>
            ) : filteredPapers.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No papers found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPapers.map((paper) => (
                  <div
                    key={paper.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{paper.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {JSON.parse(paper.authors).slice(0, 5).join(', ')}
                          {JSON.parse(paper.authors).length > 5 && ', et al.'}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleBookmark(paper.id)}
                        className="text-gray-400 hover:text-yellow-500 transition-colors"
                      >
                        {bookmarkedPapers.has(paper.id) ? (
                          <BookmarkCheck className="w-6 h-6 text-yellow-500" />
                        ) : (
                          <Bookmark className="w-6 h-6" />
                        )}
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {paper.specialty}
                      </span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                        {paper.category}
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {paper.journal} • {paper.year}
                      </span>
                      {paper.pmid && (
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded hover:bg-green-200 flex items-center gap-1"
                        >
                          PMID: {paper.pmid} <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {paper.doi && (
                        <a
                          href={`https://doi.org/${paper.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded hover:bg-indigo-200 flex items-center gap-1"
                        >
                          DOI <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {/* Abstract */}
                    {paper.abstract && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-700 line-clamp-3">{paper.abstract}</p>
                        <button
                          onClick={() => setSelectedPaper(paper)}
                          className="text-blue-600 hover:underline text-sm mt-1"
                        >
                          Read more →
                        </button>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => copyCitation(paper, 'apa')}
                        className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        APA
                      </button>
                      <button
                        onClick={() => copyCitation(paper, 'bibtex')}
                        className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        BibTeX
                      </button>
                      <button
                        onClick={() => copyCitation(paper, 'vancouver')}
                        className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        Vancouver
                      </button>
                      <span className="text-xs text-gray-500 ml-auto flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {paper.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Bookmark className="w-3 h-3" />
                          {paper.bookmarks} saves
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Paper Detail Modal */}
      {selectedPaper && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPaper(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPaper(null)}
              className="float-right text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedPaper.title}</h2>
            <p className="text-gray-600 mb-4">
              {JSON.parse(selectedPaper.authors).join(', ')}
            </p>
            <div className="flex gap-2 mb-6">
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
                {selectedPaper.journal} • {selectedPaper.year}
              </span>
              {selectedPaper.pmid && (
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${selectedPaper.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded hover:bg-green-200"
                >
                  PubMed
                </a>
              )}
              {selectedPaper.doi && (
                <a
                  href={`https://doi.org/${selectedPaper.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded hover:bg-indigo-200"
                >
                  Full Text
                </a>
              )}
            </div>
            {selectedPaper.abstract && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-2">Abstract</h3>
                <p className="text-gray-700 whitespace-pre-line">{selectedPaper.abstract}</p>
              </div>
            )}
            <div className="flex gap-4">
              <button
                onClick={() => copyCitation(selectedPaper, 'apa')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Copy APA Citation
              </button>
              <button
                onClick={() => copyCitation(selectedPaper, 'bibtex')}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                Copy BibTeX
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
