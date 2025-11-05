'use client';

import { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, Flag, BookOpen, CheckCircle, Download } from 'lucide-react';
import Link from 'next/link';
import { generateExamPDF } from '@/lib/pdf/generator';
import { EnhancedErrorBoundary } from '@/components/ui/EnhancedErrorBoundary';
import { UnitConversionDisplay, UnitConverterButton } from '@/components/ui/UnitConverter';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  references: string[];
  difficulty: string;
  topicId: string;
  imageDescription?: string;
  clinicalScenario?: string;
  patientPresentation?: {
    age: number | string;
    sex: string;
    vitals?: Record<string, string>;
  };
}

interface Topic {
  id: string;
  name: string;
  description?: string;
}

export default function ExamInterface() {
  // Core exam state
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  // Fetch topics on component mount
  useEffect(() => {
    const fetchTopics = async () => {
      setLoadingTopics(true);
      setApiError(null);
      try {
        const response = await fetch('/api/topics');
        if (!response.ok) throw new Error('Failed to fetch topics');
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
        setApiError('Failed to load topics. Please refresh the page.');
      } finally {
        setLoadingTopics(false);
      }
    };

    fetchTopics();
  }, []);

  // Timer effect
  useEffect(() => {
    if (!isExamStarted || isExamFinished || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamStarted, isExamFinished, timeRemaining]);

  const fetchExamQuestions = async (topicId: string) => {
    setLoadingQuestions(true);
    setApiError(null);
    try {
      const response = await fetch(`/api/questions?topicId=${topicId}&limit=30`);
      if (!response.ok) throw new Error('Failed to fetch questions');
      const data = await response.json();
      
      const examQuestions = data.questions || [];
      setQuestions(examQuestions);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setTimeRemaining(45 * 60);
      setIsExamStarted(true);
      setIsExamFinished(false);
      setShowResults(false);
      setScore(null);
      setShowCorrectAnswers(false);
      setFlaggedQuestions(new Set());
    } catch (error) {
      console.error('Error fetching exam questions:', error);
      setApiError('Failed to load exam questions. Please try again.');
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const toggleQuestionFlag = () => {
    setFlaggedQuestions(prev => {
      const newFlags = new Set(prev);
      if (newFlags.has(currentQuestionIndex)) {
        newFlags.delete(currentQuestionIndex);
      } else {
        newFlags.add(currentQuestionIndex);
      }
      return newFlags;
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const finishExam = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsExamFinished(true);
    setShowResults(true);
    
    // Save exam session to database
    try {
      await fetch('/api/exam-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: Date.now().toString(),
          topicId: selectedTopic,
          questions: questions.map(q => q.id),
          answers: Object.values(answers),
          score: finalScore,
          totalTime: (45 * 60) - timeRemaining,
          completed: true
        })
      });
    } catch (error) {
      console.error('Error saving exam session:', error);
    }
  };

  const handlePDFDownload = async () => {
    if (!showResults || score === null) return;
    
    try {
      const topic = topics.find(t => t.id === selectedTopic);
      await generateExamPDF({
        topicName: topic?.name || 'Exam',
        score,
        totalTime: (45 * 60) - timeRemaining,
        userAnswers: answers,
        questions: questions,
        completedAt: new Date()
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedTopic_ = topics.find(t => t.id === selectedTopic);

  // Topic Selection Screen
  if (!isExamStarted && !showResults) {
    return (
      <EnhancedErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">ECCCO Emergency Medicine Exam</h1>
              <p className="text-xl text-gray-600">Choose a topic to begin your practice exam</p>
            </div>

            {apiError && (
              <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
                {apiError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loadingTopics ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))
              ) : (
                topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopic(topic.id);
                      fetchExamQuestions(topic.id);
                    }}
                    disabled={loadingQuestions && selectedTopic === topic.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 text-left group hover:bg-blue-50"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <BookOpen className="w-8 h-8 text-blue-600 group-hover:text-blue-700" />
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>45 min</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-900">
                      {topic.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {topic.description || 'Practice questions for emergency medicine scenarios'}
                    </p>
                    {loadingQuestions && selectedTopic === topic.id && (
                      <div className="mt-4 text-blue-600 text-sm">Loading questions...</div>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </EnhancedErrorBoundary>
    );
  }

  // Exam Interface
  if (isExamStarted && !showResults) {
    return (
      <EnhancedErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  <ChevronLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-xl font-semibold text-gray-900">
                  {selectedTopic_?.name || 'Exam'}
                </h1>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span className={`font-mono text-lg ${timeRemaining < 300 ? 'text-red-600' : ''}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                <button
                  onClick={finishExam}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Finish Exam
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-sm text-gray-600">
                  {Object.keys(answers).length} answered
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="max-w-4xl mx-auto px-4 py-8">
            {currentQuestion && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Question {currentQuestionIndex + 1}
                    </span>
                    {flaggedQuestions.has(currentQuestionIndex) && (
                      <Flag className="w-5 h-5 text-orange-500 fill-current" />
                    )}
                  </div>
                  
                  <button
                    onClick={toggleQuestionFlag}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                      flaggedQuestions.has(currentQuestionIndex)
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Flag className={`w-4 h-4 ${flaggedQuestions.has(currentQuestionIndex) ? 'fill-current' : ''}`} />
                    <span className="text-sm">
                      {flaggedQuestions.has(currentQuestionIndex) ? 'Flagged' : 'Flag'}
                    </span>
                  </button>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-relaxed">
                    <UnitConversionDisplay text={currentQuestion.question} />
                  </h2>

                  {currentQuestion.clinicalScenario && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-400">
                      <h4 className="font-semibold text-blue-900 mb-2">Clinical Scenario:</h4>
                      <p className="text-blue-800">
                        <UnitConversionDisplay text={currentQuestion.clinicalScenario} />
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = answers[currentQuestionIndex] === index;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-6 rounded-xl border-3 text-left transition-all duration-200 flex items-center ${
                          isSelected
                            ? 'border-blue-600 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 shadow-xl ring-4 ring-blue-300 transform scale-[1.02] font-bold shadow-blue-200'
                            : 'border-gray-800 bg-white hover:bg-blue-50 hover:border-blue-600 hover:shadow-xl text-gray-900 font-bold shadow-gray-200 answer-option-default'
                        } cursor-pointer hover:scale-[1.01] active:scale-[0.99]`}
                        style={{
                          // Force ultra-high contrast styles for cross-device compatibility
                          color: '#000000',
                          backgroundColor: isSelected ? '#dbeafe' : '#ffffff',
                          borderColor: isSelected ? '#1d4ed8' : '#000000',
                          fontWeight: '900',
                          minHeight: '90px',
                          fontSize: '22px',
                          borderWidth: '5px',
                          boxShadow: isSelected ? '0 0 0 8px #93c5fd, 0 12px 20px -2px rgb(0 0 0 / 0.3)' : '0 8px 16px -2px rgb(0 0 0 / 0.4)'
                        }}
                      >
                        <div className="flex items-start">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold mr-3 sm:mr-4 text-sm sm:text-base flex-shrink-0 answer-badge ${
                            isSelected 
                              ? 'bg-blue-600 text-white ring-2 ring-blue-300' 
                              : 'bg-gray-800 text-white hover:bg-blue-600 hover:text-white'
                          }`}
                          style={{
                            // Force ultra-high contrast badge visibility across all devices
                            backgroundColor: isSelected ? '#1d4ed8' : '#000000',
                            color: '#ffffff',
                            fontWeight: '900',
                            width: '44px',
                            height: '44px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            marginRight: '20px',
                            fontSize: '20px',
                            border: '4px solid #333333'
                          }}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className={`text-xl leading-relaxed flex-1 font-black answer-text`}
                          style={{
                            // Force ultra-high contrast text visibility across all devices
                            color: '#000000',
                            fontWeight: '900',
                            fontSize: '22px',
                            lineHeight: '1.7',
                            textShadow: 'none'
                          }}>
                            <UnitConversionDisplay 
                              text={option}
                              className="inline"
                            />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              <UnitConverterButton />

              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </EnhancedErrorBoundary>
    );
  }

  // Results Screen
  if (showResults && score !== null) {
    return (
      <EnhancedErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="mb-8">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Complete!</h1>
                <p className="text-xl text-gray-600">
                  Topic: {selectedTopic_?.name || 'Unknown'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{score}%</div>
                  <div className="text-blue-800">Final Score</div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {Object.values(answers).filter((answer, index) => answer === questions[index]?.correctIndex).length}
                  </div>
                  <div className="text-green-800">Correct Answers</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {formatTime((45 * 60) - timeRemaining)}
                  </div>
                  <div className="text-purple-800">Time Taken</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={() => setShowCorrectAnswers(!showCorrectAnswers)}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>{showCorrectAnswers ? 'Hide' : 'Show'} Correct Answers</span>
                </button>
                <button
                  onClick={handlePDFDownload}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </button>
                <Link
                  href="/"
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-center justify-center"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>New Exam</span>
                </Link>
              </div>

              {showCorrectAnswers && (
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Review Questions</h3>
                  <div className="space-y-6">
                    {questions.map((question, qIndex) => {
                      const userAnswer = answers[qIndex];
                      const isCorrect = userAnswer === question.correctIndex;
                      
                      return (
                        <div key={qIndex} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Question {qIndex + 1}
                            </h4>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {isCorrect ? 'Correct' : 'Incorrect'}
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-4">
                            <UnitConversionDisplay text={question.question} />
                          </p>
                          
                          <div className="space-y-2 mb-4">
                            {question.options.map((option, oIndex) => (
                              <div key={oIndex} className={`p-3 rounded-lg border ${
                                oIndex === question.correctIndex 
                                  ? 'bg-green-50 border-green-200 text-green-800'
                                  : oIndex === userAnswer && !isCorrect
                                  ? 'bg-red-50 border-red-200 text-red-800'
                                  : 'bg-gray-50 border-gray-200 text-gray-700'
                              }`}>
                                <span className="font-medium mr-2">
                                  {String.fromCharCode(65 + oIndex)}.
                                </span>
                                <UnitConversionDisplay text={option} className="inline" />
                                {oIndex === question.correctIndex && (
                                  <CheckCircle className="w-4 h-4 text-green-600 inline ml-2" />
                                )}
                              </div>
                            ))}
                          </div>
                          
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-blue-900 mb-2">Explanation:</h5>
                            <p className="text-blue-800">
                              <UnitConversionDisplay text={question.explanation} />
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </EnhancedErrorBoundary>
    );
  }

  return null;
}