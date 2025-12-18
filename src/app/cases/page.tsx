// Case-Based Learning Mode
'use client';

import { useState, useEffect } from 'react';
import { FileText, ChevronRight, CheckCircle, XCircle, Brain, Award, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { allCases, CaseScenario } from '@/lib/cases/clinical-cases';
import BookmarkButton from '@/components/BookmarkButton';
import QuestionRating from '@/components/QuestionRating';

export default function CasesPage() {
  const [selectedCase, setSelectedCase] = useState<CaseScenario | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [caseComplete, setCaseComplete] = useState(false);
  const [userId, setUserId] = useState('');

  // Get or create session ID
  useEffect(() => {
    let sessionId = localStorage.getItem('eccco_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('eccco_session_id', sessionId);
    }
    setUserId(sessionId);
  }, []);

  const startCase = (caseScenario: CaseScenario) => {
    setSelectedCase(caseScenario);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowExplanation(false);
    setCaseComplete(false);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (!selectedCase) return;

    if (currentQuestionIndex < selectedCase.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      setCaseComplete(true);
    }
  };

  const resetCase = () => {
    setSelectedCase(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowExplanation(false);
    setCaseComplete(false);
  };

  // Calculate score
  const calculateScore = () => {
    if (!selectedCase) return { correct: 0, total: 0, percentage: 0 };

    const correct = userAnswers.filter(
      (answer, idx) => answer === selectedCase.questions[idx].correctIndex
    ).length;
    const total = selectedCase.questions.length;
    const percentage = Math.round((correct / total) * 100);

    return { correct, total, percentage };
  };

  // Case Selection View
  if (!selectedCase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Case-Based Learning</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master clinical reasoning with realistic patient scenarios. Each case presents a clinical situation followed by sequential questions that test your decision-making skills.
            </p>
          </div>

          {/* Cases Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 cursor-pointer border-2 border-transparent hover:border-purple-500"
                onClick={() => startCase(caseItem)}
              >
                {/* Difficulty Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    caseItem.difficulty === 'easy'
                      ? 'bg-green-100 text-green-700'
                      : caseItem.difficulty === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {caseItem.difficulty.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                    {caseItem.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {caseItem.title}
                </h3>

                {/* Preview */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {caseItem.presentation.substring(0, 150)}...
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">
                    {caseItem.questions.length} Questions
                  </span>
                  <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm">
                    Start Case
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How Case-Based Learning Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Read the Case</h3>
                <p className="text-sm text-gray-600">
                  Review the patient presentation, vital signs, physical exam, and initial test results.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                  <Brain className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Answer Questions</h3>
                <p className="text-sm text-gray-600">
                  Work through sequential questions that simulate real clinical decision-making.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Learn & Master</h3>
                <p className="text-sm text-gray-600">
                  Review detailed explanations and key learning points after each question.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Case Complete View
  if (caseComplete) {
    const score = calculateScore();

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Score Display */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mb-4">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Case Complete!</h2>
              <p className="text-xl text-gray-600">
                You scored <span className="font-bold text-purple-600">{score.correct}/{score.total}</span> ({score.percentage}%)
              </p>
            </div>

            {/* Performance Feedback */}
            <div className={`p-6 rounded-xl mb-8 ${
              score.percentage >= 80
                ? 'bg-green-50 border-2 border-green-200'
                : score.percentage >= 60
                ? 'bg-yellow-50 border-2 border-yellow-200'
                : 'bg-red-50 border-2 border-red-200'
            }`}>
              <h3 className="font-bold text-gray-900 mb-2">
                {score.percentage >= 80
                  ? '🎉 Excellent Performance!'
                  : score.percentage >= 60
                  ? '👍 Good Job!'
                  : '📚 Keep Learning!'}
              </h3>
              <p className="text-sm text-gray-700">
                {score.percentage >= 80
                  ? 'You demonstrated strong clinical reasoning and decision-making skills.'
                  : score.percentage >= 60
                  ? 'You have a good foundation. Review the learning points to strengthen weak areas.'
                  : 'This is a challenging case. Review the explanations carefully and try again.'}
              </p>
            </div>

            {/* Key Learning Points */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Key Learning Points</h3>
              <div className="space-y-2">
                {selectedCase.learningPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-600 font-bold flex-shrink-0">{idx + 1}.</span>
                    <p className="text-sm text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={resetCase}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
              >
                Back to Cases
              </button>
              <button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setUserAnswers([]);
                  setShowExplanation(false);
                  setCaseComplete(false);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question View
  const currentQuestion = selectedCase.questions[currentQuestionIndex];
  const isCorrect = userAnswers[currentQuestionIndex] === currentQuestion.correctIndex;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Header */}
        <div className="mb-6">
          <button
            onClick={resetCase}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Exit Case</span>
          </button>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">{selectedCase.title}</h2>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold">
              Question {currentQuestionIndex + 1} of {selectedCase.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((currentQuestionIndex + 1) / selectedCase.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Case Presentation (only on first question) */}
        {currentQuestionIndex === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Clinical Case</h3>
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
              {selectedCase.presentation}
            </div>
          </div>
        )}

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">{currentQuestion.question}</h3>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option: string, idx: number) => {
              const isSelected = userAnswers[currentQuestionIndex] === idx;
              const isCorrectOption = idx === currentQuestion.correctIndex;

              return (
                <button
                  key={idx}
                  onClick={() => !showExplanation && handleAnswer(idx)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showExplanation
                      ? isCorrectOption
                        ? 'border-green-500 bg-green-50'
                        : isSelected
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 bg-gray-50'
                      : isSelected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showExplanation && isCorrectOption && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                    {showExplanation && isSelected && !isCorrectOption && (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="space-y-4">
              {/* Result Badge */}
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-orange-50'}`}>
                <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-orange-800'}`}>
                  {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                </p>
              </div>

              {/* Explanation Text */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">📖 Explanation:</h4>
                <div className="prose prose-sm max-w-none text-gray-700">
                  {currentQuestion.explanation}
                </div>
                {currentQuestion.references && currentQuestion.references.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs font-semibold text-gray-700 mb-2">References:</p>
                    {currentQuestion.references.map((ref: string, idx: number) => (
                      <p key={idx} className="text-xs text-blue-600 block">
                        {ref}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Bookmark & Rating */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <BookmarkButton
                  questionId={currentQuestion.id}
                  category={selectedCase.category}
                />
              </div>

              <QuestionRating questionId={currentQuestion.id} />

              {/* Next Button */}
              <button
                onClick={nextQuestion}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all font-semibold flex items-center justify-center gap-2"
              >
                {currentQuestionIndex < selectedCase.questions.length - 1 ? (
                  <>
                    Next Question
                    <ChevronRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Complete Case
                    <Award className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
