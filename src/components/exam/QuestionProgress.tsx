import React from 'react';
import { Flag, CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface QuestionProgressProps {
  questions: any[];
  currentQuestionIndex: number;
  selectedAnswers: { [key: number]: number };
  flaggedQuestions: Set<number>;
  onQuestionSelect: (index: number) => void;
  showCorrectAnswers?: boolean;
}

export function QuestionProgress({ 
  questions, 
  currentQuestionIndex, 
  selectedAnswers, 
  flaggedQuestions, 
  onQuestionSelect,
  showCorrectAnswers = false
}: QuestionProgressProps) {
  const getQuestionStatus = (index: number) => {
    const isAnswered = selectedAnswers[index] !== undefined;
    const isCurrent = index === currentQuestionIndex;
    const isFlagged = flaggedQuestions.has(index);
    
    if (showCorrectAnswers && isAnswered) {
      const isCorrect = selectedAnswers[index] === questions[index].correctIndex;
      return isCorrect ? 'correct' : 'incorrect';
    }
    
    if (isCurrent) return 'current';
    if (isAnswered) return 'answered';
    return 'unanswered';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300';
      case 'answered':
        return 'bg-emerald-500 text-white border border-emerald-600 shadow-md hover:bg-emerald-600';
      case 'correct':
        return 'bg-green-600 text-white border border-green-700 shadow-md';
      case 'incorrect':
        return 'bg-red-500 text-white border border-red-600 shadow-md';
      default:
        return 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300';
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const flaggedCount = flaggedQuestions.size;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Question Navigation</h3>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">{currentQuestionIndex + 1}/{questions.length}</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-center">
        <div className="p-2 bg-blue-50 rounded-lg">
          <div className="text-lg font-bold text-blue-600">{answeredCount}</div>
          <div className="text-xs text-blue-700">Answered</div>
        </div>
        <div className="p-2 bg-red-50 rounded-lg">
          <div className="text-lg font-bold text-red-600">{flaggedCount}</div>
          <div className="text-xs text-red-700">Flagged</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round((answeredCount / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Question Grid */}
      <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-5 gap-1 sm:gap-2 mb-4">
        {questions.map((question, index) => {
          const status = getQuestionStatus(index);
          const isFlagged = flaggedQuestions.has(index);
          
          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={`
                relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium 
                touch-manipulation transition-all duration-200 
                ${getStatusColor(status)}
                ${index === currentQuestionIndex ? 'scale-110' : 'hover:scale-105'}
              `}
              title={`Question ${index + 1}${isFlagged ? ' (Flagged)' : ''}`}
            >
              {index + 1}
              {isFlagged && (
                <Flag className="w-3 h-3 text-red-500 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
              )}
              {status === 'correct' && (
                <CheckCircle className="w-3 h-3 text-white absolute -bottom-1 -right-1" />
              )}
              {status === 'incorrect' && (
                <Circle className="w-3 h-3 text-white absolute -bottom-1 -right-1" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="border-t border-gray-200 pt-3">
        <p className="text-xs font-medium text-gray-700 mb-2">Legend:</p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
            <span>Current Question</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-emerald-500 rounded mr-2"></div>
            <span>Answered</span>
          </div>
          {showCorrectAnswers && (
            <>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-600 rounded mr-2"></div>
                <span>Correct Answer</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                <span>Incorrect Answer</span>
              </div>
            </>
          )}
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded mr-2"></div>
            <span>Not Answered</span>
          </div>
          <div className="flex items-center">
            <Flag className="w-3 h-3 text-red-500 mr-2" />
            <span>Flagged for Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}