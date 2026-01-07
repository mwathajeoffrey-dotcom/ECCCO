"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Clock, ChevronLeft, ChevronRight, Flag, BookOpen, CheckCircle, Download } from "lucide-react";
import Link from "next/link";
import { generateExamPDF } from "@/lib/pdf/generator";
import { EnhancedErrorBoundary } from "@/components/ui/EnhancedErrorBoundary";
import { analytics } from "@/lib/analytics/service";
import BookmarkButton from "@/components/BookmarkButton";
import QuestionRating from "@/components/QuestionRating";

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
  const searchParams = useSearchParams();
  const filterParam = searchParams?.get("filter");

  const [selectedTopic, setSelectedTopic] = useState<string>("");
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

  // Fetch topics on component mount
  useEffect(() => {
    const fetchTopics = async () => {
      setLoadingTopics(true);
      try {
        const response = await fetch("/api/topics");
        const data = await response.json();
        setTopics(data);

        // Initialize analytics
        await analytics.initialize();
        analytics.trackPageView("/exam", "Exam Topics Selection");
      } catch (error) {
        console.error("Error fetching topics:", error);
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

  // Helper function to categorize topics
  const categorizeTopics = () => {
    // New medical comorbidity topic IDs (2024-2025)
    const newTopicIds = [
      "cardiac-disease-pregnancy",
      "diabetes-pregnancy",
      "hypertensive-disorders-pregnancy",
      "thromboembolism-pregnancy",
      "infectious-disease-pregnancy",
      "renal-disease-pregnancy",
      "thyroid-disorders-pregnancy",
      "hematologic-disorders-pregnancy",
    ];

    // If filter=new is set, show only new topics
    if (filterParam === "new") {
      const newTopics = topics.filter((t) => newTopicIds.some((id) => t.id.includes(id)));
      return {
        "New Medical Comorbidity Topics (2024-2025)": newTopics,
      };
    }

    // Otherwise, show all OB/GYN topics categorized as before
    const obgynTopics = topics.filter(
      (t) =>
        // Original emergency topics
        t.id.includes("placenta") ||
        t.id.includes("preeclampsia") ||
        t.id.includes("preterm") ||
        t.id.includes("vasa") ||
        t.id.includes("gyn-pain") ||
        t.id === "obstetric-emergencies" ||
        t.id === "general-obgyn-emergencies" ||
        // New medical comorbidity topics
        newTopicIds.some((id) => t.id.includes(id))
    );

    const otherTopics = topics.filter((t) => !obgynTopics.includes(t));

    return {
      "OB/GYN Emergencies": obgynTopics,
      "Other Topics": otherTopics,
    };
  };

  const fetchQuestions = async (topicId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/questions?topicId=${topicId}&limit=30`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch questions (${response.status})`);
      }
      
      const data = await response.json();

      // API returns {success, count, total, questions: [...]}
      // We need to extract the questions array
      const questionsArray = data.questions || [];
      
      if (questionsArray.length === 0) {
        throw new Error('No questions available for this topic');
      }
      
      setQuestions(questionsArray);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setFlaggedQuestions(new Set());
      setIsExamStarted(true);
      setIsExamFinished(false);
      setTimeRemaining(45 * 60);

      // Track exam start
      const topic = topics.find((t) => t.id === topicId);
      analytics.trackExamStart(topicId, topic?.name || "Unknown Topic");
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert(error instanceof Error ? error.message : 'Failed to load questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!isExamFinished) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = answerIndex === currentQuestion.correctIndex;

      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: answerIndex,
      }));

      setCurrentQuestionAnswered(true);

      // Track question answered
      analytics.trackQuestionAnswered(
        currentQuestion.id,
        isCorrect,
        45 * 60 - timeRemaining // Time spent so far
      );
    }
  };

  const handleQuestionNavigation = (direction: "prev" | "next") => {
    // Safety check: ensure questions is an array
    const questionsLength = Array.isArray(questions) ? questions.length : 0;
    if (direction === "prev" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentQuestionAnswered(selectedAnswers[currentQuestionIndex - 1] !== undefined);
    } else if (direction === "next" && currentQuestionIndex < questionsLength - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentQuestionAnswered(selectedAnswers[currentQuestionIndex + 1] !== undefined);
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

    // Calculate and track exam completion
    const score = calculateScore();
    const timeSpent = 45 * 60 - timeRemaining;

    analytics.trackExamComplete(selectedTopic, score, timeSpent);
  };

  const calculateScore = () => {
    // Safety check: ensure questions is an array
    if (!Array.isArray(questions) || questions.length === 0) {
      return 0;
    }
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
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Safety check: ensure questions is an array before accessing
  const questionsArray = Array.isArray(questions) ? questions : [];
  const currentQuestion = questionsArray[currentQuestionIndex];

  // If exam is started but questions array is invalid, show error
  if (isExamStarted && !isLoading && questionsArray.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Questions</h2>
            <p className="text-red-600 mb-4">
              Questions failed to load properly. Please try selecting the topic again.
            </p>
            <button
              onClick={() => {
                setIsExamStarted(false);
                setSelectedTopic("");
                setQuestions([]);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Topics
            </button>
          </div>
        </div>
      </div>
    );
  }

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
    const categorizedTopics = categorizeTopics();
    const obgynTopics =
      filterParam === "new"
        ? categorizedTopics["New Medical Comorbidity Topics (2024-2025)"]
        : categorizedTopics["OB/GYN Emergencies"];
    const otherTopics = categorizedTopics["Other Topics"];

    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Select Exam Topic</h1>
            <p className="text-gray-600 text-sm sm:text-base">Choose a topic for your 30-question timed exam</p>
          </div>

          {/* OB/GYN Topics Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4 pb-2 border-b-2 border-blue-200">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {filterParam === "new" ? "New Medical Comorbidity Topics (2024-2025)" : "OB/GYN Emergencies"}
                </h2>
                <p className="text-sm text-gray-600">
                  {obgynTopics?.length || 0} specialized topics • {(obgynTopics?.length || 0) * 30} questions
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {obgynTopics?.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer touch-manipulation border-l-4 border-blue-500"
                  onClick={() => {
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

          {/* Divider - Only show when not filtering */}
          {!filterParam && <div className="my-8 border-t border-gray-300"></div>}

          {/* Other Topics - Only show when not filtering */}
          {!filterParam && otherTopics && (
            <div>
              <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">All Emergency Topics</h2>
                <p className="text-sm text-gray-600">
                  Select from {otherTopics.length} additional emergency medicine topics
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {otherTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer touch-manipulation"
                    onClick={() => {
                      setSelectedTopic(topic.id);
                      analytics.trackTopicSelection(topic.id, topic.name);
                      fetchQuestions(topic.id);
                    }}
                  >
                    <div className="flex items-center mb-3">
                      <BookOpen className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
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
          )}
        </div>
      </div>
    );
  }

  // Exam Results Screen
  if (isExamFinished) {
    const score = calculateScore();
    // Safety check: ensure questions is an array
    const questionsArray = Array.isArray(questions) ? questions : [];
    const correct = questionsArray.filter((q, i) => selectedAnswers[i] === q.correctIndex).length;

    const handleDownloadPDF = () => {
      try {
        const examResults = {
          questions,
          userAnswers: selectedAnswers,
          score,
          totalTime: 45 * 60 - timeRemaining, // Total time minus remaining time
          topicName: topics.find((t) => t.id === selectedTopic)?.name || "Unknown Topic",
          completedAt: new Date(),
        };

        // Track PDF download
        analytics.trackPDFDownload(selectedTopic, score);

        generateExamPDF(examResults);
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert(
          "Sorry, there was an error generating the PDF. Please try again or contact support if the issue persists."
        );
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
                <div className="text-3xl font-bold text-red-600">{questionsArray.length - correct}</div>
                <div className="text-gray-600">Incorrect Answers</div>
              </div>
            </div>

            <div className="space-y-6">
              {questionsArray.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctIndex;
                const options = typeof question.options === "string" ? JSON.parse(question.options) : question.options;
                const references =
                  typeof question.references === "string" ? JSON.parse(question.references) : question.references;

                return (
                  <div key={question.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1">
                        Question {index + 1}: {question.question}
                      </h3>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </div>
                    </div>

                    {/* Patient Presentation in Results */}
                    {question.patientPresentation && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Patient Details</h4>
                        <div className="text-sm text-gray-700">
                          <p>
                            {typeof question.patientPresentation.age === "number"
                              ? `${question.patientPresentation.age}yo`
                              : question.patientPresentation.age}{" "}
                            {question.patientPresentation.gender}, {question.patientPresentation.chiefComplaint}
                          </p>
                          {question.patientPresentation.vitalSigns ? (
                            <p className="mt-1">
                              <span className="font-medium">Vitals:</span> HR{" "}
                              {question.patientPresentation.vitalSigns.heartRate}, BP{" "}
                              {question.patientPresentation.vitalSigns.bloodPressure}, Temp{" "}
                              {question.patientPresentation.vitalSigns.temperature}°F, RR{" "}
                              {question.patientPresentation.vitalSigns.respiratoryRate}, SpO2{" "}
                              {question.patientPresentation.vitalSigns.oxygenSaturation}%
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
                              ? "bg-green-50 border-green-300"
                              : optionIndex === userAnswer && !isCorrect
                              ? "bg-red-50 border-red-300"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exam Interface
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b dark:bg-white dark:border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <h1 className="text-base sm:text-xl font-semibold text-gray-900 truncate">
                {topics.find((t) => t.id === selectedTopic)?.name} Exam
              </h1>
              <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                {currentQuestionIndex + 1}/{questionsArray.length}
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-6">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span
                  className={`font-mono text-sm sm:text-lg font-semibold ${
                    timeRemaining < 300 ? "text-red-600" : "text-gray-900"
                  }`}
                >
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
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-8 dark:bg-white">
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
                {questionsArray.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentQuestionIndex(index);
                      setCurrentQuestionAnswered(selectedAnswers[index] !== undefined);
                    }}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium relative touch-manipulation transition-all duration-200 ${
                      index === currentQuestionIndex
                        ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-300"
                        : selectedAnswers[index] !== undefined
                        ? "bg-emerald-500 text-white border border-emerald-600 shadow-md hover:bg-emerald-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300"
                    }`}
                  >
                    {index + 1}
                    {flaggedQuestions.has(index) && <Flag className="w-3 h-3 text-red-500 absolute -top-1 -right-1" />}
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
                      <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
                      <span>Current Question</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-emerald-500 rounded mr-2"></div>
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
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 dark:bg-white dark:text-gray-900">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 flex-1 leading-relaxed">
                  {currentQuestion?.question}
                </h2>
                <button
                  onClick={toggleFlag}
                  className={`ml-2 sm:ml-4 p-1.5 sm:p-2 rounded-lg touch-manipulation ${
                    flaggedQuestions.has(currentQuestionIndex)
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500"
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
              <EnhancedErrorBoundary
                fallback={
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">Error loading patient details. Continuing with question...</p>
                  </div>
                }
              >
                {currentQuestion?.patientPresentation && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Patient Presentation</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Age:</span>{" "}
                          {typeof currentQuestion.patientPresentation.age === "number"
                            ? `${currentQuestion.patientPresentation.age} years`
                            : currentQuestion.patientPresentation.age}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Gender:</span> {currentQuestion.patientPresentation.gender}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Chief Complaint:</span>{" "}
                          {currentQuestion.patientPresentation.chiefComplaint}
                        </p>
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
                        <p className="text-xs text-gray-600">
                          {currentQuestion.patientPresentation.pastMedicalHistory.join(", ")}
                        </p>
                      </div>
                    )}
                    {currentQuestion.patientPresentation.currentMedications && (
                      <div className="mt-2">
                        <h4 className="font-medium text-sm mb-1">Current Medications</h4>
                        <p className="text-xs text-gray-600">
                          {currentQuestion.patientPresentation.currentMedications.join(", ")}
                        </p>
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-yellow-900">Visual Analysis Required</h3>
                  </div>
                  <p className="text-yellow-800 text-sm leading-relaxed">{currentQuestion.imageDescription}</p>
                </div>
              )}

              <EnhancedErrorBoundary
                fallback={
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">Error loading question options. Please try refreshing the page.</p>
                  </div>
                }
              >
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {currentQuestion &&
                    (typeof currentQuestion.options === "string"
                      ? JSON.parse(currentQuestion.options)
                      : currentQuestion.options
                    ).map((option: string, index: number) => {
                      const isSelected = selectedAnswers[currentQuestionIndex] === index;
                      const isCorrect = index === currentQuestion.correctIndex;
                      const showAnswer = showAnswerAfterAttempt && currentQuestionAnswered;

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={showAnswer && !isExamFinished}
                          className={`w-full text-left p-3 sm:p-4 rounded-lg border transition-all duration-200 touch-manipulation ${
                            showAnswer && isCorrect
                              ? "border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200"
                              : showAnswer && isSelected && !isCorrect
                              ? "border-red-500 bg-red-50 text-red-900 ring-2 ring-red-200"
                              : isSelected
                              ? "border-blue-500 bg-blue-100 text-blue-900 shadow-md ring-2 ring-blue-300"
                              : "border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-900"
                          } ${showAnswer && !isExamFinished ? "cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          <div className="flex items-start">
                            <span
                              className={`font-medium mr-2 sm:mr-3 text-sm sm:text-base ${
                                showAnswer && isCorrect
                                  ? "text-emerald-700"
                                  : showAnswer && isSelected && !isCorrect
                                  ? "text-red-700"
                                  : isSelected
                                  ? "text-blue-700"
                                  : "text-gray-700"
                              }`}
                            >
                              {String.fromCharCode(65 + index)}.
                            </span>
                            <span
                              className={`text-sm sm:text-base leading-relaxed flex-1 ${
                                showAnswer && isCorrect
                                  ? "text-emerald-900 font-medium"
                                  : showAnswer && isSelected && !isCorrect
                                  ? "text-red-900"
                                  : isSelected
                                  ? "text-blue-900 font-medium"
                                  : "text-gray-900"
                              }`}
                            >
                              {option}
                            </span>
                            {showAnswer && isCorrect && (
                              <CheckCircle className="w-5 h-5 text-emerald-600 ml-2 flex-shrink-0" />
                            )}
                            {showAnswer && isSelected && !isCorrect && (
                              <div className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center ml-2 flex-shrink-0">
                                ✕
                              </div>
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
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-2 text-sm">References:</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      {(typeof currentQuestion.references === "string"
                        ? JSON.parse(currentQuestion.references)
                        : currentQuestion.references
                      ).map((ref: string, refIndex: number) => (
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
              <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
                <button
                  onClick={() => handleQuestionNavigation("prev")}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:text-gray-900 touch-manipulation"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                <div className="flex items-center space-x-2 text-center">
                  <span className="text-xs sm:text-sm text-gray-500">Difficulty:</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      currentQuestion?.difficulty === "easy"
                        ? "bg-green-100 text-green-800"
                        : currentQuestion?.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {currentQuestion?.difficulty}
                  </span>
                </div>

                <button
                  onClick={() => handleQuestionNavigation("next")}
                  disabled={currentQuestionIndex === questionsArray.length - 1}
                  className="flex items-center px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:text-gray-900 touch-manipulation"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Bookmark, Notes, and Rating Section */}
              {currentQuestion && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Study Tools</h3>

                  {/* Bookmark and Notes */}
                  <div className="mb-4">
                    <BookmarkButton
                      questionId={currentQuestion.id}
                      category={selectedTopic}
                      initialBookmarked={false}
                      initialNotes=""
                    />
                  </div>

                  {/* Question Rating */}
                  <div>
                    <QuestionRating questionId={currentQuestion.id} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
