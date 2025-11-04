'use client';

import { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, Flag, BookOpen, CheckCircle, Download } from 'lucide-react';
import Link from 'next/link';
import { generateExamPDF } from '@/lib/pdf/generator';
import { EnhancedErrorBoundary } from '@/components/ui/EnhancedErrorBoundary';
import { UnitConversionDisplay, UnitConverterButton } from '@/components/ui/UnitConverter';
import { analytics } from '@/lib/analytics/service';
import { questionsAPI } from '@/lib/performance/api';
import { useErrorHandler } from '@/lib/errors/tracking';
import { useExamSession } from '@/lib/persistence/examSession';
import { SessionRecoveryModal, QuickRecoveryBanner, SessionExportModal } from '@/components/exam/SessionRecovery';
import { useQuestionPreloader } from '@/lib/performance/preloader';
import { usePerformanceMonitor } from '@/lib/performance/monitor';
import { PerformanceStats } from '@/components/ui/PerformanceStats';
import { useLearningSession, useLearningAnalytics, useAdaptiveDifficulty, usePerformanceMonitor as useAnalyticsMonitor } from '@/hooks/useLearningAnalytics';

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
    vitals?: string; // Backward compatibility
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

export default function ExamInterface() {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [showAnswerAfterAttempt, setShowAnswerAfterAttempt] = useState(false);
  const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Session persistence state
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [showRecoveryBanner, setShowRecoveryBanner] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState<number>(Date.now());
  
  const { logError, logAPIError } = useErrorHandler();
  const {
    initializeSession,
    updateSession,
    recordAnswer,
    updateTimeRemaining: updateSessionTime,
    resumeSession,
    completeSession,
    hasRecoverableSession,
    getRecoverableSessionInfo,
    recoverSession,
    clearSession,
    exportSession,
    importSession
  } = useExamSession();
  
  const {
    preloadExamQuestions,
    preloadTopicQuestions,
    prefetchAdjacentQuestions,
    getMetrics: getPreloaderMetrics
  } = useQuestionPreloader();
  
  const {
    trackMetric,
    trackUserInteraction,
    getPerformanceScore
  } = usePerformanceMonitor();

  // Learning Analytics Integration
  const learningSession = useLearningSession({
    topicId: selectedTopic,
    userId: 'current-user', // In production, get from auth context
    difficultyLevel: 3, // Default difficulty, will be adaptive
    learningObjectives: [],
    enableRealTimeTracking: true,
  });

  const adaptiveDifficulty = useAdaptiveDifficulty(3);
  
  const analyticsMonitor = useAnalyticsMonitor(
    'current-user',
    {
      topicId: selectedTopic,
      userId: 'current-user',
      difficultyLevel: adaptiveDifficulty.currentDifficulty,
      learningObjectives: [],
      enableRealTimeTracking: true,
    }
  );

  // Fetch topics on component mount
  useEffect(() => {
    const fetchTopics = async () => {
      setLoadingTopics(true);
      setApiError(null);
      try {
        const data = await questionsAPI.get<Topic[]>('/api/topics');
        setTopics(data);
        
        // Initialize analytics and performance tracking
        await analytics.initialize();
        analytics.trackPageView('/exam', 'Exam Topics Selection');
        
        // Track page load performance
        trackMetric('page_load_start', performance.now(), { page: 'exam-topics' });
        
        // Preload popular topics in background
        const popularTopics = data.slice(0, 3); // Assume first 3 are most popular
        for (const topic of popularTopics) {
          preloadTopicQuestions(topic.id);
        }
        
        // Check for recoverable session
        if (hasRecoverableSession()) {
          const sessionInfo = getRecoverableSessionInfo();
          if (sessionInfo) {
            setShowRecoveryBanner(true);
          }
        }
      } catch (error: unknown) {
        const message = 'Failed to load exam topics. Please refresh the page.';
        setApiError(message);
        const errorObj = error as { status?: number; code?: string };
        logAPIError('/api/topics', errorObj?.status || 0, errorObj?.code || 'UNKNOWN', message);
      } finally {
        setLoadingTopics(false);
      }
    };

    fetchTopics();
  }, [logAPIError, hasRecoverableSession, getRecoverableSessionInfo, preloadTopicQuestions, trackMetric]);

  // Timer effect
  useEffect(() => {
    if (isExamStarted && !isExamFinished && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsExamFinished(true);
            // Complete session when time runs out
            completeSession();
            return 0;
          }
          const newTime = prev - 1;
          // Update session time (throttled in session manager)
          updateSessionTime(newTime);
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isExamStarted, isExamFinished, timeRemaining, completeSession, updateSessionTime]);

  const fetchQuestions = async (topicId: string) => {
    setIsLoading(true);
    setApiError(null);
    
    const loadStartTime = performance.now();
    
    try {
      console.log('Fetching questions for topic:', topicId);
      
      // Use enhanced API client with caching
      const data = await questionsAPI.get<Question[]>(
        `/api/questions?topicId=${topicId}&limit=30`,
        { 
          cache: true,
          priority: 'high',
          timeout: 15000
        }
      );
      
      console.log('API Response:', data);
      console.log('Data type:', typeof data);
      console.log('Is array:', Array.isArray(data));
      console.log('Data length:', data?.length);
      
      // Track load performance
      const loadTime = performance.now() - loadStartTime;
      trackMetric('questions_load_time', loadTime, { topicId, count: data?.length || 0 });
      
      // Ensure we have questions
      if (Array.isArray(data) && data.length > 0) {
        setQuestions(data);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setFlaggedQuestions(new Set());
        setIsExamStarted(true);
        setIsExamFinished(false);
        setTimeRemaining(45 * 60);
        setCurrentQuestionStartTime(Date.now());
        
        // Initialize session persistence
        const topic = topics.find(t => t.id === topicId);
        initializeSession(topicId, topic?.name || 'Unknown Topic', data);
        
        // Start learning analytics session
        learningSession.startSession();
        
        // Start intelligent preloading
        preloadExamQuestions(topicId, data.length, 0);
        
        // Track exam start
        analytics.trackExamStart(topicId, topic?.name || 'Unknown Topic');
        trackMetric('exam_started', Date.now(), { topicId, questionCount: data.length });
      } else {
        const message = 'No questions available for this topic. Please try another topic.';
        setApiError(message);
        logAPIError(`/api/questions?topicId=${topicId}`, 404, 'NO_QUESTIONS', message);
      }
    } catch (error: unknown) {
      const loadTime = performance.now() - loadStartTime;
      trackMetric('questions_load_error', loadTime, { topicId, error: 'failed' });
      
      const message = 'Error loading questions. Please try again.';
      setApiError(message);
      const errorObj = error as { status?: number; code?: string };
      logAPIError(`/api/questions?topicId=${topicId}`, errorObj?.status || 0, errorObj?.code || 'UNKNOWN', message);
      setIsExamStarted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!isExamFinished) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = answerIndex === currentQuestion.correctIndex;
      const responseTime = Math.round((Date.now() - currentQuestionStartTime));
      const timeSpent = Math.round(responseTime / 1000);
      
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: answerIndex
      }));
      
      setCurrentQuestionAnswered(true);
      
      // Record answer in session
      recordAnswer(currentQuestionIndex, answerIndex, timeSpent);
      
      // Record response in learning analytics
      learningSession.recordResponse({
        questionId: currentQuestion.id,
        selectedAnswer: answerIndex,
        isCorrect,
        responseTime,
        confidenceLevel: 3, // Could be user-inputted
        hintsUsed: 0,
        attempts: 1,
      });
      
      // Monitor performance and adjust difficulty
      analyticsMonitor.monitorPerformance(learningSession.sessionMetrics);
      adaptiveDifficulty.adjustDifficulty(learningSession.sessionMetrics);
      
      // Update session state
      updateSession({
        currentQuestionIndex,
        selectedAnswers: { ...selectedAnswers, [currentQuestionIndex]: answerIndex },
        currentQuestionAnswered: true
      });
      
      // Track question answered
      analytics.trackQuestionAnswered(
        currentQuestion.id,
        isCorrect,
        45 * 60 - timeRemaining // Time spent so far
      );
    }
  };

  const handleQuestionNavigation = (direction: 'prev' | 'next') => {
    const navigationStart = performance.now();
    
    if (direction === 'prev' && currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      setCurrentQuestionAnswered(selectedAnswers[newIndex] !== undefined);
      setCurrentQuestionStartTime(Date.now());
      
      // Prefetch adjacent questions
      prefetchAdjacentQuestions(selectedTopic, newIndex, questions.length);
      
      // Update session
      updateSession({
        currentQuestionIndex: newIndex,
        currentQuestionAnswered: selectedAnswers[newIndex] !== undefined
      });
      
      // Track navigation performance
      trackUserInteraction('navigation', 'prev_question', navigationStart, performance.now());
      
    } else if (direction === 'next' && currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      setCurrentQuestionAnswered(selectedAnswers[newIndex] !== undefined);
      setCurrentQuestionStartTime(Date.now());
      
      // Prefetch adjacent questions
      prefetchAdjacentQuestions(selectedTopic, newIndex, questions.length);
      
      // Update session
      updateSession({
        currentQuestionIndex: newIndex,
        currentQuestionAnswered: selectedAnswers[newIndex] !== undefined
      });
      
      // Track navigation performance
      trackUserInteraction('navigation', 'next_question', navigationStart, performance.now());
    }
  };

  const toggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestionIndex)) {
      newFlagged.delete(currentQuestionIndex);
    } else {
      newFlagged.add(currentQuestionIndex);
    }
    setFlaggedQuestions(newFlagged);
    
    // Update session
    updateSession({
      flaggedQuestions: Array.from(newFlagged)
    });
  };

  const finishExam = async () => {
    setIsExamFinished(true);
    
    // Calculate and track exam completion
    const score = calculateScore();
    const timeSpent = 45 * 60 - timeRemaining;
    
    // End learning analytics session
    const sessionId = await learningSession.endSession(true);
    console.log('Learning session completed:', sessionId);
    
    // Complete session
    completeSession(score);
    
    analytics.trackExamComplete(selectedTopic, score, timeSpent);
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

  // Session recovery functions
  const handleRecoverSession = () => {
    const recovered = recoverSession();
    if (recovered) {
      // Restore exam state from session
      setSelectedTopic(recovered.topicId);
      setQuestions(recovered.questions);
      setCurrentQuestionIndex(recovered.currentQuestionIndex);
      setSelectedAnswers(recovered.selectedAnswers);
      setFlaggedQuestions(new Set(recovered.flaggedQuestions));
      setTimeRemaining(recovered.timeRemaining);
      setIsExamStarted(recovered.isStarted);
      setIsExamFinished(recovered.isFinished);
      setShowAnswerAfterAttempt(recovered.showAnswerAfterAttempt);
      setCurrentQuestionAnswered(recovered.currentQuestionAnswered);
      setCurrentQuestionStartTime(Date.now());
      
      // Close recovery modal/banner
      setShowRecoveryModal(false);
      setShowRecoveryBanner(false);
      
      // Resume if paused
      if (recovered.isPaused) {
        resumeSession();
      }
    }
  };

  const handleDiscardSession = () => {
    clearSession();
    setShowRecoveryModal(false);
    setShowRecoveryBanner(false);
  };

  const handleExportSession = () => {
    const exported = exportSession();
    if (exported) {
      setShowExportModal(true);
    }
  };

  const handleImportSession = (data: string) => {
    const imported = importSession(data);
    if (imported) {
      setShowRecoveryModal(false);
      handleRecoverSession();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

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

  // Error state for topics
  if (apiError && !isExamStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Loading Error</h2>
          <p className="text-gray-600 mb-6">{apiError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
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
          <p className="text-gray-600">Loading exam questions...</p>
        </div>
      </div>
    );
  }

  // Topic Selection Screen
  if (!isExamStarted) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Select Exam Topic</h1>
            <p className="text-gray-600 text-sm sm:text-base">Choose a topic for your 30-question timed exam</p>
          </div>

          {/* Session Recovery Banner */}
          {showRecoveryBanner && hasRecoverableSession() && (
            <QuickRecoveryBanner
              sessionInfo={{
                topicName: getRecoverableSessionInfo()?.topicName || '',
                progress: getRecoverableSessionInfo()?.progress || ''
              }}
              onRecover={handleRecoverSession}
              onDismiss={() => setShowRecoveryBanner(false)}
              className="mb-6"
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer touch-manipulation"
                onClick={() => {
                  // Check if there's a recoverable session before starting new exam
                  if (hasRecoverableSession()) {
                    setShowRecoveryModal(true);
                    return;
                  }
                  
                  setSelectedTopic(topic.id);
                  analytics.trackTopicSelection(topic.id, topic.name);
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
                  <span>45 Minutes</span>
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

    const handleDownloadPDF = async () => {
      try {
        const examResults = {
          questions,
          userAnswers: selectedAnswers,
          score,
          totalTime: 45 * 60 - timeRemaining, // Total time minus remaining time
          topicName: topics.find(t => t.id === selectedTopic)?.name || 'Unknown Topic',
          completedAt: new Date()
        };
        
        // Track PDF download
        analytics.trackPDFDownload(selectedTopic, score);
        
        await generateExamPDF(examResults);
      } catch (error) {
        const message = 'Sorry, there was an error generating the PDF. Please try again or contact support if the issue persists.';
        setApiError(message);
        logError(error as Error, { 
          action: 'pdf_generation',
          topicId: selectedTopic,
          score,
          questionsCount: questions.length
        });
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Exam Complete!</h1>
              <p className="text-gray-600">Here are your results</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{score}%</div>
                <div className="text-gray-600">Overall Score</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{correct}</div>
                <div className="text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center p-6 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600">{questions.length - correct}</div>
                <div className="text-gray-600">Incorrect Answers</div>
              </div>
            </div>

            <div className="space-y-6">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctIndex;
                const options = typeof question.options === 'string' 
                  ? JSON.parse(question.options) 
                  : question.options;
                const references = typeof question.references === 'string'
                  ? JSON.parse(question.references)
                  : question.references;

                return (
                  <div key={question.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1">
                        Question {index + 1}: <UnitConversionDisplay 
                          text={question.question}
                          className="inline"
                        />
                      </h3>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </div>
                    </div>

                    {/* Patient Presentation in Results */}
                    {question.patientPresentation && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Patient Details</h4>
                        <div className="text-sm text-gray-700">
                          <p>{typeof question.patientPresentation.age === 'number' ? `${question.patientPresentation.age}yo` : question.patientPresentation.age} {question.patientPresentation.gender}, {question.patientPresentation.chiefComplaint}</p>
                          {question.patientPresentation.vitalSigns ? (
                            <p className="mt-1">
                              <span className="font-medium">Vitals:</span> HR {question.patientPresentation.vitalSigns.heartRate}, 
                              BP {question.patientPresentation.vitalSigns.bloodPressure}, 
                              Temp {question.patientPresentation.vitalSigns.temperature}°F, 
                              RR {question.patientPresentation.vitalSigns.respiratoryRate}, 
                              SpO2 {question.patientPresentation.vitalSigns.oxygenSaturation}%
                            </p>
                          ) : question.patientPresentation.vitals ? (
                            <p className="mt-1">
                              <span className="font-medium">Vitals:</span> {question.patientPresentation.vitals}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    )}

                    {/* Image Description in Results */}
                    {question.imageDescription && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-yellow-900 mb-2">Visual Finding</h4>
                        <p className="text-yellow-800 text-sm">{question.imageDescription}</p>
                      </div>
                    )}

                    <div className="space-y-2 mb-4">
                      {options.map((option: string, optionIndex: number) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg border ${
                            optionIndex === question.correctIndex
                              ? 'bg-green-50 border-green-300'
                              : optionIndex === userAnswer && !isCorrect
                              ? 'bg-red-50 border-red-300'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="font-medium mr-2">
                              {String.fromCharCode(65 + optionIndex)}.
                            </span>
                            <span>{option}</span>
                            {optionIndex === question.correctIndex && (
                              <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                      <p className="text-blue-800 mb-3">
                        <UnitConversionDisplay 
                          text={question.explanation}
                          className="inline"
                        />
                      </p>
                      <div>
                        <h5 className="font-medium text-blue-900 mb-1">References:</h5>
                        <ul className="text-sm text-blue-700 space-y-1">
                          {references.map((ref: string, refIndex: number) => (
                            <li key={refIndex}>• {ref}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Learning Objectives */}
                    {question.learningObjectives && question.learningObjectives.length > 0 && (
                      <div className="bg-green-50 p-4 rounded-lg mb-4">
                        <h4 className="font-semibold text-green-900 mb-2">Learning Objectives:</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                          {question.learningObjectives.map((objective: string, objIndex: number) => (
                            <li key={objIndex}>• {objective}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Clinical Pearls */}
                    {question.clinicalPearls && question.clinicalPearls.length > 0 && (
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">Clinical Pearls:</h4>
                        <ul className="text-sm text-purple-800 space-y-1">
                          {question.clinicalPearls.map((pearl: string, pearlIndex: number) => (
                            <li key={pearlIndex}>💎 {pearl}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-8 space-x-4">
              <button
                onClick={handleDownloadPDF}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Answer Sheet</span>
              </button>
              <Link
                href="/exam"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Take Another Exam
              </Link>
              <Link
                href="/"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exam Interface
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <h1 className="text-base sm:text-xl font-semibold text-gray-900 truncate">
                {topics.find(t => t.id === selectedTopic)?.name} Exam
              </h1>
              <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-6">
              <UnitConverterButton />
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <span className={`font-mono text-sm sm:text-lg ${
                  timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <button
                onClick={handleExportSession}
                className="border border-blue-600 text-blue-600 px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-50 transition-colors"
                title="Export current session"
              >
                Export
              </button>
              <button
                onClick={finishExam}
                className="bg-red-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Analytics Alerts */}
      {(analyticsMonitor.performanceAlerts.length > 0 || analyticsMonitor.recommendations.length > 0) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-yellow-800">Learning Insights</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  {analyticsMonitor.performanceAlerts.map((alert, index) => (
                    <p key={index} className="mb-1">⚠️ {alert}</p>
                  ))}
                  {analyticsMonitor.recommendations.map((rec, index) => (
                    <p key={index} className="mb-1">💡 {rec}</p>
                  ))}
                </div>
                <div className="mt-2">
                  <span className="text-xs text-yellow-600">
                    Current Difficulty: Level {adaptiveDifficulty.currentDifficulty} | 
                    Accuracy: {(learningSession.sessionMetrics.accuracy * 100).toFixed(1)}% | 
                    Questions: {learningSession.sessionMetrics.questionsAttempted}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
          {/* Question Navigation Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-8">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Question Navigation</h3>
              
              {/* Settings Toggle */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAnswerAfterAttempt}
                    onChange={(e) => setShowAnswerAfterAttempt(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <div className="ml-2">
                    <span className="text-sm font-medium text-blue-900">Show Correct Answer</span>
                    <p className="text-xs text-blue-700">Reveal answer after each attempt</p>
                  </div>
                </label>
              </div>
              
              <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-5 gap-1 sm:gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentQuestionIndex(index);
                      setCurrentQuestionAnswered(selectedAnswers[index] !== undefined);
                    }}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium relative touch-manipulation transition-all duration-200 ${
                      index === currentQuestionIndex
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl ring-4 ring-blue-300 transform scale-110 z-10'
                        : selectedAnswers[index] !== undefined
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border border-emerald-600 shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-emerald-700 transform hover:scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300 hover:border-gray-400 hover:shadow-md'
                    }`}
                  >
                    {index + 1}
                    {flaggedQuestions.has(index) && (
                      <Flag className="w-3 h-3 text-red-500 absolute -top-1 -right-1" />
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Answered:</span>
                  <span>{Object.keys(selectedAnswers).length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Flagged:</span>
                  <span>{flaggedQuestions.size}</span>
                </div>
                
                {/* Color Legend */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-700 mb-2">Legend:</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded shadow-sm mr-2"></div>
                      <span>Current Question</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded shadow-sm mr-2"></div>
                      <span>Answered</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded mr-2"></div>
                      <span>Not Answered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 flex-1 leading-relaxed">
                  <UnitConversionDisplay 
                    text={currentQuestion?.question || ''}
                    className="inline"
                  />
                </h2>
                <button
                  onClick={toggleFlag}
                  className={`ml-2 sm:ml-4 p-1.5 sm:p-2 rounded-lg touch-manipulation ${
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
                  <p className="text-blue-800 text-sm">
                    <UnitConversionDisplay 
                      text={currentQuestion.clinicalScenario}
                      className="inline"
                    />
                  </p>
                </div>
              )}

              {/* Patient Presentation */}
              <EnhancedErrorBoundary 
                componentName="PatientPresentation"
                fallback={
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">Error loading patient details. Continuing with question...</p>
                  </div>
                }
              >
                {currentQuestion?.patientPresentation && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                    <h3 className="font-bold text-gray-900 mb-3 text-base">Patient Presentation</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-base font-medium text-gray-900"><span className="font-bold">Age:</span> {typeof currentQuestion.patientPresentation.age === 'number' ? `${currentQuestion.patientPresentation.age} years` : currentQuestion.patientPresentation.age}</p>
                        <p className="text-base font-medium text-gray-900"><span className="font-bold">Gender:</span> {currentQuestion.patientPresentation.gender}</p>
                        <p className="text-base font-medium text-gray-900"><span className="font-bold">Chief Complaint:</span> {currentQuestion.patientPresentation.chiefComplaint}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-base mb-2 text-gray-900">Vital Signs</h4>
                        {currentQuestion.patientPresentation.vitalSigns ? (
                          <div className="text-base space-y-1 font-medium text-gray-900">
                            <p><span className="font-bold">HR:</span> {currentQuestion.patientPresentation.vitalSigns.heartRate} bpm</p>
                            <p><span className="font-bold">BP:</span> {currentQuestion.patientPresentation.vitalSigns.bloodPressure}</p>
                            <p>
                              <span className="font-bold">Temp:</span> <UnitConversionDisplay 
                                text={`${currentQuestion.patientPresentation.vitalSigns.temperature}°F`}
                                className="inline"
                              />
                            </p>
                            <p><span className="font-bold">RR:</span> {currentQuestion.patientPresentation.vitalSigns.respiratoryRate}/min</p>
                            <p><span className="font-bold">SpO2:</span> {currentQuestion.patientPresentation.vitalSigns.oxygenSaturation}%</p>
                          </div>
                        ) : currentQuestion.patientPresentation.vitals ? (
                          <p className="text-base font-medium text-gray-900">
                            <UnitConversionDisplay 
                              text={currentQuestion.patientPresentation.vitals}
                              className="inline"
                            />
                          </p>
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

              <EnhancedErrorBoundary 
                componentName="QuestionOptions"
                fallback={
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">Error loading question options. Please try refreshing the page.</p>
                  </div>
                }
              >
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
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
                        className={`w-full text-left p-4 sm:p-5 rounded-lg border-2 transition-all duration-200 touch-manipulation ${
                          showAnswer && isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200'
                            : showAnswer && isSelected && !isCorrect
                            ? 'border-red-500 bg-red-50 text-red-900 ring-2 ring-red-200'
                            : isSelected
                            ? 'border-blue-600 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 shadow-lg ring-4 ring-blue-300 transform scale-[1.02] font-semibold'
                            : 'border-gray-400 bg-white hover:bg-blue-50 hover:border-blue-400 hover:shadow-md text-gray-900'
                        } ${showAnswer && !isExamFinished ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-start">
                          <span className={`font-bold mr-2 sm:mr-3 text-base sm:text-lg ${
                            isSelected ? 'text-blue-900 font-black' : 'text-gray-900'
                          }`}>
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <span className={`text-base sm:text-lg leading-relaxed flex-1 text-gray-900 ${
                            isSelected ? 'font-bold' : 'font-medium'
                          }`}>
                            <UnitConversionDisplay 
                              text={option}
                              className="inline"
                            />
                          </span>
                          {showAnswer && isCorrect && (
                            <CheckCircle className="w-5 h-5 text-emerald-600 ml-2 flex-shrink-0" />
                          )}
                          {showAnswer && isSelected && !isCorrect && (
                            <div className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center ml-2 flex-shrink-0">✕</div>
                          )}
                          {isSelected && !showAnswer && (
                            <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center ml-2 flex-shrink-0">✓</div>
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
                    <p className="text-blue-800 mb-4 leading-relaxed">
                      <UnitConversionDisplay 
                        text={currentQuestion.explanation}
                        className="inline"
                      />
                    </p>                  {/* References */}
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
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
                    <div className="mt-3 bg-green-50 rounded-lg p-3 border border-green-200">
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
                    <div className="mt-3 bg-purple-50 rounded-lg p-3 border border-purple-200">
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
              <div className="flex items-center justify-between flex-wrap gap-2">
                <button
                  onClick={() => handleQuestionNavigation('prev')}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center px-4 py-3 sm:px-5 sm:py-3 text-base sm:text-lg font-semibold text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>

                <div className="flex items-center space-x-2 text-center">
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    Difficulty: 
                  </span>
                  <span className={`px-3 py-2 rounded-lg text-sm font-bold ${
                    currentQuestion?.difficulty === 'easy'
                      ? 'bg-green-100 text-green-800'
                      : currentQuestion?.difficulty === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {currentQuestion?.difficulty}
                  </span>
                </div>

                <button
                  onClick={() => handleQuestionNavigation('next')}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="flex items-center px-4 py-3 sm:px-5 sm:py-3 text-base sm:text-lg font-semibold text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors touch-manipulation"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Session Recovery Modal */}
        {showRecoveryModal && hasRecoverableSession() && (
          <SessionRecoveryModal
            sessionInfo={getRecoverableSessionInfo() || {
              topicName: '',
              progress: '',
              timeSpent: '',
              lastSaved: ''
            }}
            onRecover={handleRecoverSession}
            onDiscard={handleDiscardSession}
            onExport={handleExportSession}
            onImport={handleImportSession}
          />
        )}

        {/* Session Export Modal */}
        {showExportModal && (
          <SessionExportModal
            sessionData={exportSession() || ''}
            onClose={() => setShowExportModal(false)}
          />
        )}
        
        {/* Performance Monitoring */}
        <PerformanceStats showDetailed={false} />
      </div>
    </div>
  );
}