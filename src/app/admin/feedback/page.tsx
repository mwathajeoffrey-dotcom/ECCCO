import { logger } from '@/lib/logger';
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  ChevronLeft,
  Filter,
  Search,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Bug,
  Lightbulb,
  HelpCircle,
  ThumbsUp,
  Trash2,
} from 'lucide-react';

interface Feedback {
  id: string;
  userName?: string;
  userEmail: string;
  type: string;
  category?: string;
  subject: string;
  message: string;
  status: string;
  priority: string;
  pageUrl?: string;
  createdAt: string;
  resolvedAt?: string;
  resolution?: string;
}

export default function AdminFeedbackPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    filterFeedback();
  }, [searchQuery, statusFilter, typeFilter, feedbackList]);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/admin/check');
      const data = await response.json();
      
      if (!data.isAdmin) {
        window.location.href = '/?error=unauthorized';
        return;
      }
      
      setIsAdmin(true);
      await fetchFeedback();
    } catch (err) {
      logger.error('Admin check failed:', err);
      window.location.href = '/login?redirect=/admin/feedback';
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await fetch('/api/admin/feedback');
      if (!response.ok) throw new Error('Failed to fetch feedback');
      
      const data = await response.json();
      setFeedbackList(data);
      setFilteredFeedback(data);
    } catch (err) {
      logger.error('Failed to fetch feedback:', err);
    }
  };

  const filterFeedback = () => {
    let filtered = [...feedbackList];

    if (searchQuery) {
      filtered = filtered.filter(
        (f) =>
          f.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((f) => f.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((f) => f.type === typeFilter);
    }

    setFilteredFeedback(filtered);
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/feedback/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update status');
      await fetchFeedback();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const deleteFeedback = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;

    try {
      const response = await fetch(`/api/admin/feedback/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete feedback');
      await fetchFeedback();
      setSelectedFeedback(null);
    } catch (err) {
      alert('Failed to delete feedback');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return <Bug className="w-5 h-5 text-red-600" />;
      case 'feature': return <Lightbulb className="w-5 h-5 text-purple-600" />;
      case 'question': return <HelpCircle className="w-5 h-5 text-blue-600" />;
      case 'praise': return <ThumbsUp className="w-5 h-5 text-green-600" />;
      default: return <MessageSquare className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading feedback...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Feedback Management</h1>
                <p className="text-sm text-gray-600">{filteredFeedback.length} messages</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="bug">Bug Reports</option>
              <option value="feature">Feature Requests</option>
              <option value="question">Questions</option>
              <option value="praise">Praise</option>
            </select>
          </div>
        </div>

        {/* Feedback List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {filteredFeedback.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No feedback messages found</p>
              </div>
            ) : (
              filteredFeedback.map((feedback) => (
                <div
                  key={feedback.id}
                  onClick={() => setSelectedFeedback(feedback)}
                  className={`bg-white p-4 rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md ${
                    selectedFeedback?.id === feedback.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(feedback.type)}
                      <h3 className="font-semibold text-gray-900">{feedback.subject}</h3>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(feedback.priority)}`}>
                      {feedback.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{feedback.message}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Mail className="w-3 h-3" />
                      <span>{feedback.userEmail}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      feedback.status === 'new' ? 'bg-blue-100 text-blue-700' :
                      feedback.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                      feedback.status === 'resolved' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {feedback.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            {selectedFeedback ? (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(selectedFeedback.type)}
                    <h2 className="text-xl font-bold text-gray-900">{selectedFeedback.subject}</h2>
                  </div>
                  <button
                    onClick={() => deleteFeedback(selectedFeedback.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">From:</label>
                    <p className="text-gray-900">{selectedFeedback.userName || 'Anonymous'}</p>
                    <p className="text-sm text-gray-600">{selectedFeedback.userEmail}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Message:</label>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedFeedback.message}</p>
                  </div>

                  {selectedFeedback.pageUrl && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Page:</label>
                      <a
                        href={selectedFeedback.pageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline block truncate"
                      >
                        {selectedFeedback.pageUrl}
                      </a>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-700">Received:</label>
                    <p className="text-gray-900">
                      {new Date(selectedFeedback.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Update Status:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => updateStatus(selectedFeedback.id, 'in-progress')}
                      className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => updateStatus(selectedFeedback.id, 'resolved')}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      Resolved
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Select a feedback message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
