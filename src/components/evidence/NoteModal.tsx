'use client';

import { useState, useEffect } from 'react';
import { X, Save, Tag, Calendar, FileText, Sparkles, Minimize2, Maximize2, Minus } from 'lucide-react';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  evidenceSummary?: string;
  onSave: (note: NoteData) => Promise<void>;
  existingNote?: NoteData | null;
}

export interface NoteData {
  id?: string;
  title: string;
  content: string;
  tags: string[];
  searchQuery: string;
  evidenceSummary?: string;
  specialty?: string;
  patientContext?: string;
}

export function NoteModal({
  isOpen,
  onClose,
  searchQuery,
  evidenceSummary,
  onSave,
  existingNote,
}: NoteModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [patientContext, setPatientContext] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Initialize form with existing note or defaults
  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setTags(existingNote.tags || []);
      setSpecialty(existingNote.specialty || '');
      setPatientContext(existingNote.patientContext || '');
    } else {
      setTitle(searchQuery);
      setContent('');
      setTags([]);
      setSpecialty('');
      setPatientContext('');
    }
  }, [existingNote, searchQuery]);

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      alert('Please add some notes before saving');
      return;
    }

    setIsSaving(true);
    try {
      await onSave({
        id: existingNote?.id,
        title: title || searchQuery,
        content,
        tags,
        searchQuery,
        evidenceSummary,
        specialty: specialty || undefined,
        patientContext: patientContext || undefined,
      });
      
      // Reset minimize/fullscreen state on success
      setIsMinimized(false);
      setIsFullScreen(false);
      onClose();
    } catch (error) {
      console.error('Failed to save note:', error);
      
      // Better error message
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to save note. Please make sure you are logged in and try again.';
      
      alert('❌ ' + errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop - only show when not minimized */}
      {!isMinimized && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Minimized Bar */}
      {isMinimized ? (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3 min-w-[300px]">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {title || searchQuery}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {content.length} characters
              </p>
            </div>
            <button
              onClick={() => setIsMinimized(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Restore"
            >
              <Maximize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      ) : (
        /* Full Modal */
        <div className={`flex min-h-full items-center justify-center p-4 ${isFullScreen ? 'p-0' : ''}`}>
          <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl transform transition-all ${
            isFullScreen 
              ? 'w-screen h-screen rounded-none' 
              : 'w-full max-w-3xl'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {existingNote ? 'Edit Clinical Note' : '📝 Take Clinical Notes'}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Document your findings and insights
                  </p>
                </div>
              </div>
              
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title="Minimize - Continue reading"
                >
                  <Minus className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title={isFullScreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  {isFullScreen ? (
                    <Minimize2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className={`p-6 space-y-6 overflow-y-auto ${isFullScreen ? 'max-h-[calc(100vh-200px)]' : 'max-h-[70vh]'}`}>
            {/* Search Context */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Search Query
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1 break-words">
                    {searchQuery}
                  </p>
                </div>
              </div>
            </div>

            {/* Note Taking Tips */}
            {showTips && !existingNote && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-2">
                      💡 Pro Tips for Clinical Notes
                    </p>
                    <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                      <li>• Document key takeaways from the evidence</li>
                      <li>• Write questions for further exploration</li>
                      <li>• Note any contradictions with current practice</li>
                      <li>• Track how your understanding evolves over time</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setShowTips(false)}
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Note Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Management of Septic Shock - Key Points"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                         placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            {/* Note Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Notes *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your clinical notes here...

Example structure:
📋 Key Takeaways:
- Early recognition is critical
- Lactate >2 mmol/L concerning
- Source control within 12 hours

❓ Questions to Explore:
- Optimal fluid resuscitation strategy?
- Role of early vasopressors?

💭 Clinical Pearls:
- [Your insights here]"
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                         placeholder-gray-400 dark:placeholder-gray-500 resize-y font-mono text-sm"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {content.length} characters • Markdown supported
              </p>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Tags (for easy searching later)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., sepsis, emergency, ICU"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                           placeholder-gray-400 dark:placeholder-gray-500"
                />
                <button
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 
                           rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors font-medium"
                >
                  Add
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 
                               text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-blue-900 dark:hover:text-blue-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Optional Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Specialty (optional)
                </label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  placeholder="e.g., Emergency Medicine, ICU"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                           placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Patient Context (optional)
                </label>
                <input
                  type="text"
                  value={patientContext}
                  onChange={(e) => setPatientContext(e.target.value)}
                  placeholder="e.g., Elderly with comorbidities"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                           placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your notes are private and can be updated anytime
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isSaving}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 
                         rounded-lg transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || !content.trim()}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                         text-white rounded-lg transition-colors font-medium disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {existingNote ? 'Update Note' : 'Save Note'}
                  </>
                )}
              </button>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
