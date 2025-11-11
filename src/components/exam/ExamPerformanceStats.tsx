import React from 'react';
import { Clock, Trophy, Target, TrendingUp, BookOpen } from 'lucide-react';

interface ExamPerformanceStatsProps {
  answeredCount: number;
  totalQuestions: number;
  correctCount: number;
  currentStreak: number;
  timePerQuestion: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export function ExamPerformanceStats({ 
  answeredCount, 
  totalQuestions, 
  correctCount, 
  currentStreak, 
  timePerQuestion,
  difficulty 
}: ExamPerformanceStatsProps) {
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
        Performance Dashboard
      </h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Progress */}
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{progress}%</div>
          <div className="text-sm text-blue-700">Progress</div>
          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Accuracy */}
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
          <div className="text-sm text-green-700">Accuracy</div>
          <div className="text-xs text-gray-600 mt-1">
            {correctCount}/{answeredCount} correct
          </div>
        </div>

        {/* Streak */}
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{currentStreak}</div>
          <div className="text-sm text-orange-700">Current Streak</div>
          <div className="flex justify-center mt-1">
            {currentStreak > 0 && (
              <Trophy className="w-4 h-4 text-orange-500" />
            )}
          </div>
        </div>

        {/* Time per Question */}
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(timePerQuestion)}s
          </div>
          <div className="text-sm text-purple-700">Avg Time</div>
          <div className="flex justify-center mt-1">
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Difficulty Indicator */}
      <div className="mt-4 flex items-center justify-center">
        <Target className="w-4 h-4 mr-2 text-gray-500" />
        <span className="text-sm text-gray-600 mr-2">Current Difficulty:</span>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          difficulty === 'easy' 
            ? 'bg-green-100 text-green-800'
            : difficulty === 'medium'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </span>
      </div>

      {/* Performance Tips */}
      {accuracy < 70 && answeredCount > 5 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <BookOpen className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Study Tip</h4>
              <p className="text-sm text-yellow-700">
                Consider reviewing the explanations after each question to improve understanding.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}