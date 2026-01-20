import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle, Pause, Play } from 'lucide-react';

interface EnhancedTimerProps {
  timeRemaining: number;
  totalTime: number;
  isActive: boolean;
  onTimeUp: () => void;
  onPause?: () => void;
  onResume?: () => void;
  isPaused?: boolean;
  showWarnings?: boolean;
}

export function EnhancedTimer({ 
  timeRemaining, 
  totalTime, 
  isActive, 
  onTimeUp,
  onPause,
  onResume,
  isPaused = false,
  showWarnings = true 
}: EnhancedTimerProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const percentage = (timeRemaining / totalTime) * 100;
  
  // Calculate time status
  const isWarning = timeRemaining <= 600; // 10 minutes
  const isCritical = timeRemaining <= 300; // 5 minutes
  const isDanger = timeRemaining <= 60; // 1 minute

  // Blinking effect for critical time
  useEffect(() => {
    if (isDanger && isActive && !isPaused) {
      const interval = setInterval(() => {
        setIsBlinking(prev => !prev);
      }, 500);
      return () => clearInterval(interval);
    } else {
      setIsBlinking(false);
    }
  }, [isDanger, isActive, isPaused]);

  // Call onTimeUp when time reaches 0
  useEffect(() => {
    if (timeRemaining <= 0 && isActive) {
      onTimeUp();
    }
  }, [timeRemaining, isActive, onTimeUp]);

  const getTimerColor = () => {
    if (isDanger) return 'text-red-600';
    if (isCritical) return 'text-orange-600';
    if (isWarning) return 'text-yellow-600';
    return 'text-gray-900';
  };

  const getProgressColor = () => {
    if (isDanger) return 'bg-red-600';
    if (isCritical) return 'bg-orange-500';
    if (isWarning) return 'bg-yellow-500';
    return 'bg-blue-600';
  };

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Timer Display */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Clock className={`w-5 h-5 mr-2 ${getTimerColor()}`} />
          <span className="text-sm font-medium text-gray-700">Time Remaining</span>
        </div>
        
        {/* Pause/Resume Button */}
        {(onPause || onResume) && (
          <button
            onClick={isPaused ? onResume : onPause}
            className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            disabled={!isActive}
          >
            {isPaused ? <Play className="w-4 h-4 mr-1" /> : <Pause className="w-4 h-4 mr-1" />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}
      </div>

      {/* Time Display */}
      <div className="text-center mb-4">
        <div 
          className={`
            text-3xl sm:text-4xl font-mono font-bold transition-all duration-300
            ${getTimerColor()}
            ${isBlinking ? 'opacity-50' : 'opacity-100'}
            ${isPaused ? 'line-through opacity-75' : ''}
          `}
        >
          {formatTime(timeRemaining)}
        </div>
        
        {isPaused && (
          <div className="text-sm text-gray-600 mt-1 flex items-center justify-center">
            <Pause className="w-4 h-4 mr-1" />
            Exam Paused
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
            style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0:00</span>
          <span>{formatTime(totalTime)}</span>
        </div>
      </div>

      {/* Time Warnings */}
      {showWarnings && isActive && !isPaused && (
        <div className="space-y-2">
          {isDanger && (
            <div className="flex items-center p-2 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
              <span className="text-sm text-red-800 font-medium">
                Final minute! Submit soon to avoid timeout.
              </span>
            </div>
          )}
          
          {isCritical && !isDanger && (
            <div className="flex items-center p-2 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-orange-600 mr-2" />
              <span className="text-sm text-orange-800">
                5 minutes remaining. Consider reviewing flagged questions.
              </span>
            </div>
          )}
          
          {isWarning && !isCritical && (
            <div className="flex items-center p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-sm text-yellow-800">
                10 minutes left. Start reviewing your answers.
              </span>
            </div>
          )}
        </div>
      )}

      {/* Time Statistics */}
      <div className="border-t border-gray-200 pt-3 mt-3">
        <div className="grid grid-cols-2 gap-4 text-center text-sm">
          <div>
            <div className="font-medium text-gray-900">
              {formatTime(totalTime - timeRemaining)}
            </div>
            <div className="text-gray-600">Time Elapsed</div>
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {Math.round(((totalTime - timeRemaining) / Math.max(1, totalTime - timeRemaining)) * 60)} sec
            </div>
            <div className="text-gray-600">Avg per Question</div>
          </div>
        </div>
      </div>
    </div>
  );
}