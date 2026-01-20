"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Users, Loader2, Trophy, Gamepad2 } from "lucide-react";
import { api, ApiError } from "@/lib/api-client";
import { logger } from "@/lib/logger";

export default function JoinQuizPage() {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJoinQuiz = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!accessCode.trim()) {
      setError("Please enter an access code");
      return;
    }

    if (!playerName.trim()) {
      setError("Please enter your name");
      return;
    }

    if (accessCode.trim().length !== 6) {
      setError("Access code must be 6 characters");
      return;
    }

    setIsJoining(true);
    setError(null);

    try {
      const result = await api.quiz.join(accessCode.trim().toUpperCase(), playerName.trim());

      // Success! Navigate to participant page with participantId and nickname
      const params = new URLSearchParams({
        participantId: result.participantId,
        nickname: result.nickname,
      });
      router.push(`/quiz-arena/play/${accessCode.trim().toUpperCase()}?${params.toString()}`);
    } catch (error) {
      let errorMessage = "Failed to join quiz";

      if (error instanceof ApiError) {
        if (error.status === 404) {
          errorMessage = "Quiz not found. Please check the access code.";
        } else if (error.status === 400) {
          errorMessage = error.message || "Invalid access code or name.";
        } else if (error.status === 409) {
          errorMessage = "A player with this name already joined.";
        } else {
          errorMessage = error.message;
        }
      } else {
        errorMessage = "Network error. Please check your connection.";
      }

      setError(errorMessage);

      logger.error("Failed to join quiz", error instanceof Error ? error : undefined, {
        accessCode: accessCode.trim(),
        playerName: playerName.trim(),
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handleAccessCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Auto-uppercase and limit to 6 characters
    const value = e.target.value.toUpperCase().slice(0, 6);
    setAccessCode(value);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <button
            onClick={() => router.push("/quiz-arena")}
            className="flex items-center text-white/90 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Quiz Arena
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Join Quiz</h1>
              <p className="text-white/90 mt-1">Enter the access code to join a live quiz session</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Main Join Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4">
              <Gamepad2 className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ready to Play?</h2>
            <p className="text-gray-600 dark:text-gray-300">Get the 6-digit access code from your quiz host</p>
          </div>

          <form onSubmit={handleJoinQuiz} className="space-y-6">
            {/* Access Code Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Access Code</label>
              <input
                type="text"
                value={accessCode}
                onChange={handleAccessCodeChange}
                placeholder="ABC123"
                className="w-full px-6 py-4 text-center text-3xl font-bold tracking-widest border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all uppercase"
                maxLength={6}
                disabled={isJoining}
                autoComplete="off"
                autoFocus
              />
              <p className="mt-2 text-sm text-gray-500 text-center">Enter the 6-character code (letters and numbers)</p>
            </div>

            {/* Player Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value);
                  setError(null);
                }}
                placeholder="Enter your name"
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                maxLength={30}
                disabled={isJoining}
              />
              <p className="mt-2 text-sm text-gray-500">This is how others will see you in the game</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-red-800 font-medium text-center">{error}</p>
              </div>
            )}

            {/* Join Button */}
            <button
              type="submit"
              disabled={isJoining || !accessCode.trim() || !playerName.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              {isJoining ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Joining Quiz...
                </>
              ) : (
                <>
                  <Users className="w-6 h-6" />
                  Join Quiz
                </>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-600" />
              How to Join a Quiz
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">1.</span>
                <span>Get the 6-digit access code from the quiz host</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">2.</span>
                <span>Enter the code in the field above</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">3.</span>
                <span>Type your name (how you want to appear on the leaderboard)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">4.</span>
                <span>Click "Join Quiz" and wait for the host to start!</span>
              </li>
            </ul>
          </div>

          {/* Troubleshooting */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Trouble joining?</p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Make sure the code is exactly 6 characters</li>
              <li>• Check with the host that the quiz hasn't started yet</li>
              <li>• Try a different name if yours is already taken</li>
              <li>• Refresh this page if the button is stuck</li>
            </ul>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">800+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Questions</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">Live</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Real-time</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">Fun</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Competitive</div>
          </div>
        </div>
      </div>
    </div>
  );
}
