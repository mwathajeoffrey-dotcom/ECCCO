'use client';

import React, { useState } from 'react';
import { AlertTriangle, Play, Trash2, Clock, BookOpen, Download, Upload } from 'lucide-react';

interface SessionRecoveryProps {
  sessionInfo: {
    topicName: string;
    progress: string;
    timeSpent: string;
    lastSaved: string;
  };
  onRecover: () => void;
  onDiscard: () => void;
  onExport?: () => void;
  onImport?: (data: string) => void;
  className?: string;
}

export function SessionRecoveryModal({ 
  sessionInfo, 
  onRecover, 
  onDiscard,
  onExport,
  onImport,
  className = '' 
}: SessionRecoveryProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [importData, setImportData] = useState('');

  const handleImport = () => {
    if (onImport && importData.trim()) {
      onImport(importData.trim());
      setIsImporting(false);
      setImportData('');
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (onImport) {
          onImport(content);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${className}`}>
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto transform transition-all">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Previous Session Found</h3>
              <p className="text-sm text-gray-600">Would you like to continue where you left off?</p>
            </div>
          </div>
        </div>

        {/* Session Details */}
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Topic:</span>
              <span className="text-sm text-gray-900 font-semibold">{sessionInfo.topicName}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Progress:</span>
              <span className="text-sm text-gray-900">{sessionInfo.progress}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Time Spent:</span>
              <span className="text-sm text-gray-900">{sessionInfo.timeSpent}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Last Saved:</span>
              <span className="text-sm text-gray-900">{sessionInfo.lastSaved}</span>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <strong>Note:</strong> Starting a new exam will permanently delete this saved session.
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50 rounded-b-xl space-y-3">
          {/* Primary Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onRecover}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Continue Session</span>
            </button>
            
            <button
              onClick={onDiscard}
              className="flex items-center justify-center space-x-2 border border-red-300 text-red-700 px-4 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Start Fresh</span>
            </button>
          </div>

          {/* Secondary Actions */}
          {(onExport || onImport) && (
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-3">
                {onExport && (
                  <button
                    onClick={onExport}
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Session</span>
                  </button>
                )}
                
                {onImport && (
                  <button
                    onClick={() => setIsImporting(!isImporting)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm font-medium"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Import Session</span>
                  </button>
                )}
              </div>

              {/* Import Panel */}
              {isImporting && onImport && (
                <div className="mt-3 space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="file"
                      accept=".json,.txt"
                      onChange={handleFileImport}
                      className="hidden"
                      id="session-file-import"
                    />
                    <label
                      htmlFor="session-file-import"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer text-center"
                    >
                      Choose File
                    </label>
                  </div>
                  
                  <div className="text-center text-xs text-gray-500">or paste session data:</div>
                  
                  <textarea
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    placeholder="Paste exported session data here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                    rows={3}
                  />
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={handleImport}
                      disabled={!importData.trim()}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Import & Continue
                    </button>
                    <button
                      onClick={() => {
                        setIsImporting(false);
                        setImportData('');
                      }}
                      className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface QuickRecoveryBannerProps {
  sessionInfo: {
    topicName: string;
    progress: string;
  };
  onRecover: () => void;
  onDismiss: () => void;
  className?: string;
}

export function QuickRecoveryBanner({ 
  sessionInfo, 
  onRecover, 
  onDismiss,
  className = '' 
}: QuickRecoveryBannerProps) {
  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-900">Continue Previous Session</h4>
            <p className="text-xs text-blue-700">
              {sessionInfo.topicName} - {sessionInfo.progress}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onRecover}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
          <button
            onClick={onDismiss}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

interface SessionExportModalProps {
  sessionData: string;
  onClose: () => void;
  className?: string;
}

export function SessionExportModal({ sessionData, onClose, className = '' }: SessionExportModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sessionData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([sessionData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eccco-exam-session-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${className}`}>
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Export Session Data</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Save your exam session to continue later or on another device.
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          <textarea
            value={sessionData}
            readOnly
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg text-xs font-mono bg-gray-50 resize-none"
          />
          
          <div className="flex space-x-3">
            <button
              onClick={handleCopy}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                copied 
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? (
                <>
                  <span>✓</span>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Copy to Clipboard</span>
                </>
              )}
            </button>
            
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}