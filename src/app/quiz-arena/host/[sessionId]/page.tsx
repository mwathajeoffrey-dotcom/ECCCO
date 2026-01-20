"use client";
import { logger } from '@/lib/logger';

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Users,
  Play,
  Pause,
  SkipForward,
  StopCircle,
  Copy,
  Check,
  Trophy,
  Clock,
  ArrowLeft,
  Music,
  Volume2,
  Share2,
  CheckCircle,
  Circle,
} from "lucide-react";

interface Answer {
  participantId: string;
  questionIndex: number;
  selectedOption: number;
  isCorrect: boolean;
  timeToAnswer: number;
  pointsEarned: number;
}

interface Participant {
  id: string;
  nickname: string;
  avatar?: string;
  score: number;
  streak: number;
  rank?: number;
  isActive: boolean;
  joinedAt: string;
}

interface QuizSession {
  id: string;
  title: string;
  description?: string;
  accessCode: string;
  status: string;
  currentQuestion: number;
  timePerQuestion: number;
  pointsPerQuestion: number;
  playMusic: boolean;
  playSound: boolean;
  questions: any[];
  participants: Participant[];
  answers: Answer[];
  createdAt: string;
}

export default function HostQuizPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const [session, setSession] = useState<QuizSession | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [submittedCount, setSubmittedCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionStartTimeRef = useRef<number | null>(null);

  // Fetch session data
  useEffect(() => {
    fetchSession();
    const interval = setInterval(fetchSession, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, [sessionId]);

  // Countdown timer effect
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (
      timeLeft === 0 &&
      isTimerActive &&
      session &&
      session.status !== "LOBBY" &&
      session.status !== "FINISHED"
    ) {
      // Time's up! Auto-advance to next question
      handleNextQuestion();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, isTimerActive, session]);

  // Check if all participants have submitted when session updates
  useEffect(() => {
    if (session && session.status !== "LOBBY" && session.status !== "FINISHED") {
      const currentQuestionAnswers =
        session.answers?.filter((answer) => answer.questionIndex === session.currentQuestion) || [];

      setSubmittedCount(currentQuestionAnswers.length);

      // Auto-advance if all participants have submitted
      if (
        session.participants.length > 0 &&
        currentQuestionAnswers.length === session.participants.length &&
        isTimerActive
      ) {
        // Small delay to show all submissions before advancing
        setTimeout(() => {
          handleNextQuestion();
        }, 2000);
      }
    }
  }, [session]);

  const fetchSession = async () => {
    try {
      const response = await fetch(`/api/quiz-arena/session/${sessionId}`);
      if (!response.ok) {
        throw new Error("Session not found");
      }
      const data = await response.json();

      // Validate session data
      if (!data.questions || data.questions.length === 0) {
        logger.error("Session has no questions:", data);
        setError("This quiz has no questions configured.");
        setLoading(false);
        return;
      }

      logger.debug("Host session loaded:", {
        id: data.id,
        status: data.status,
        questionCount: data.questions.length,
        currentQuestion: data.currentQuestion,
        participantCount: data.participants?.length || 0,
        answerCount: data.answers?.length || 0,
      });

      setSession(data);
      setParticipants(data.participants || []);
      setLoading(false);
    } catch (err) {
      logger.error("Error fetching session:", err);
      setError("Failed to load quiz session");
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (session) {
      navigator.clipboard.writeText(session.accessCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareLink = () => {
    if (session) {
      const url = `${window.location.origin}/quiz-arena/play/${session.accessCode}`;
      navigator.clipboard.writeText(url);
      alert("Join link copied to clipboard!");
    }
  };

  const handleStartQuiz = async () => {
    try {
      const response = await fetch(`/api/quiz-arena/session/${sessionId}/start`, {
        method: "POST",
      });
      if (response.ok) {
        await fetchSession();
        // Start timer for first question
        if (session) {
          setTimeLeft(session.timePerQuestion);
          setIsTimerActive(true);
          questionStartTimeRef.current = Date.now();
          setSubmittedCount(0);
        }
      }
    } catch (err) {
      logger.error("Error starting quiz:", err);
    }
  };

  const handleNextQuestion = async () => {
    try {
      setIsTimerActive(false); // Stop current timer
      const response = await fetch(`/api/quiz-arena/session/${sessionId}/next`, {
        method: "POST",
      });
      if (response.ok) {
        await fetchSession();
        // Start timer for next question
        if (session && session.currentQuestion < session.questions.length - 1) {
          setTimeLeft(session.timePerQuestion);
          setIsTimerActive(true);
          questionStartTimeRef.current = Date.now();
          setSubmittedCount(0);
        } else {
          setIsTimerActive(false); // Quiz finished
        }
      }
    } catch (err) {
      logger.error("Error moving to next question:", err);
    }
  };

  const handleEndQuiz = async () => {
    if (confirm("Are you sure you want to end this quiz?")) {
      try {
        setIsTimerActive(false); // Stop timer
        const response = await fetch(`/api/quiz-arena/session/${sessionId}/end`, {
          method: "POST",
        });
        if (response.ok) {
          fetchSession();
        }
      } catch (err) {
        logger.error("Error ending quiz:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-2xl font-bold mb-4">{error || "Session not found"}</div>
          <button
            onClick={() => router.push("/quiz-arena")}
            className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100"
          >
            Back to Quiz Arena
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = session.questions[session.currentQuestion];
  const isLobby = session.status === "LOBBY";
  const isFinished = session.status === "FINISHED";

  // Extract question text - handle both field names
  const currentQuestionText = currentQuestionData
    ? currentQuestionData.questionText || currentQuestionData.question || "Question text not available"
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/quiz-arena")}
              className="text-white/80 hover:text-white flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Exit
            </button>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">{session.title}</h1>
              <p className="text-white/80 text-sm">Host Controls</p>
            </div>

            <div className="flex items-center space-x-2">
              {session.playMusic && <Music className="w-5 h-5 text-green-300" />}
              {session.playSound && <Volume2 className="w-5 h-5 text-green-300" />}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* LOBBY VIEW */}
        {isLobby && (
          <div className="max-w-4xl mx-auto">
            {/* Access Code Display */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl mb-8 text-center">
              <div className="mb-6">
                <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Waiting for Players...</h2>
                <p className="text-gray-600 dark:text-gray-300">Share this code with participants to join</p>
              </div>

              <div className="mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Join Code</div>
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-6xl font-black text-purple-600 tracking-widest">{session.accessCode}</div>
                  <button
                    onClick={handleCopyCode}
                    className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-4 rounded-2xl transition-all"
                  >
                    {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4 mb-6">
                <button
                  onClick={handleShareLink}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Link
                </button>
              </div>

              <div className="text-sm text-gray-500">
                {window.location.origin}/quiz-arena/play/{session.accessCode}
              </div>
            </div>

            {/* Participants Grid */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Users className="w-6 h-6 mr-2 text-purple-600" />
                  Players ({participants.length})
                </h3>
              </div>

              {participants.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No players yet...</p>
                  <p className="text-gray-400 text-sm mt-2">Waiting for players to join with the code above</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {participants.map((participant, index) => (
                    <div
                      key={participant.id}
                      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 text-center transform hover:scale-105 transition-all"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold">
                        {participant.nickname.charAt(0).toUpperCase()}
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white truncate">{participant.nickname}</div>
                      <div className="text-xs text-green-600 mt-1">● Ready</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quiz Info */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl mb-8">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-600">{session.questions.length}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Questions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">{session.timePerQuestion}s</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Per Question</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{session.pointsPerQuestion}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">Max Points</div>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartQuiz}
              disabled={participants.length === 0}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white text-2xl font-black py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              <Play className="w-8 h-8 mr-3" />
              Start Quiz!
            </button>
          </div>
        )}

        {/* IN-PROGRESS VIEW */}
        {!isLobby && !isFinished && (
          <div className="max-w-6xl mx-auto">
            {/* Live Timer & Submission Counter */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              {/* Countdown Timer */}
              <div
                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-4 ${
                  timeLeft <= 5
                    ? "border-red-500 animate-pulse"
                    : timeLeft <= 10
                    ? "border-orange-500"
                    : "border-green-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-1">Time Remaining</div>
                    <div
                      className={`text-5xl font-black ${
                        timeLeft <= 5 ? "text-red-600" : timeLeft <= 10 ? "text-orange-600" : "text-green-600"
                      }`}
                    >
                      {timeLeft}s
                    </div>
                  </div>
                  <Clock
                    className={`w-16 h-16 ${
                      timeLeft <= 5 ? "text-red-500" : timeLeft <= 10 ? "text-orange-500" : "text-green-500"
                    }`}
                  />
                </div>
                <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      timeLeft <= 5 ? "bg-red-500" : timeLeft <= 10 ? "bg-orange-500" : "bg-green-500"
                    }`}
                    style={{ width: `${(timeLeft / (session?.timePerQuestion || 30)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Submission Counter */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-1">Submissions</div>
                    <div className="text-5xl font-black text-blue-600">
                      {submittedCount}/{participants.length}
                    </div>
                  </div>
                  <div className="relative">
                    <Users className="w-16 h-16 text-blue-500" />
                    {submittedCount === participants.length && participants.length > 0 && (
                      <CheckCircle className="w-8 h-8 text-green-500 absolute -top-2 -right-2 animate-bounce" />
                    )}
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  {participants.map((p) => {
                    const hasSubmitted = session?.answers?.some(
                      (a) => a.participantId === p.id && a.questionIndex === session.currentQuestion
                    );
                    return (
                      <div
                        key={p.id}
                        className={`flex-1 h-2 rounded-full ${
                          hasSubmitted ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                        title={`${p.nickname}${hasSubmitted ? " ✓" : ""}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Question Display */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      Question {session.currentQuestion + 1} / {session.questions.length}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-purple-600 font-bold">{session.pointsPerQuestion} pts</div>
                    </div>
                  </div>

                  {currentQuestionData && (
                    <>
                      <div className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                        {currentQuestionText}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {currentQuestionData.options?.map((option: string, index: number) => {
                          const colors = [
                            "from-red-500 to-red-600",
                            "from-blue-500 to-blue-600",
                            "from-yellow-500 to-yellow-600",
                            "from-green-500 to-green-600",
                            "from-purple-500 to-purple-600",
                            "from-pink-500 to-pink-600",
                          ];
                          return (
                            <div
                              key={index}
                              className={`bg-gradient-to-br ${
                                colors[index % colors.length]
                              } text-white p-6 rounded-2xl font-bold text-center`}
                            >
                              {option}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                {/* Controls */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleNextQuestion}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all flex items-center justify-center"
                  >
                    <SkipForward className="w-5 h-5 mr-2" />
                    Next Question
                  </button>
                  <button
                    onClick={handleEndQuiz}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all flex items-center justify-center"
                  >
                    <StopCircle className="w-5 h-5 mr-2" />
                    End Quiz
                  </button>
                </div>
              </div>

              {/* Live Leaderboard */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                  Leaderboard
                </h3>

                <div className="space-y-3">
                  {participants
                    .sort((a, b) => b.score - a.score)
                    .map((participant, index) => (
                      <div
                        key={participant.id}
                        className={`flex items-center p-3 rounded-xl ${
                          index === 0
                            ? "bg-yellow-50 border-2 border-yellow-400"
                            : index === 1
                            ? "bg-gray-50 border-2 border-gray-400"
                            : index === 2
                            ? "bg-orange-50 border-2 border-orange-400"
                            : "bg-gray-50"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 ${
                            index === 0
                              ? "bg-yellow-400 text-white"
                              : index === 1
                              ? "bg-gray-400 text-white"
                              : index === 2
                              ? "bg-orange-400 text-white"
                              : "bg-gray-300 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-900 dark:text-white">{participant.nickname}</div>
                          {participant.streak > 0 && (
                            <div className="text-xs text-orange-600">🔥 {participant.streak} streak</div>
                          )}
                        </div>
                        <div className="font-bold text-purple-600">{participant.score}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FINISHED VIEW */}
        {isFinished && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl text-center">
              <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6 animate-bounce" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Quiz Complete!</h2>

              {participants.length > 0 && (
                <div className="mb-8">
                  <div className="text-2xl font-bold text-purple-600 mb-6">🏆 Final Rankings</div>

                  <div className="space-y-4">
                    {participants
                      .sort((a, b) => b.score - a.score)
                      .slice(0, 3)
                      .map((participant, index) => (
                        <div
                          key={participant.id}
                          className={`p-6 rounded-2xl ${
                            index === 0
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white scale-110"
                              : index === 1
                              ? "bg-gradient-to-r from-gray-300 to-gray-400 text-white scale-105"
                              : "bg-gradient-to-r from-orange-300 to-orange-400 text-white"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="text-3xl font-black mr-4">
                                {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                              </div>
                              <div className="text-left">
                                <div className="text-2xl font-bold">{participant.nickname}</div>
                                {participant.streak > 0 && (
                                  <div className="text-sm opacity-90">Best streak: {participant.streak}</div>
                                )}
                              </div>
                            </div>
                            <div className="text-3xl font-black">{participant.score}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => router.push("/quiz-arena")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
              >
                Create Another Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
