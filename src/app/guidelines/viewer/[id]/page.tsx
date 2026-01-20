'use client';

import { logger } from '@/lib/logger';

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Bookmark, 
  BookmarkCheck,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Search,
  StickyNote,
  MessageSquare,
  Share2,
  Printer,
  Maximize,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import guidelinesService, { MedicalGuideline, GuidelineNote } from '@/lib/guidelines/service';

export default function GuidelineViewerPage() {
  const params = useParams();
  const guidelineId = params.id as string;
  
  const [guideline, setGuideline] = useState<MedicalGuideline | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState<GuidelineNote[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (guidelineId) {
      const fetchedGuideline = guidelinesService.getGuideline(guidelineId);
      if (fetchedGuideline) {
        setGuideline(fetchedGuideline);
        guidelinesService.trackAccess(guidelineId);
        
        const userId = 'current-user'; // In real app, get from auth
        setIsBookmarked(guidelinesService.isBookmarked(userId, guidelineId));
        setNotes(guidelinesService.getGuidelineNotes(userId, guidelineId));
      }
      setIsLoading(false);
    }
  }, [guidelineId]);

  const handleBookmark = async () => {
    if (!guideline) return;
    
    const userId = 'current-user'; // In real app, get from auth
    
    if (isBookmarked) {
      await guidelinesService.removeBookmark(userId, guideline.id);
    } else {
      await guidelinesService.bookmarkGuideline(userId, guideline.id);
    }
    
    setIsBookmarked(!isBookmarked);
  };

  const handleAddNote = async (pageNumber: number, content: string, type: 'note' | 'highlight' = 'note') => {
    if (!guideline) return;
    
    const userId = 'current-user'; // In real app, get from auth
    await guidelinesService.addNote(userId, guideline.id, pageNumber, content, type);
    
    // Refresh notes
    const updatedNotes = guidelinesService.getGuidelineNotes(userId, guideline.id);
    setNotes(updatedNotes);
  };

  const handleShare = async () => {
    if (!guideline) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: guideline.title,
          text: guideline.description,
          url: window.location.href
        });
      } catch (error) {
        logger.debug('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const getPageNotes = (pageNumber: number) => {
    return notes.filter(note => note.pageNumber === pageNumber);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!guideline) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Guideline Not Found</h2>
          <p className="text-gray-600 mb-4">The requested guideline could not be found.</p>
          <Link href="/guidelines" className="text-blue-600 hover:text-blue-700">
            ← Back to Guidelines
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link 
                href="/guidelines" 
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="max-w-2xl">
                <h1 className="text-xl font-bold text-gray-900 truncate">{guideline.title}</h1>
                <p className="text-sm text-gray-600">{guideline.organization} • {guideline.version}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBookmark}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                {isBookmarked ? 
                  <BookmarkCheck className="h-5 w-5 text-blue-600" /> : 
                  <Bookmark className="h-5 w-5 text-gray-600" />
                }
              </button>
              
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Toggle notes"
              >
                <MessageSquare className="h-5 w-5 text-gray-600" />
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Share"
              >
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
              
              <button
                onClick={handlePrint}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Print"
              >
                <Printer className="h-5 w-5 text-gray-600" />
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Fullscreen"
              >
                <Maximize className="h-5 w-5 text-gray-600" />
              </button>
              
              <a
                href={guideline.fileUrl}
                download
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* PDF Viewer */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="bg-white border-b px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={currentPage}
                      onChange={(e) => setCurrentPage(Math.min(guideline.pageCount, Math.max(1, parseInt(e.target.value) || 1)))}
                      className="w-16 px-2 py-1 border rounded text-center"
                      min="1"
                      max={guideline.pageCount}
                    />
                    <span className="text-sm text-gray-600">of {guideline.pageCount}</span>
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(guideline.pageCount, currentPage + 1))}
                    disabled={currentPage === guideline.pageCount}
                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="h-6 border-l border-gray-300"></div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setZoom(Math.max(25, zoom - 25))}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  
                  <span className="text-sm text-gray-600 min-w-[60px] text-center">{zoom}%</span>
                  
                  <button
                    onClick={() => setZoom(Math.min(200, zoom + 25))}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>
                
                <button
                  onClick={() => setRotation((rotation + 90) % 360)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <RotateCw className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search in document..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-1 border rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PDF Content Area */}
          <div className="bg-gray-200 min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
              {/* Mock PDF Page */}
              <div 
                className="bg-white shadow-lg mx-auto"
                style={{ 
                  transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                  transformOrigin: 'center top',
                  width: '8.5in',
                  minHeight: '11in',
                  padding: '1in'
                }}
              >
                <div className="relative">
                  {/* Mock PDF content */}
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{guideline.title}</h1>
                    <p className="text-gray-600">{guideline.organization}</p>
                    <p className="text-sm text-gray-500">Version {guideline.version} • Page {currentPage} of {guideline.pageCount}</p>
                  </div>
                  
                  <div className="space-y-4 text-sm leading-relaxed text-gray-800">
                    <p>
                      This is a mock PDF viewer showing page {currentPage} of the {guideline.title}. 
                      In a real implementation, this would display the actual PDF content using a library like PDF.js.
                    </p>
                    
                    <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                      Clinical Guidelines and Recommendations
                    </h2>
                    
                    <p>
                      The guidelines presented in this document are based on the latest evidence-based research 
                      and expert consensus from {guideline.organization}. These recommendations should be 
                      considered in the context of individual patient circumstances and clinical judgment.
                    </p>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                      <h3 className="font-semibold text-blue-900 mb-2">Evidence Level: {guideline.evidenceLevel}</h3>
                      <p className="text-blue-800">
                        This guideline represents {guideline.evidenceLevel === 'A' ? 'high-quality' : 
                        guideline.evidenceLevel === 'B' ? 'moderate-quality' : 'low-quality'} evidence 
                        based on systematic reviews and randomized controlled trials.
                      </p>
                    </div>
                    
                    <p>
                      For more detailed information and complete clinical protocols, please refer to the 
                      full document available for download. This guideline was last updated on{' '}
                      {new Date(guideline.lastUpdated).toLocaleDateString()}.
                    </p>
                  </div>
                  
                  {/* Page notes overlay */}
                  {getPageNotes(currentPage).map(note => (
                    <div
                      key={note.id}
                      className="absolute bg-yellow-200 border border-yellow-400 p-2 rounded shadow-sm max-w-xs"
                      style={{
                        top: note.position?.y || '50%',
                        left: note.position?.x || '80%'
                      }}
                    >
                      <div className="text-xs font-medium text-yellow-900 mb-1">
                        {note.type === 'highlight' ? '🖍️ Highlight' : '📝 Note'}
                      </div>
                      <div className="text-sm text-yellow-800">{note.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Sidebar */}
        {showNotes && (
          <div className="w-80 bg-white border-l shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <StickyNote className="h-4 w-4 mr-2" />
                Notes & Annotations
              </h3>
            </div>
            
            <div className="p-4">
              {/* Add note form */}
              <div className="mb-4">
                <textarea
                  placeholder="Add a note for this page..."
                  className="w-full p-3 border rounded-lg text-sm resize-none"
                  rows={3}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      const content = (e.target as HTMLTextAreaElement).value;
                      if (content.trim()) {
                        handleAddNote(currentPage, content);
                        (e.target as HTMLTextAreaElement).value = '';
                      }
                    }
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">Ctrl+Enter to save</p>
              </div>
              
              {/* Notes list */}
              <div className="space-y-3">
                {getPageNotes(currentPage).map(note => (
                  <div key={note.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600">
                        {note.type === 'highlight' ? '🖍️ Highlight' : '📝 Note'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800">{note.content}</p>
                  </div>
                ))}
                
                {getPageNotes(currentPage).length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8">
                    No notes on this page yet.
                  </p>
                )}
              </div>
              
              {/* All notes summary */}
              {notes.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    All Notes ({notes.length})
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notes.map(note => (
                      <div 
                        key={note.id} 
                        className="text-xs p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                        onClick={() => setCurrentPage(note.pageNumber)}
                      >
                        <div className="font-medium text-gray-600 mb-1">Page {note.pageNumber}</div>
                        <div className="text-gray-800 line-clamp-2">{note.content}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}