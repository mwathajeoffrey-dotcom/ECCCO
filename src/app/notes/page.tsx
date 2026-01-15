"use client";

import { useState } from "react";
import Link from "next/link";
import { StickyNote, FileText, Trash2, Edit, Search, Filter, Calendar, Tag, BookOpen, Plus } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data - replace with actual data from your backend
  const mockNotes: Note[] = [
    {
      id: "1",
      title: "ACLS Algorithm Notes",
      content:
        "Key points to remember: VF/VT - shock first, then CPR. PEA/Asystole - CPR first, identify reversible causes...",
      questionId: "q123",
      questionText: "What is the first step in managing VF?",
      category: "ACLS",
      tags: ["cardiac arrest", "algorithms", "important"],
      createdAt: new Date("2024-12-15"),
      updatedAt: new Date("2024-12-15"),
    },
    {
      id: "2",
      title: "Sepsis Management",
      content:
        "Remember the hour-1 bundle: measure lactate, obtain blood cultures before antibiotics, administer broad-spectrum...",
      category: "Emergency Medicine",
      tags: ["sepsis", "protocols", "critical"],
      createdAt: new Date("2024-12-14"),
      updatedAt: new Date("2024-12-18"),
    },
  ];

  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const categories = ["all", "ACLS", "PALS", "Emergency Medicine", "Critical Care", "Other"];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || note.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const deleteNote = (noteId: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
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
                {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"} found
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
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Note Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-white dark:to-gray-800">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-1 pr-2">{note.title}</h3>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          /* Edit functionality */
                        }}
                        className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="Edit note"
                      >
                        <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Delete note"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium">
                    <Tag className="w-3 h-3" />
                    {note.category}
                  </span>
                </div>

                {/* Note Content */}
                <div className="p-4">
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-4 mb-3">{note.content}</p>

                  {/* Linked Question */}
                  {note.questionId && note.questionText && (
                    <Link
                      href={`/practice?question=${note.questionId}`}
                      className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mb-3"
                    >
                      <BookOpen className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Linked Question</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{note.questionText}</p>
                      </div>
                    </Link>
                  )}

                  {/* Tags */}
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Date Info */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Updated {note.updatedAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <StickyNote className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery || selectedCategory !== "all" ? "No Notes Found" : "No Notes Yet"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {searchQuery || selectedCategory !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Start taking notes while studying to keep track of important concepts and insights."}
            </p>
            {!searchQuery && selectedCategory === "all" && (
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
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{notes.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Notes</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {notes.filter((n) => n.questionId).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Linked to Questions</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {[...new Set(notes.flatMap((n) => n.tags))].length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Unique Tags</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Note Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Note</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Note Title *</label>
                <input
                  type="text"
                  placeholder="e.g., ACLS Algorithm Notes"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
                  <option>ACLS</option>
                  <option>PALS</option>
                  <option>Emergency Medicine</option>
                  <option>Critical Care</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content *</label>
                <textarea
                  rows={8}
                  placeholder="Start typing your notes..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., cardiac arrest, algorithms, important"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Question Link (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Link to Question (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Question ID or text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Link this note to a specific practice question
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // TODO: Implement save functionality
                  alert("Note creation will be implemented with database integration");
                  setShowCreateModal(false);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
