'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  StickyNote,
  FileText,
  Trash2,
  Edit,
  Search,
  Filter,
  Calendar,
  Tag,
  BookOpen,
  Plus,
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  questionId?: string;
  questionText?: string;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - replace with actual data from your backend
  const mockNotes: Note[] = [
    {
      id: '1',
      title: 'ACLS Algorithm Notes',
      content: 'Key points to remember: VF/VT - shock first, then CPR. PEA/Asystole - CPR first, identify reversible causes...',
      questionId: 'q123',
      questionText: 'What is the first step in managing VF?',
      category: 'ACLS',
      tags: ['cardiac arrest', 'algorithms', 'important'],
      createdAt: new Date('2024-12-15'),
      updatedAt: new Date('2024-12-15'),
    },
    {
      id: '2',
      title: 'Sepsis Management',
      content: 'Remember the hour-1 bundle: measure lactate, obtain blood cultures before antibiotics, administer broad-spectrum...',
      category: 'Emergency Medicine',
      tags: ['sepsis', 'protocols', 'critical'],
      createdAt: new Date('2024-12-14'),
      updatedAt: new Date('2024-12-18'),
    },
  ];

  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const categories = ['all', 'ACLS', 'PALS', 'Emergency Medicine', 'Critical Care', 'Other'];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const deleteNote = (noteId: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter((note) => note.id !== noteId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <StickyNote className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                My Notes
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'} found
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
              New Note
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Note Header */}
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 flex-1 pr-2">
                      {note.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {/* Edit functionality */}}
                        className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit note"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete note"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                    <Tag className="w-3 h-3" />
                    {note.category}
                  </span>
                </div>

                {/* Note Content */}
                <div className="p-4">
                  <p className="text-gray-700 text-sm line-clamp-4 mb-3">
                    {note.content}
                  </p>

                  {/* Linked Question */}
                  {note.questionId && note.questionText && (
                    <Link
                      href={`/practice?question=${note.questionId}`}
                      className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors mb-3"
                    >
                      <BookOpen className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 mb-1">Linked Question</p>
                        <p className="text-sm text-gray-700 line-clamp-2">{note.questionText}</p>
                      </div>
                    </Link>
                  )}

                  {/* Tags */}
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Date Info */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      Updated {note.updatedAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <StickyNote className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {searchQuery || selectedCategory !== 'all' ? 'No Notes Found' : 'No Notes Yet'}
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Start taking notes while studying to keep track of important concepts and insights.'}
            </p>
            {!searchQuery && selectedCategory === 'all' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Your First Note
              </button>
            )}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{notes.length}</p>
                <p className="text-sm text-gray-600">Total Notes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {notes.filter(n => n.questionId).length}
                </p>
                <p className="text-sm text-gray-600">Linked to Questions</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Tag className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {[...new Set(notes.flatMap(n => n.tags))].length}
                </p>
                <p className="text-sm text-gray-600">Unique Tags</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
