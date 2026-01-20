'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Check,
  X,
  Eye,
  EyeOff,
  Calendar,
  Award,
  BookOpen,
  AlertCircle,
  ChevronLeft,
} from 'lucide-react';

interface EvidenceReference {
  id: string;
  referenceId: string;
  category: string;
  name: string;
  organization?: string;
  year: number;
  summary: string;
  keyRecommendations: string[];
  clinicalPearls: string[];
  evidenceLevel: string;
  citation: string;
  references: Array<{
    title: string;
    journal: string;
    doi: string;
    url: string;
  }>;
  topics?: string[];
  journal?: string;
  doi?: string;
  pmid?: string;
  published: boolean;
  featured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminEvidencePage() {
  const [references, setReferences] = useState<EvidenceReference[]>([]);
  const [filteredReferences, setFilteredReferences] = useState<EvidenceReference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showPublishedOnly, setShowPublishedOnly] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Check admin status
  useEffect(() => {
    checkAdminStatus();
  }, []);

  // Fetch references
  useEffect(() => {
    if (isAdmin) {
      fetchReferences();
    }
  }, [isAdmin]);

  // Filter references
  useEffect(() => {
    let filtered = references;

    if (searchQuery) {
      filtered = filtered.filter((ref) =>
        ref.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ref.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ref.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((ref) => ref.category === selectedCategory);
    }

    if (showPublishedOnly) {
      filtered = filtered.filter((ref) => ref.published);
    }

    setFilteredReferences(filtered);
  }, [searchQuery, selectedCategory, showPublishedOnly, references]);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/admin/check');
      const data = await response.json();
      
      if (!data.isAdmin) {
        window.location.href = '/?error=unauthorized';
        return;
      }
      
      setIsAdmin(true);
    } catch (err) {
      console.error('Admin check failed:', err);
      window.location.href = '/login?redirect=/admin/evidence';
    }
  };

  const fetchReferences = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/evidence?includeUnpublished=true');
      
      if (!response.ok) {
        throw new Error('Failed to fetch references');
      }
      
      const data = await response.json();
      setReferences(data);
      setFilteredReferences(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load references');
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/evidence/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update reference');
      }

      await fetchReferences();
    } catch (err) {
      alert('Failed to update published status: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/evidence/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update reference');
      }

      await fetchReferences();
    } catch (err) {
      alert('Failed to update featured status: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleDelete = async (id: string) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
      return;
    }

    try {
      const response = await fetch(`/api/evidence/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete reference');
      }

      await fetchReferences();
      setDeleteConfirm(null);
    } catch (err) {
      alert('Failed to delete reference: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const categories = Array.from(new Set(references.map((ref) => ref.category)));

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Checking admin permissions...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading evidence library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Evidence Library Admin</h1>
                  <p className="text-sm text-gray-600">{references.length} total references</p>
                </div>
              </div>
            </div>
            <Link
              href="/admin/evidence/new"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Reference
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search references..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Published Filter */}
            <div>
              <button
                onClick={() => setShowPublishedOnly(!showPublishedOnly)}
                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  showPublishedOnly
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {showPublishedOnly ? 'Published Only' : 'All Status'}
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredReferences.length} of {references.length} references
          </div>
        </div>

        {/* References List */}
        <div className="space-y-4">
          {filteredReferences.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No references found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || selectedCategory
                  ? 'Try adjusting your filters'
                  : 'Get started by adding your first reference'}
              </p>
              {!searchQuery && !selectedCategory && (
                <Link
                  href="/admin/evidence/new"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add First Reference
                </Link>
              )}
            </div>
          ) : (
            filteredReferences.map((ref) => (
              <div key={ref.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{ref.name}</h3>
                      {ref.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                          Featured
                        </span>
                      )}
                      {ref.published ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded flex items-center">
                          <Check className="w-3 h-3 mr-1" />
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded flex items-center">
                          <X className="w-3 h-3 mr-1" />
                          Draft
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {ref.year}
                      </span>
                      <span className="flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        {ref.evidenceLevel}
                      </span>
                      {ref.organization && <span>{ref.organization}</span>}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      <span className="font-semibold">Category:</span> {ref.category}
                    </div>
                    <p className="text-gray-700 line-clamp-2">{ref.summary}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => togglePublished(ref.id, ref.published)}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title={ref.published ? 'Unpublish' : 'Publish'}
                    >
                      {ref.published ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => toggleFeatured(ref.id, ref.featured)}
                      className={`p-2 rounded-lg transition-colors ${
                        ref.featured
                          ? 'text-yellow-600 bg-yellow-50'
                          : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
                      }`}
                      title={ref.featured ? 'Unfeature' : 'Feature'}
                    >
                      <Award className="w-5 h-5" />
                    </button>
                    <Link
                      href={`/admin/evidence/edit/${ref.id}`}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(ref.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        deleteConfirm === ref.id
                          ? 'text-white bg-red-600 hover:bg-red-700'
                          : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                      }`}
                      title={deleteConfirm === ref.id ? 'Click again to confirm' : 'Delete'}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-6 text-sm text-gray-600 pt-4 border-t">
                  <span>{ref.keyRecommendations.length} recommendations</span>
                  <span>{ref.clinicalPearls.length} clinical pearls</span>
                  <span>{ref.references.length} references</span>
                  {ref.pmid && <span className="text-blue-600">PMID: {ref.pmid}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
