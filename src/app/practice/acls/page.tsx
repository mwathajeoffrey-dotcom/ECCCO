/**
 * ACLS Practice Page
 * Practice Advanced Cardiovascular Life Support questions
 */

'use client';

import { useState, useEffect } from 'react';
import { Activity, Heart, Zap, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface Question {
  id: string;
  question: string;  // Changed from 'text' to match API
  options: string[];
  correctIndex: number;
  explanation?: string;
  category: string;
  topic?: string;
  difficulty?: string;
  references?: string[];
  topicId?: string;
}

export default function ACLSPracticePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const questionIdParam = searchParams.get('questionId');
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [showAnswersImmediately, setShowAnswersImmediately] = useState(true);

  useEffect(() => {
    // Load setting from localStorage
    const setting = localStorage.getItem('showAnswersImmediately');
    if (setting !== null) {
      setShowAnswersImmediately(setting === 'true');
    }
  }, []);

  useEffect(() => {
    // Fetch ACLS questions from API
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/questions?category=ACLS&limit=20');
        if (!response.ok) throw new Error('Failed to fetch questions');
        
        const data = await response.json();
        if (data.success && Array.isArray(data.questions)) {
          setQuestions(data.questions);
          
          // If questionId is provided, find and set that question as current
          if (questionIdParam && data.questions.length > 0) {
            const questionIndex = data.questions.findIndex((q: Question) => q.id === questionIdParam);
            if (questionIndex !== -1) {
              setCurrentQuestionIndex(questionIndex);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching ACLS questions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [questionIdParam]);

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return; // Prevent changing answer after submission
    
    setSelectedAnswer(index);
    
    // Only show explanation immediately if setting is enabled
    if (showAnswersImmediately) {
      setShowExplanation(true);
    }
    
    // Update score
    const currentQuestion = questions[currentQuestionIndex];
    if (index === currentQuestion.correctIndex) {
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setScore(prev => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null && !showExplanation) {
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Practice session complete
      alert(`Practice Complete!\n\nScore: ${score.correct}/${score.total + 1}\nAccuracy: ${Math.round(((score.correct + (selectedAnswer === questions[currentQuestionIndex].correctIndex ? 1 : 0)) / (score.total + 1)) * 100)}%`);
      router.push('/practice');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ACLS Practice Questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No ACLS Questions Available</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any ACLS practice questions. Please try again later or contact support.
            </p>
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              Back to Practice
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ACLS Practice</h1>
                <p className="text-sm text-gray-600">Advanced Cardiovascular Life Support</p>
              </div>
            </div>
            
            {/* Score */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Score</div>
                <div className="text-2xl font-bold text-gray-900">
                  {score.correct}/{score.total}
                </div>
              </div>
              <Link
                href="/practice"
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Exit
              </Link>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Question */}
          <div className="mb-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">{currentQuestionIndex + 1}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 flex-1">
                {currentQuestion.question}
              </h2>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctIndex;
              const showResult = showExplanation;

              let optionClass = 'border-gray-200 hover:border-blue-300 hover:bg-blue-50';
              if (showResult) {
                if (isCorrect) {
                  optionClass = 'border-green-500 bg-green-50';
                } else if (isSelected && !isCorrect) {
                  optionClass = 'border-red-500 bg-red-50';
                } else {
                  optionClass = 'border-gray-200 opacity-60';
                }
              } else if (isSelected) {
                optionClass = 'border-blue-500 bg-blue-50';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${optionClass} ${
                    showExplanation ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                      {showResult && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      {!showResult && (
                        <span className="text-gray-600 font-semibold">
                          {String.fromCharCode(65 + index)}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && currentQuestion.explanation && (
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Explanation</h3>
                  <p className="text-blue-800 text-sm">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Answer Button (when show answers immediately is disabled) */}
          {!showAnswersImmediately && selectedAnswer !== null && !showExplanation && (
            <button
              onClick={handleSubmitAnswer}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2 mb-6"
            >
              Submit Answer
              <CheckCircle className="w-5 h-5" />
            </button>
          )}

          {/* Next Button */}
          {showExplanation && (
            <button
              onClick={handleNextQuestion}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Finish Practice
                  <CheckCircle className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs text-gray-600">Category</div>
                <div className="font-semibold text-gray-900">ACLS</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xs text-gray-600">Correct</div>
                <div className="font-semibold text-gray-900">{score.correct}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-xs text-gray-600">Accuracy</div>
                <div className="font-semibold text-gray-900">
                  {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
