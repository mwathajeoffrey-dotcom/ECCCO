'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Download, Bookmark, BookmarkCheck, ZoomIn, ZoomOut, Printer } from 'lucide-react';

interface Guideline {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  fileUrl: string;
}

export default function GuidelineViewerPage() {
  const params = useParams();
  const router = useRouter();
  const guidelineId = params.id as string;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [guideline, setGuideline] = useState<Guideline | null>(null);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const guidelines: Record<string, Guideline> = {
      '1': {
        id: '1',
        title: 'ACLS Provider Manual',
        organization: 'American Heart Association',
        year: '2020',
        description: 'Advanced Cardiovascular Life Support guidelines',
        fileUrl: '/guidelines/pdfs/acls-2020.pdf'
      },
      '2': {
        id: '2',
        title: 'PALS Provider Manual',
        organization: 'American Heart Association',
        year: '2020',
        description: 'Pediatric Advanced Life Support',
        fileUrl: '/guidelines/pdfs/pals-2020.pdf'
      },
      '3': {
        id: '3',
        title: 'Sepsis Management Guidelines',
        organization: 'Surviving Sepsis Campaign',
        year: '2021',
        description: 'International guidelines for sepsis management',
        fileUrl: '/guidelines/pdfs/sepsis-2021.pdf'
      }
    };

    const found = guidelines[guidelineId];
    if (found) {
      setGuideline(found);
    }
  }, [guidelineId]);

  if (!guideline) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Guideline Not Found</h2>
          <Link href="/guidelines" className="text-blue-600 hover:text-blue-700">
            ← Back to Guidelines
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/guidelines" className="text-gray-600 hover:text-gray-900">
                <ChevronLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{guideline.title}</h1>
                <p className="text-sm text-gray-600">{guideline.organization} • {guideline.year}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-5 h-5 text-blue-600" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
                <span className="text-sm">Bookmark</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Printer className="w-5 h-5" />
                <span className="text-sm">Print</span>
              </button>
              
              <a
                href={guideline.fileUrl}
                download
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span className="text-sm">Download</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* PDF will be embedded here */}
          <div className="aspect-[8.5/11] w-full flex items-center justify-center bg-gray-100 border-4 border-gray-200">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">PDF Viewer</h3>
              <p className="text-gray-600 mb-4">
                This is a placeholder for the PDF viewer component.
              </p>
              <p className="text-sm text-gray-500 mb-4">
                In production, this would display: <br />
                <code className="bg-gray-200 px-2 py-1 rounded">{guideline.fileUrl}</code>
              </p>
              <a
                href={guideline.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Open in New Tab
              </a>
            </div>
          </div>
        </div>

        {/* Document Info */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">About This Document</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Title:</span>
                <span className="text-gray-900 font-medium">{guideline.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Organization:</span>
                <span className="text-gray-900 font-medium">{guideline.organization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Year:</span>
                <span className="text-gray-900 font-medium">{guideline.year}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Description</h3>
            <p className="text-sm text-gray-600">{guideline.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
