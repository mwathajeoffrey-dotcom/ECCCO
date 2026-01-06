'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Flag, BookOpen, CheckCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { generateExamPDF } from '@/lib/pdf/generator';
import { EnhancedErrorBoundary } from '@/components/ui/EnhancedErrorBoundary';
import { analyticsV2 } from '@/lib/analytics/analytics-v2';

// Import our enhanced components
import { ExamPerformanceStats } from './ExamPerformanceStats';
import { QuestionProgress } from './QuestionProgress';
import { StudyModeToggle } from './StudyModeToggle';
import { EnhancedTimer } from './EnhancedTimer';
import { ExamResultsAnalytics } from './ExamResultsAnalytics';

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
    gender: string;
    chiefComplaint: string;
    vitalSigns?: {
      heartRate: number;
      bloodPressure: string;
      temperature: number;
      respiratoryRate: number;
      oxygenSaturation: number;
    };
    vitals?: string;
    currentMedications?: string[];
    allergies?: string[];
    pastMedicalHistory?: string[];
    physicalExam?: string;
    labsImaging?: string;
  };
  learningObjectives?: string[];
  clinicalPearls?: string[];
}

interface Topic {
  id: string;
  name: string;
  description: string;
}

export default function EnhancedExamInterface() {
  // User session
  const { user } = useUser();
  
  // Core state
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [topics, setTopics] = useState<Topic[]>([]);
  
  // Exam state
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [isStudyMode, setIsStudyMode] = useState(false);
  
  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(45 * 60);
  const [totalTime, setTotalTime] = useState(45 * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [showAnswerAfterAttempt, setShowAnswerAfterAttempt] = useState(false);
  const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false);
  
  // Performance tracking
  const [questionTimes, setQuestionTimes] = useState<{ [key: number]: number }>({});
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState<number>(0);

  // Fetch topics on component mount
  useEffect(() => {
    const fetchTopics = async () => {
      setLoadingTopics(true);
      try {
        const response = await fetch('/api/topics');
        const data = await response.json();
        setTopics(data);
        
        await analyticsV2.initialize();
        console.log('✅ Analytics V2 initialized in exam interface');
      } catch (error) {
        console.error('Error fetching topics:', error);
      } finally {
        setLoadingTopics(false);
      }
    };

    fetchTopics();
  }, []);

  // Timer effect (only for exam mode)
  useEffect(() => {
    if (isExamStarted && !isExamFinished && !isStudyMode && !isPaused && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsExamFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isExamStarted, isExamFinished, isStudyMode, isPaused, timeRemaining]);

  // Track time per question
  useEffect(() => {
    if (isExamStarted && !isExamFinished) {
      setCurrentQuestionStartTime(Date.now());
    }
  }, [currentQuestionIndex, isExamStarted, isExamFinished]);

  const fetchQuestions = async (topicId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/questions?topicId=${topicId}&limit=30`);
      const data = await response.json();
      setQuestions(data);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setFlaggedQuestions(new Set());
      setQuestionTimes({});
      setIsExamStarted(true);
      setIsExamFinished(false);
      setIsPaused(false);
      
      // Set time based on mode
      const examTime = isStudyMode ? 0 : 45 * 60;
      setTimeRemaining(examTime);
      setTotalTime(examTime);
      setStartTime(Date.now());
      setCurrentQuestionStartTime(Date.now());
      
      const topic = topics.find(t => t.id === topicId);
      console.log(`📋 Exam started: ${topic?.name || 'Unknown Topic'} (${isStudyMode ? 'Study Mode' : 'Exam Mode'})`);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!isExamFinished) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = answerIndex === currentQuestion.correctIndex;
      
      // Track time spent on this question
      const timeSpent = Math.round((Date.now() - currentQuestionStartTime) / 1000);
      setQuestionTimes(prev => ({
        ...prev,
        [currentQuestionIndex]: timeSpent
      }));
      
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: answerIndex
      }));
      
      setCurrentQuestionAnswered(true);
      
      console.log(`💭 Question answered: ${currentQuestion.id}, correct: ${isCorrect}, time: ${timeSpent}s`);
    }
  };

  const handleQuestionNavigation = useCallback((direction: 'prev' | 'next' | number) => {
    // Save current question time
    if (currentQuestionStartTime > 0) {
      const timeSpent = Math.round((Date.now() - currentQuestionStartTime) / 1000);
      setQuestionTimes(prev => ({
        ...prev,
        [currentQuestionIndex]: (prev[currentQuestionIndex] || 0) + timeSpent
      }));
    }

    let newIndex = currentQuestionIndex;
    if (typeof direction === 'number') {
      newIndex = direction;
    } else if (direction === 'prev' && currentQuestionIndex > 0) {
      newIndex = currentQuestionIndex - 1;
    } else if (direction === 'next' && currentQuestionIndex < questions.length - 1) {
      newIndex = currentQuestionIndex + 1;
    }

    setCurrentQuestionIndex(newIndex);
    setCurrentQuestionAnswered(selectedAnswers[newIndex] !== undefined);
    setCurrentQuestionStartTime(Date.now());
  }, [currentQuestionIndex, currentQuestionStartTime, selectedAnswers, questions.length]);

  const toggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestionIndex)) {
      newFlagged.delete(currentQuestionIndex);
    } else {
      newFlagged.add(currentQuestionIndex);
    }
    setFlaggedQuestions(newFlagged);
  };

  const handleStudyModeToggle = (enabled: boolean) => {
    setIsStudyMode(enabled);
    if (enabled) {
      setTimeRemaining(0);
      setTotalTime(0);
      setIsPaused(false);
    } else {
      const newTime = 45 * 60;
      setTimeRemaining(newTime);
      setTotalTime(newTime);
    }
  };

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);
  
  const handleTimeUp = () => {
    setIsExamFinished(true);
  };

  const finishExam = async () => {
    setIsExamFinished(true);
    
    const score = calculateScore();
    const timeSpent = isStudyMode ? 
      Object.values(questionTimes).reduce((sum, time) => sum + time, 0) :
      totalTime - timeRemaining;
    
    try {
      const topicName = topics.find(t => t.id === selectedTopic)?.name || 'Unknown Topic';
      
      // Save to analytics (for anonymous and authenticated users)
      await analyticsV2.recordExamCompletion(selectedTopic, topicName, questions, selectedAnswers, timeSpent, user?.id);
      
      // Save to database if user is authenticated
      if (user?.id) {
        try {
          const response = await fetch('/api/exam/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              topicId: selectedTopic,
              topicName,
              questions: questions.map(q => ({ 
                id: q.id, 
                question: q.question, 
                options: q.options,
                correctIndex: q.correctIndex,
                explanation: q.explanation
              })),
              userAnswers: selectedAnswers,
              finalScore: score,
              totalTimeSpent: Math.round(timeSpent),
              isStudyMode,
              completed: true
            }),
          });
          
          if (response.ok) {
            console.log('✅ Exam results saved to database');
          } else {
            console.warn('⚠️ Failed to save exam results to database');
          }
        } catch (error) {
          console.error('❌ Error saving exam results to database:', error);
        }
      }
      
      console.log('✅ Exam session data saved successfully');
    } catch (error) {
      console.error('❌ Failed to save exam session data:', error);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  // Calculate performance stats
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = questions.filter((q, i) => selectedAnswers[i] === q.correctIndex).length;
  const currentStreak = calculateCurrentStreak();
  const averageTimePerQuestion = answeredCount > 0 ? 
    Object.values(questionTimes).reduce((sum, time) => sum + time, 0) / answeredCount : 0;

  function calculateCurrentStreak(): number {
    let streak = 0;
    for (let i = currentQuestionIndex; i >= 0; i--) {
      if (selectedAnswers[i] !== undefined) {
        if (selectedAnswers[i] === questions[i]?.correctIndex) {
          streak++;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return streak;
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Handle PDF download
  const handleDownloadPDF = () => {
    try {
      const examResults = {
        questions,
        userAnswers: selectedAnswers,
        score: calculateScore(),
        totalTime: isStudyMode ? 
          Object.values(questionTimes).reduce((sum, time) => sum + time, 0) :
          totalTime - timeRemaining,
        topicName: topics.find(t => t.id === selectedTopic)?.name || 'Unknown Topic',
        completedAt: new Date(),
        questionTimes,
        studyMode: isStudyMode,
        flaggedQuestions: Array.from(flaggedQuestions)
      };
      
      generateExamPDF(examResults);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Sorry, there was an error generating the PDF. Please try again.');
    }
  };

  // Loading screen for topics
  if (loadingTopics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exam topics...</p>
        </div>
      </div>
    );
  }

  // Loading screen for questions
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Preparing your {isStudyMode ? 'study session' : 'exam'}...</p>
        </div>
      </div>
    );
  }

  // Topic Selection Screen
  if (!isExamStarted) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        {/* User Header */}
        {user && (
          <div className="bg-white shadow-sm border-b mb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-medium">ECCCO</span>
                    <span className="text-sm text-gray-500 block">Back to Dashboard</span>
                  </div>
                </Link>
                
                <div className="flex items-center space-x-3">
                  {user.imageUrl && (
                    <img
                      src={user.imageUrl}
                      alt={user.firstName || 'User'}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user.firstName || user.emailAddresses[0]?.emailAddress}
                    </p>
                    <p className="text-xs text-gray-500">
                      Authenticated
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            {!user && (
              <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Link>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Select {isStudyMode ? 'Study' : 'Exam'} Topic
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {isStudyMode 
                ? 'Choose a topic for untimed study with immediate feedback'
                : 'Choose a topic for your 30-question timed exam'
              }
            </p>
            {user && (
              <p className="text-blue-600 text-sm mt-2">
                Your progress will be saved to your dashboard
              </p>
            )}
          </div>

          {/* Study Mode Toggle */}
          <div className="max-w-md mx-auto mb-8">
            <StudyModeToggle 
              isStudyMode={isStudyMode}
              onToggle={handleStudyModeToggle}
              showAnswerAfterAttempt={showAnswerAfterAttempt}
              onShowAnswerToggle={setShowAnswerAfterAttempt}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer touch-manipulation hover:scale-105"
                onClick={() => {
                  setSelectedTopic(topic.id);
                  console.log(`📚 Topic selected: ${topic.name} (${isStudyMode ? 'Study Mode' : 'Exam Mode'})`);
                  fetchQuestions(topic.id);
                }}
              >
                <div className="flex items-center mb-3">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">{topic.name}</h3>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">{topic.description}</p>
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                  <span>30 Questions</span>
                  <span>{isStudyMode ? 'Untimed' : '45 Minutes'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Exam Results Screen
  if (isExamFinished) {
    const score = calculateScore();
    const correct = questions.filter((q, i) => selectedAnswers[i] === q.correctIndex).length;
    const timeSpent = isStudyMode ? 
      Object.values(questionTimes).reduce((sum, time) => sum + time, 0) :
      totalTime - timeRemaining;

    return (
      <ExamResultsAnalytics
        score={score}
        correct={correct}
        total={questions.length}
        timeSpent={timeSpent}
        totalTime={totalTime}
        topicName={topics.find(t => t.id === selectedTopic)?.name || 'Unknown Topic'}
        questions={questions}
        userAnswers={selectedAnswers}
        onDownloadPDF={handleDownloadPDF}
      />
    );
  }

  // Main Exam Interface
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <h1 className="text-base sm:text-xl font-semibold text-gray-900 truncate">
                {topics.find(t => t.id === selectedTopic)?.name} {isStudyMode ? 'Study' : 'Exam'}
              </h1>
              <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-6">
              {!isStudyMode && (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className={`font-mono text-sm sm:text-lg ${
                    timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              )}
              <button
                onClick={finishExam}
                className="bg-red-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-700 transition-colors"
              >
                {isStudyMode ? 'Finish Study' : 'Finish Exam'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1 space-y-6">
            {/* Enhanced Timer (for exam mode) */}
            {!isStudyMode && (
              <EnhancedTimer
                timeRemaining={timeRemaining}
                totalTime={totalTime}
                isActive={true}
                onTimeUp={handleTimeUp}
                onPause={handlePause}
                onResume={handleResume}
                isPaused={isPaused}
              />
            )}

            {/* Performance Stats */}
            {answeredCount > 0 && (
              <ExamPerformanceStats
                answeredCount={answeredCount}
                totalQuestions={questions.length}
                correctCount={correctCount}
                currentStreak={currentStreak}
                timePerQuestion={averageTimePerQuestion}
                difficulty={currentQuestion?.difficulty as 'easy' | 'medium' | 'hard' || 'medium'}
              />
            )}

            {/* Question Progress */}
            <QuestionProgress
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              selectedAnswers={selectedAnswers}
              flaggedQuestions={flaggedQuestions}
              onQuestionSelect={(index) => handleQuestionNavigation(index)}
              showCorrectAnswers={isExamFinished}
            />

            {/* Study Mode Toggle (during exam) */}
            <StudyModeToggle
              isStudyMode={isStudyMode}
              onToggle={handleStudyModeToggle}
              showAnswerAfterAttempt={showAnswerAfterAttempt}
              onShowAnswerToggle={setShowAnswerAfterAttempt}
              timeRemaining={isStudyMode ? undefined : timeRemaining}
            />
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 flex-1 leading-relaxed">
                  {currentQuestion?.question}
                </h2>
                <button
                  onClick={toggleFlag}
                  className={`ml-2 sm:ml-4 p-1.5 sm:p-2 rounded-lg touch-manipulation transition-colors ${
                    flaggedQuestions.has(currentQuestionIndex)
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Flag className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Clinical Scenario */}
              {currentQuestion?.clinicalScenario && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Clinical Scenario</h3>
                  <p className="text-blue-800 text-sm">{currentQuestion.clinicalScenario}</p>
                </div>
              )}

              {/* Patient Presentation */}
              <EnhancedErrorBoundary fallback={
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800">Error loading patient details. Continuing with question...</p>
                </div>
              }>
                {currentQuestion?.patientPresentation && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Patient Presentation</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm"><span className="font-medium">Age:</span> {typeof currentQuestion.patientPresentation.age === 'number' ? `${currentQuestion.patientPresentation.age} years` : currentQuestion.patientPresentation.age}</p>
                        <p className="text-sm"><span className="font-medium">Gender:</span> {currentQuestion.patientPresentation.gender}</p>
                        <p className="text-sm"><span className="font-medium">Chief Complaint:</span> {currentQuestion.patientPresentation.chiefComplaint}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Vital Signs</h4>
                        {currentQuestion.patientPresentation.vitalSigns ? (
                          <div className="text-xs space-y-1">
                            <p>HR: {currentQuestion.patientPresentation.vitalSigns.heartRate} bpm</p>
                            <p>BP: {currentQuestion.patientPresentation.vitalSigns.bloodPressure}</p>
                            <p>Temp: {currentQuestion.patientPresentation.vitalSigns.temperature}°F</p>
                            <p>RR: {currentQuestion.patientPresentation.vitalSigns.respiratoryRate}/min</p>
                            <p>SpO2: {currentQuestion.patientPresentation.vitalSigns.oxygenSaturation}%</p>
                          </div>
                        ) : currentQuestion.patientPresentation.vitals ? (
                          <p className="text-xs">{currentQuestion.patientPresentation.vitals}</p>
                        ) : null}
                      </div>
                    </div>
                    {currentQuestion.patientPresentation.pastMedicalHistory && (
                      <div className="mt-3">
                        <h4 className="font-medium text-sm mb-1">Past Medical History</h4>
                        <p className="text-xs text-gray-600">{currentQuestion.patientPresentation.pastMedicalHistory.join(', ')}</p>
                      </div>
                    )}
                    {currentQuestion.patientPresentation.currentMedications && (
                      <div className="mt-2">
                        <h4 className="font-medium text-sm mb-1">Current Medications</h4>
                        <p className="text-xs text-gray-600">{currentQuestion.patientPresentation.currentMedications.join(', ')}</p>
                      </div>
                    )}
                  </div>
                )}
              </EnhancedErrorBoundary>

              {/* Image Description (Visual Component) */}
              {currentQuestion?.imageDescription && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-yellow-900">Visual Analysis Required</h3>
                  </div>
                  <p className="text-yellow-800 text-sm leading-relaxed">{currentQuestion.imageDescription}</p>
                </div>
              )}

              {/* Answer Options */}
              <EnhancedErrorBoundary fallback={
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800">Error loading question options. Please try refreshing the page.</p>
                </div>
              }>
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {currentQuestion && (typeof currentQuestion.options === 'string' 
                    ? JSON.parse(currentQuestion.options) 
                    : currentQuestion.options).map((option: string, index: number) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === index;
                    const isCorrect = index === currentQuestion.correctIndex;
                    const showAnswer = showAnswerAfterAttempt && currentQuestionAnswered;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showAnswer && !isExamFinished}
                        className={`
                          w-full text-left p-3 sm:p-4 rounded-lg border transition-all duration-200 
                          touch-manipulation shadow-sm hover:shadow-md
                          ${showAnswer && isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200'
                            : showAnswer && isSelected && !isCorrect
                            ? 'border-red-500 bg-red-50 text-red-900 ring-2 ring-red-200'
                            : isSelected
                            ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md ring-2 ring-blue-300'
                            : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
                          } 
                          ${showAnswer && !isExamFinished ? 'cursor-not-allowed' : 'cursor-pointer'}
                        `}
                      >
                        <div className="flex items-start">
                          <span className="font-medium mr-2 sm:mr-3 text-gray-700 text-sm sm:text-base">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <span className="text-sm sm:text-base leading-relaxed flex-1 font-medium">{option}</span>
                          {showAnswer && isCorrect && (
                            <CheckCircle className="w-5 h-5 text-emerald-600 ml-2 flex-shrink-0" />
                          )}
                          {showAnswer && isSelected && !isCorrect && (
                            <div className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center ml-2 flex-shrink-0">✕</div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </EnhancedErrorBoundary>

              {/* Answer Explanation (shows when answer is revealed) */}
              {showAnswerAfterAttempt && currentQuestionAnswered && (
                <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Explanation
                  </h4>
                  <p className="text-blue-800 mb-4 leading-relaxed">{currentQuestion.explanation}</p>
                  
                  {/* References */}
                  <div className="bg-white rounded-lg p-3 border border-blue-200 mb-3">
                    <h5 className="font-medium text-blue-900 mb-2 text-sm">References:</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      {(typeof currentQuestion.references === 'string'
                        ? JSON.parse(currentQuestion.references)
                        : currentQuestion.references).map((ref: string, refIndex: number) => (
                        <li key={refIndex} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{ref}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Learning Objectives */}
                  {currentQuestion.learningObjectives && currentQuestion.learningObjectives.length > 0 && (
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200 mb-3">
                      <h5 className="font-medium text-green-900 mb-2 text-sm">Learning Objectives:</h5>
                      <ul className="text-sm text-green-800 space-y-1">
                        {currentQuestion.learningObjectives.map((objective: string, objIndex: number) => (
                          <li key={objIndex} className="flex items-start">
                            <span className="mr-2">📚</span>
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Clinical Pearls */}
                  {currentQuestion.clinicalPearls && currentQuestion.clinicalPearls.length > 0 && (
                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                      <h5 className="font-medium text-purple-900 mb-2 text-sm">Clinical Pearls:</h5>
                      <ul className="text-sm text-purple-800 space-y-1">
                        {currentQuestion.clinicalPearls.map((pearl: string, pearlIndex: number) => (
                          <li key={pearlIndex} className="flex items-start">
                            <span className="mr-2">💎</span>
                            <span>{pearl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleQuestionNavigation('prev')}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:text-gray-900 transition-colors touch-manipulation"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                <div className="flex items-center space-x-3 text-center">
                  <span className="text-xs sm:text-sm text-gray-500">
                    Difficulty: 
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    currentQuestion?.difficulty === 'easy'
                      ? 'bg-green-100 text-green-800'
                      : currentQuestion?.difficulty === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {currentQuestion?.difficulty}
                  </span>
                  
                  {/* Progress indicator */}
                  <div className="text-xs text-gray-500">
                    {currentQuestionIndex + 1} of {questions.length}
                  </div>
                </div>

                <button
                  onClick={() => handleQuestionNavigation('next')}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="flex items-center px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:text-gray-900 transition-colors touch-manipulation"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}