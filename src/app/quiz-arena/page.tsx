"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trophy, Users, Zap, Play, Plus, Clock, Star, ArrowRight, Target } from "lucide-react";

export default function QuizArenaPage() {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (joinCode.length === 6) {
      setIsJoining(true);
      router.push(`/quiz-arena/play/${joinCode.toUpperCase()}`);
    }
  };

  const handleCreateQuiz = () => {
    router.push("/quiz-arena/create");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-16 h-16 text-yellow-300 animate-bounce" />
          </div>
          <h1 className="text-6xl font-black text-white mb-4 drop-shadow-lg">Quiz Arena</h1>
          <p className="text-2xl text-white/90 font-semibold">Compete. Learn. Win.</p>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {/* Join Quiz Card */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mr-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Join Quiz</h2>
                <p className="text-gray-600">Enter a 6-digit code</p>
              </div>
            </div>

            <form onSubmit={handleJoinQuiz}>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="XXXXXX"
                maxLength={6}
                className="w-full text-3xl font-bold text-center py-4 px-6 border-4 border-gray-300 rounded-2xl mb-4 focus:border-blue-500 focus:outline-none uppercase tracking-widest"
              />
              <button
                type="submit"
                disabled={joinCode.length !== 6 || isJoining}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 rounded-2xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all shadow-lg flex items-center justify-center"
              >
                {isJoining ? "Joining..." : "Join Game"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Create Quiz Card */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Host Quiz</h2>
                <p className="text-gray-600">Create a new game</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-700">
                <Target className="w-5 h-5 mr-3 text-purple-500" />
                <span>Choose from 839 questions</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Zap className="w-5 h-5 mr-3 text-yellow-500" />
                <span>Real-time competition</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Trophy className="w-5 h-5 mr-3 text-yellow-600" />
                <span>Live leaderboards</span>
              </div>
            </div>

            <button
              onClick={handleCreateQuiz}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-2xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all shadow-lg flex items-center justify-center"
            >
              Create Quiz
              <Plus className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-8">Why Quiz Arena?</h3>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Fast Paced</h4>
              <p className="text-white/80 text-sm">Quick rounds with countdown timers</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-green-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Multiplayer</h4>
              <p className="text-white/80 text-sm">Compete with friends & colleagues</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Engaging</h4>
              <p className="text-white/80 text-sm">Streaks, badges, and celebrations</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Competitive</h4>
              <p className="text-white/80 text-sm">Live leaderboards & rankings</p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link href="/" className="text-white hover:text-white/80 font-semibold inline-flex items-center">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
