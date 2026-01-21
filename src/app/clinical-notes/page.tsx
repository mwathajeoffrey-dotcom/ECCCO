'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Calendar,
  Tag,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Clock,
  Filter,
  X,
  AlertCircle,
  Award
} from 'lucide-react';
import { NoteModal, NoteData } from '@/components/evidence/NoteModal';

interface ClinicalNote {
  id: string;
  title: string;
  content: string;
  tags: string[];
  searchQuery: string;
  evidenceSummary?: string;
  specialty?: string;
  patientContext?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export default function ClinicalNotesPage() {
  const [notes, setNotes] = useState<ClinicalNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedNote, setExpandedNote] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<ClinicalNote | null>(null);
  const [noteModalOpen, setNoteModalOpen] = useState(false);

  // Fetch notes on mount
  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL('/api/notes', window.location.origin);
      if (selectedTag) {
        url.searchParams.set('tag', selectedTag);
      }
      if (searchFilter) {
        url.searchParams.set('search', searchFilter);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      // Filter to show only clinical evidence notes (those with searchQuery)
      const clinicalNotes = data.filter((note: ClinicalNote) => note.searchQuery);
      setNotes(clinicalNotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/notes?id=${noteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      // Remove from local state
      setNotes(notes.filter(note => note.id !== noteId));
      alert('✅ Note deleted successfully');
    } catch (err) {
      alert('❌ Failed to delete note. Please try again.');
      console.error('Delete error:', err);
    }
  };

  const handleEditNote = (note: ClinicalNote) => {
    setEditingNote(note);
    setNoteModalOpen(true);
  };

  const handleSaveNote = async (noteData: NoteData) => {
    try {
      const url = editingNote ? '/api/notes' : '/api/notes';
      const method = editingNote ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editingNote && { id: editingNote.id }),
          title: noteData.title,
          content: noteData.content,
          tags: noteData.tags,
          searchQuery: noteData.searchQuery,
          evidenceSummary: noteData.evidenceSummary,
          specialty: noteData.specialty,
          patientContext: noteData.patientContext,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save note');
      }

      // Refresh notes list
      await fetchNotes();
      setNoteModalOpen(false);
      setEditingNote(null);
      alert(editingNote ? '✅ Note updated successfully!' : '✅ Note created successfully!');
    } catch (error) {
      console.error('Failed to save note:', error);
      throw error;
    }
  };

  const toggleNote = (id: string) => {
    setExpandedNote(expandedNote === id ? null : id);
  };

  // Get all unique tags from notes
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  // Filter notes based on search
  const filteredNotes = notes.filter(note => {
    const matchesSearch = !searchFilter || 
      note.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      note.content.toLowerCase().includes(searchFilter.toLowerCase()) ||
      note.searchQuery.toLowerCase().includes(searchFilter.toLowerCase());
    
    const matchesTag = !selectedTag || note.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                📝 My Clinical Notes
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Your personal evidence-based learning journal
              </p>
            </div>
            <Link
              href="/evidence-search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 
                       text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 
                       transform hover:scale-105 font-medium"
            >
              <Search className="w-5 h-5" />
              Search Evidence
            </Link>
          </div>

          {/* Info Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 
                        border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Welcome to Your Clinical Notes
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  This is your personal space for documenting insights from evidence searches. 
                  Click <strong>"Search Evidence"</strong> to explore medical literature, then use the 
                  <strong> "📝 Take Clinical Notes"</strong> button to save your findings here!
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search your notes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Tag Filter */}
              {allTags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <select
                    value={selectedTag || ''}
                    onChange={(e) => setSelectedTag(e.target.value || null)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                             bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  >
                    <option value="">All Tags</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                  {selectedTag && (
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="Clear filter"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{notes.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Notes</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Tag className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{allTags.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Unique Tags</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {notes.length > 0 ? formatDate(notes[0].updatedAt).split(',')[0] : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading your notes...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredNotes.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {searchFilter || selectedTag ? 'No notes found' : 'No clinical notes yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {searchFilter || selectedTag 
                ? 'Try adjusting your search or filter criteria'
                : 'Start documenting your evidence-based learning journey! Search for clinical topics and take notes on your findings.'
              }
            </p>
            {!searchFilter && !selectedTag && (
              <Link
                href="/evidence-search"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 
                         text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 
                         transform hover:scale-105 font-medium"
              >
                <Search className="w-5 h-5" />
                Start Searching Evidence
              </Link>
            )}
          </div>
        )}

        {/* Notes List */}
        {!loading && !error && filteredNotes.length > 0 && (
          <div className="space-y-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg 
                         transition-shadow duration-200 overflow-hidden border border-gray-200 
                         dark:border-gray-700"
              >
                {/* Note Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  onClick={() => toggleNote(note.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {note.title}
                      </h3>
                      
                      {/* Search Query Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 
                                     text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                          <Search className="w-3 h-3" />
                          {note.searchQuery}
                        </span>
                      </div>

                      {/* Tags */}
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {note.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 
                                       text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(note.createdAt)}
                        </span>
                        {note.specialty && (
                          <span className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            {note.specialty}
                          </span>
                        )}
                        {note.version > 1 && (
                          <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                            <Clock className="w-4 h-4" />
                            v{note.version} (Updated)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expand Button */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditNote(note);
                        }}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        title="Edit note"
                      >
                        <Edit className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(note.id);
                        }}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Delete note"
                      >
                        <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </button>
                      {expandedNote === note.id ? (
                        <ChevronUp className="w-6 h-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedNote === note.id && (
                  <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    {/* Note Content */}
                    <div className="prose dark:prose-invert max-w-none mb-4">
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 whitespace-pre-wrap font-mono text-sm">
                        {note.content}
                      </div>
                    </div>

                    {/* Patient Context */}
                    {note.patientContext && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Patient Context
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">{note.patientContext}</p>
                      </div>
                    )}

                    {/* Evidence Summary Link */}
                    {note.evidenceSummary && (
                      <div className="mb-4">
                        <details className="group">
                          <summary className="cursor-pointer font-semibold text-blue-600 dark:text-blue-400 
                                           hover:text-blue-800 dark:hover:text-blue-200 flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            View Original Evidence Summary
                          </summary>
                          <div className="mt-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                              {note.evidenceSummary}
                            </p>
                          </div>
                        </details>
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        href={`/evidence-search?q=${encodeURIComponent(note.searchQuery)}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 
                                 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 
                                 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium"
                      >
                        <Search className="w-4 h-4" />
                        Re-search this topic
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Note Modal */}
      <NoteModal
        isOpen={noteModalOpen}
        onClose={() => {
          setNoteModalOpen(false);
          setEditingNote(null);
        }}
        searchQuery={editingNote?.searchQuery || ''}
        evidenceSummary={editingNote?.evidenceSummary}
        onSave={handleSaveNote}
        existingNote={editingNote ? {
          id: editingNote.id,
          title: editingNote.title,
          content: editingNote.content,
          tags: editingNote.tags,
          searchQuery: editingNote.searchQuery,
          evidenceSummary: editingNote.evidenceSummary,
          specialty: editingNote.specialty,
          patientContext: editingNote.patientContext,
        } : null}
      />
    </div>
  );
}
