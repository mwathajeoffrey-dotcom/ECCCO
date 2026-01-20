import React from 'react';
import { Clock, Play, BookOpen, Settings } from 'lucide-react';

interface StudyModeToggleProps {
  isStudyMode: boolean;
  onToggle: (enabled: boolean) => void;
  showAnswerAfterAttempt: boolean;
  onShowAnswerToggle: (enabled: boolean) => void;
  timeRemaining?: number;
}

export function StudyModeToggle({ 
  isStudyMode, 
  onToggle, 
  showAnswerAfterAttempt, 
  onShowAnswerToggle,
  timeRemaining 
}: StudyModeToggleProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-blue-600" />
          Study Preferences
        </h3>
        {!isStudyMode && timeRemaining && (
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className={timeRemaining < 300 ? 'text-red-600 font-medium' : ''}>
              {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {/* Study Mode Toggle */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            {isStudyMode ? (
              <BookOpen className="w-5 h-5 text-green-600 mr-3" />
            ) : (
              <Play className="w-5 h-5 text-blue-600 mr-3" />
            )}
            <div>
              <div className="font-medium text-gray-900">
                {isStudyMode ? 'Study Mode' : 'Exam Mode'}
              </div>
              <div className="text-sm text-gray-600">
                {isStudyMode 
                  ? 'No time limit, learn at your own pace' 
                  : 'Timed exam with performance tracking'
                }
              </div>
            </div>
          </div>
          <button
            onClick={() => onToggle(!isStudyMode)}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${isStudyMode ? 'bg-green-600' : 'bg-gray-300'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${isStudyMode ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {/* Show Answer Toggle */}
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div>
            <div className="font-medium text-blue-900 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Show Explanations
            </div>
            <div className="text-sm text-blue-700">
              Reveal correct answers and explanations after each attempt
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showAnswerAfterAttempt}
              onChange={(e) => onShowAnswerToggle(e.target.checked)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Mode Benefits */}
        <div className="text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
          {isStudyMode ? (
            <div>
              <div className="font-medium text-gray-800 mb-1">Study Mode Benefits:</div>
              <ul className="space-y-1">
                <li>• No time pressure for thoughtful consideration</li>
                <li>• Immediate feedback and learning</li>
                <li>• Perfect for reviewing difficult topics</li>
              </ul>
            </div>
          ) : (
            <div>
              <div className="font-medium text-gray-800 mb-1">Exam Mode Benefits:</div>
              <ul className="space-y-1">
                <li>• Realistic exam simulation with timer</li>
                <li>• Performance analytics and scoring</li>
                <li>• Builds test-taking confidence</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}