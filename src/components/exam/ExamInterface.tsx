'use client';

import { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, Flag, BookOpen, CheckCircle, Download } from 'lucide-react';
import Link from 'next/link';
import { generateExamPDF } from '@/lib/pdf/generator';

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
    age: number;
    gender: string;
    chiefComplaint: string;
    vitalSigns: {
      heartRate: number;
      bloodPressure: string;
      temperature: number;
      respiratoryRate: number;
      oxygenSaturation: number;
    };
    currentMedications?: string[];
    allergies?: string[];
    pastMedicalHistory?: string[];
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

  // Fetch topics on component mount
  useEffect(() => {
    const fetchTopics = async () => {
      setLoadingTopics(true);
      try {
        const response = await fetch('/api/topics');
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      } finally {
        setLoadingTopics(false);
      }
    };

    fetchTopics();
  }, []);

  // Timer effect
  useEffect(() => {
    if (isExamStarted && !isExamFinished && timeRemaining > 0) {
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
  }, [isExamStarted, isExamFinished, timeRemaining]);

  const fetchQuestions = async (topicId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/questions?topicId=${topicId}&limit=30`);
      const data = await response.json();
      setQuestions(data);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setFlaggedQuestions(new Set());
      setIsExamStarted(true);
      setIsExamFinished(false);
      setTimeRemaining(45 * 60);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!isExamFinished) {
      setSelectedAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: answerIndex
      }));
    }
  };

  const handleQuestionNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (direction === 'next' && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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
  };

  const finishExam = () => {
    setIsExamFinished(true);
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer touch-manipulation"
                onClick={() => {
                  setSelectedTopic(topic.id);
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

    const handleDownloadPDF = () => {
      const examResults = {
        questions,
        userAnswers: selectedAnswers,
        score,
        totalTime: 45 * 60 - timeRemaining, // Total time minus remaining time
        topicName: topics.find(t => t.id === selectedTopic)?.name || 'Unknown Topic',
        completedAt: new Date()
      };
      generateExamPDF(examResults);
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
                        Question {index + 1}: {question.question}
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
                          <p>{question.patientPresentation.age}yo {question.patientPresentation.gender}, {question.patientPresentation.chiefComplaint}</p>
                          <p className="mt-1">
                            <span className="font-medium">Vitals:</span> HR {question.patientPresentation.vitalSigns.heartRate}, 
                            BP {question.patientPresentation.vitalSigns.bloodPressure}, 
                            Temp {question.patientPresentation.vitalSigns.temperature}°F, 
                            RR {question.patientPresentation.vitalSigns.respiratoryRate}, 
                            SpO2 {question.patientPresentation.vitalSigns.oxygenSaturation}%
                          </p>
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
                      <p className="text-blue-800 mb-3">{question.explanation}</p>
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
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                <span className={`font-mono text-sm sm:text-lg ${
                  timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
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

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
          {/* Question Navigation Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-8">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Question Navigation</h3>
              <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-5 gap-1 sm:gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium relative touch-manipulation ${
                      index === currentQuestionIndex
                        ? 'bg-blue-600 text-white'
                        : selectedAnswers[index] !== undefined
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
              </div>
            </div>
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
                  <p className="text-blue-800 text-sm">{currentQuestion.clinicalScenario}</p>
                </div>
              )}

              {/* Patient Presentation */}
              {currentQuestion?.patientPresentation && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Patient Presentation</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm"><span className="font-medium">Age:</span> {currentQuestion.patientPresentation.age} years</p>
                      <p className="text-sm"><span className="font-medium">Gender:</span> {currentQuestion.patientPresentation.gender}</p>
                      <p className="text-sm"><span className="font-medium">Chief Complaint:</span> {currentQuestion.patientPresentation.chiefComplaint}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Vital Signs</h4>
                      <div className="text-xs space-y-1">
                        <p>HR: {currentQuestion.patientPresentation.vitalSigns.heartRate} bpm</p>
                        <p>BP: {currentQuestion.patientPresentation.vitalSigns.bloodPressure}</p>
                        <p>Temp: {currentQuestion.patientPresentation.vitalSigns.temperature}°F</p>
                        <p>RR: {currentQuestion.patientPresentation.vitalSigns.respiratoryRate}/min</p>
                        <p>SpO2: {currentQuestion.patientPresentation.vitalSigns.oxygenSaturation}%</p>
                      </div>
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

              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {currentQuestion && (typeof currentQuestion.options === 'string' 
                  ? JSON.parse(currentQuestion.options) 
                  : currentQuestion.options).map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-3 sm:p-4 rounded-lg border transition-colors touch-manipulation ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start">
                      <span className="font-medium mr-2 sm:mr-3 text-gray-600 text-sm sm:text-base">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="text-sm sm:text-base leading-relaxed">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <button
                  onClick={() => handleQuestionNavigation('prev')}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:text-gray-900 touch-manipulation"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                <div className="flex items-center space-x-2 text-center">
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
                </div>

                <button
                  onClick={() => handleQuestionNavigation('next')}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="flex items-center px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:text-gray-900 touch-manipulation"
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