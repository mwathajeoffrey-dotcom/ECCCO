"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Trophy, Clock, Zap, CheckCircle, XCircle, Users, Star, Flame } from "lucide-react";

interface Participant {
  id: string;
  nickname: string;
  score: number;
  streak: number;
  rank?: number;
}

interface QuizSession {
  id: string;
  title: string;
  accessCode: string;
  status: string;
  currentQuestion: number;
  timePerQuestion: number;
  pointsPerQuestion: number;
  playSound: boolean;
  showAnswerAfter: boolean;
  questions: any[];
  participants: Participant[];
}

export default function PlayQuizPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessCode = params.accessCode as string;

  // Get URL parameters (from join page redirect)
  const urlParticipantId = searchParams.get("participantId");
  const urlNickname = searchParams.get("nickname");

  const [session, setSession] = useState<QuizSession | null>(null);
  const [nickname, setNickname] = useState(urlNickname || "");
  const [participantId, setParticipantId] = useState<string | null>(urlParticipantId);
  const [myScore, setMyScore] = useState(0);
  const [myStreak, setMyStreak] = useState(0);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joined, setJoined] = useState(!!urlParticipantId); // Auto-join if participantId is in URL

  // Fetch session data periodically
  useEffect(() => {
    if (joined) {
      fetchSession();
      const interval = setInterval(fetchSession, 2000); // Poll every 2 seconds
      return () => clearInterval(interval);
    }
  }, [joined, accessCode]);

  // Timer countdown
  useEffect(() => {
    if (session?.status === "QUESTION" && !answerSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [session?.status, answerSubmitted, timeLeft]);

  // Reset answer state when question changes
  useEffect(() => {
    if (session) {
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
      setAnswerCorrect(null);
      setPointsEarned(0);
      setTimeLeft(session.timePerQuestion);
    }
  }, [session?.currentQuestion]);

  const fetchSession = async () => {
    try {
      const response = await fetch(`/api/quiz-arena/join/${accessCode}`);
      if (!response.ok) {
        throw new Error("Session not found");
      }
      const data = await response.json();
      setSession(data);

      // Update my stats
      if (participantId) {
        const me = data.participants.find((p: Participant) => p.id === participantId);
        if (me) {
          setMyScore(me.score);
          setMyStreak(me.streak);
          // Calculate rank
          const sorted = [...data.participants].sort((a, b) => b.score - a.score);
          setMyRank(sorted.findIndex((p) => p.id === participantId) + 1);
        }
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching session:", err);
      setError("Quiz session not found");
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!nickname.trim()) {
      alert("Please enter a nickname");
      return;
    }

    try {
      const response = await fetch(`/api/quiz-arena/join/${accessCode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: nickname.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setParticipantId(data.participantId);
        setJoined(true);
        fetchSession();
      } else {
        alert("Error joining quiz: " + data.error);
      }
    } catch (err) {
      console.error("Error joining quiz:", err);
      alert("Failed to join quiz");
    }
  };

  const handleAnswerSelect = async (optionIndex: number) => {
    if (answerSubmitted || !session) return;

    setSelectedAnswer(optionIndex);
    setAnswerSubmitted(true);

    const answerTime = session.timePerQuestion - timeLeft;

    try {
      const response = await fetch(`/api/quiz-arena/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: session.id,
          participantId,
          questionIndex: session.currentQuestion,
          selectedOption: optionIndex,
          timeToAnswer: answerTime * 1000, // Convert to milliseconds
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAnswerCorrect(data.isCorrect);
        setPointsEarned(data.pointsEarned);
        setMyScore(data.newScore);
        setMyStreak(data.newStreak);
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  if (loading && !joined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-2xl font-bold mb-4">{error}</div>
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

  // JOIN SCREEN
  if (!joined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full">
          <div className="text-center mb-8">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Quiz!</h1>
            <p className="text-gray-600">Code: {accessCode}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Nickname</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleJoin()}
                placeholder="Enter your nickname..."
                maxLength={20}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                autoFocus
              />
            </div>

            <button
              onClick={handleJoin}
              disabled={!nickname.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white text-xl font-black py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:cursor-not-allowed disabled:transform-none"
            >
              Join Quiz! 🎮
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Loading quiz...</div>
      </div>
    );
  }

  const isLobby = session.status === "LOBBY";
  const isFinished = session.status === "FINISHED";

  // LOBBY SCREEN
  if (isLobby) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
              <Users className="w-20 h-20 text-purple-600 mx-auto mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Ready!</h2>
              <p className="text-gray-600 mb-8">Waiting for host to start the quiz...</p>

              <div className="mb-8">
                <div className="text-sm text-gray-600 mb-2">You joined as</div>
                <div className="text-3xl font-bold text-purple-600">{nickname}</div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Players in Lobby ({session.participants.length})</h3>
                <div className="grid grid-cols-2 gap-3">
                  {session.participants.map((participant) => (
                    <div
                      key={participant.id}
                      className={`p-3 rounded-xl font-semibold ${
                        participant.id === participantId ? "bg-purple-600 text-white" : "bg-white text-gray-900"
                      }`}
                    >
                      {participant.nickname}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FINISHED SCREEN
  if (isFinished) {
    const topThree = [...session.participants].sort((a, b) => b.score - a.score).slice(0, 3);
    const isWinner = topThree[0]?.id === participantId;
    const isTopThree = topThree.some((p) => p.id === participantId);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
              {isWinner && (
                <div className="mb-6">
                  <div className="text-6xl mb-4">🏆</div>
                  <h2 className="text-4xl font-bold text-yellow-600 mb-2">You Won!</h2>
                  <p className="text-2xl text-gray-600">Congratulations!</p>
                </div>
              )}

              {!isWinner && isTopThree && (
                <div className="mb-6">
                  <div className="text-6xl mb-4">{myRank === 2 ? "🥈" : "🥉"}</div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Great Job!</h2>
                  <p className="text-xl text-gray-600">You finished {myRank === 2 ? "2nd" : "3rd"}!</p>
                </div>
              )}

              {!isTopThree && (
                <div className="mb-6">
                  <Trophy className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
                  <p className="text-xl text-gray-600">You finished #{myRank}</p>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-purple-50 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-purple-600">{myScore}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
                <div className="bg-blue-50 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-blue-600">#{myRank}</div>
                  <div className="text-sm text-gray-600">Rank</div>
                </div>
                <div className="bg-orange-50 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-orange-600">{myStreak}</div>
                  <div className="text-sm text-gray-600">Best Streak</div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-xl text-gray-900 mb-4">Final Rankings</h3>
                <div className="space-y-3">
                  {topThree.map((participant, index) => (
                    <div
                      key={participant.id}
                      className={`p-4 rounded-2xl flex items-center justify-between ${
                        index === 0
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white scale-105"
                          : index === 1
                          ? "bg-gradient-to-r from-gray-300 to-gray-400 text-white"
                          : "bg-gradient-to-r from-orange-300 to-orange-400 text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="text-2xl font-black mr-3">{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</div>
                        <div className="font-bold text-lg">{participant.nickname}</div>
                      </div>
                      <div className="text-2xl font-black">{participant.score}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => router.push("/quiz-arena")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // QUESTION SCREEN
  const currentQuestionData = session.questions[session.currentQuestion];

  if (!currentQuestionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Loading question...</div>
      </div>
    );
  }

  const answerColors = [
    { bg: "from-red-500 to-red-600", hover: "hover:from-red-600 hover:to-red-700", border: "border-red-400" },
    { bg: "from-blue-500 to-blue-600", hover: "hover:from-blue-600 hover:to-blue-700", border: "border-blue-400" },
    {
      bg: "from-yellow-500 to-yellow-600",
      hover: "hover:from-yellow-600 hover:to-yellow-700",
      border: "border-yellow-400",
    },
    { bg: "from-green-500 to-green-600", hover: "hover:from-green-600 hover:to-green-700", border: "border-green-400" },
    {
      bg: "from-purple-500 to-purple-600",
      hover: "hover:from-purple-600 hover:to-purple-700",
      border: "border-purple-400",
    },
    { bg: "from-pink-500 to-pink-600", hover: "hover:from-pink-600 hover:to-pink-700", border: "border-pink-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600">
      {/* Top Stats Bar */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Trophy className="w-5 h-5 mr-1" />
                <span className="font-bold">{myScore}</span>
              </div>
              {myStreak > 0 && (
                <div className="flex items-center bg-orange-500/30 px-3 py-1 rounded-full">
                  <Flame className="w-4 h-4 mr-1" />
                  <span className="font-bold">{myStreak}</span>
                </div>
              )}
              <div className="text-sm opacity-80">Rank: #{myRank}</div>
            </div>
            <div className="text-sm font-semibold">{nickname}</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Timer & Question Number */}
          <div className="mb-6 flex items-center justify-between">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-lg">
              <div className="text-sm text-gray-600">Question</div>
              <div className="text-2xl font-bold text-purple-600">
                {session.currentQuestion + 1} / {session.questions.length}
              </div>
            </div>
            <div className={`bg-white rounded-2xl px-6 py-3 shadow-lg ${timeLeft <= 5 ? "animate-pulse" : ""}`}>
              <div className="flex items-center">
                <Clock className={`w-6 h-6 mr-2 ${timeLeft <= 5 ? "text-red-600" : "text-blue-600"}`} />
                <div className="text-3xl font-black ${timeLeft <= 5 ? 'text-red-600' : 'text-blue-600'}">
                  {timeLeft}s
                </div>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{currentQuestionData.questionText}</h2>

            {/* Answer Feedback */}
            {answerSubmitted && answerCorrect !== null && (
              <div className={`mb-6 p-6 rounded-2xl ${answerCorrect ? "bg-green-50" : "bg-red-50"}`}>
                <div className="flex items-center justify-center">
                  {answerCorrect ? (
                    <>
                      <CheckCircle className="w-12 h-12 text-green-600 mr-3" />
                      <div>
                        <div className="text-2xl font-bold text-green-600">Correct! 🎉</div>
                        <div className="text-green-700">+{pointsEarned} points</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-12 h-12 text-red-600 mr-3" />
                      <div className="text-2xl font-bold text-red-600">Incorrect</div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestionData.options?.map((option: string, index: number) => {
                const colors = answerColors[index % answerColors.length];
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer =
                  session.showAnswerAfter && answerSubmitted && index === currentQuestionData.correctIndex;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={answerSubmitted}
                    className={`bg-gradient-to-br ${colors.bg} ${
                      !answerSubmitted && colors.hover
                    } text-white p-6 rounded-2xl font-bold text-lg text-center transition-all transform ${
                      !answerSubmitted ? "hover:scale-105" : ""
                    } ${isSelected ? `scale-105 border-4 ${colors.border}` : ""} ${
                      isCorrectAnswer ? "ring-4 ring-green-400" : ""
                    } disabled:cursor-not-allowed disabled:opacity-70`}
                  >
                    {option}
                    {isSelected && answerSubmitted && <div className="mt-2">{answerCorrect ? "✓" : "✗"}</div>}
                    {isCorrectAnswer && <div className="mt-2 text-sm">✓ Correct Answer</div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Waiting Message */}
          {answerSubmitted && (
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-gray-600">⏳ Waiting for other players...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
