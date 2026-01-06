'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Trophy,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface QuizSession {
  id: string;
  title: string;
  accessCode: string;
  status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED' | 'PAUSED';
  currentQuestionIndex: number;
  timePerQuestion: number;
  pointsPerQuestion: number;
  showCorrectAnswers: boolean;
  questions: Question[];
  questionIds: string[];
}

interface ParticipantData {
  sessionId: string;
  participantId: string;
  nickname: string;
  score: number;
  rank?: number;
  totalParticipants?: number;
}

interface Answer {
  questionIndex: number;
  selectedAnswer: number;
  isCorrect: boolean;
  pointsEarned: number;
}

export default function ParticipateQuizPage({ params }: { params: Promise<{ accessCode: string }> }) {
  const router = useRouter();
  
  // State
  const [session, setSession] = useState<QuizSession | null>(null);
  const [participantData, setParticipantData] = useState<ParticipantData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<Answer | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [loading, setLoading] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params;
      setAccessCode(resolvedParams.accessCode);
    }
    getParams();
  }, [params]);

  useEffect(() => {
    if (accessCode) {
      loadParticipantData();
      fetchSession();
      
      // Poll for session updates
      pollRef.current = setInterval(() => {
        fetchSession();
      }, 2000);
    }

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [accessCode]);

  useEffect(() => {
    if (session?.status === 'IN_PROGRESS' && !hasAnswered) {
      setTimeRemaining(session.timePerQuestion || 30);
      
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [session?.currentQuestionIndex, hasAnswered, session?.status]);

  const loadParticipantData = () => {
    const stored = localStorage.getItem('liveQuizParticipant');
    if (stored) {
      setParticipantData(JSON.parse(stored));
    } else {
      router.push(`/live-quiz/join/${accessCode}`);
    }
  };

  const fetchSession = async () => {
    if (!accessCode) return;
    
    try {
      const response = await fetch(`/api/live-quiz/session/code/${accessCode}`);
      if (response.ok) {
        const data = await response.json();
        setSession(data);
        
        // Update current question
        if (data.questions && data.questions[data.currentQuestionIndex]) {
          const question = data.questions[data.currentQuestionIndex];
          setCurrentQuestion(question);
          
          // Reset answer state for new question
          if (!hasAnswered || currentQuestion?.id !== question.id) {
            setHasAnswered(false);
            setSelectedAnswer(null);
            setShowResults(false);
          }
        }
        
        // Fetch participant score
        if (participantData) {
          fetchParticipantScore();
        }
      }
    } catch (error) {
      console.error('Failed to fetch session:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchParticipantScore = async () => {
    if (!participantData) return;
    
    try {
      const response = await fetch(`/api/live-quiz/session/${session?.id}/participant/${participantData.participantId}`);
      if (response.ok) {
        const data = await response.json();
        setParticipantData(prev => ({
          ...prev!,
          score: data.score,
          rank: data.rank,
          totalParticipants: data.totalParticipants,
        }));
      }
    } catch (error) {
      console.error('Failed to fetch participant data:', error);
    }
  };

  const handleTimeUp = () => {
    if (!hasAnswered) {
      // Auto-submit empty answer
      handleSubmitAnswer(null);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = async (answerIndex: number | null) => {
    if (hasAnswered || !session || !participantData || !currentQuestion) return;
    
    setHasAnswered(true);
    
    try {
      const response = await fetch(
        `/api/live-quiz/session/${session.id}/participant/${participantData.participantId}/answer`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionId: currentQuestion.id,
            answer: answerIndex ?? -1,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        
        // Calculate if answer is correct
        const isCorrect = answerIndex === currentQuestion.correctIndex;
        const points = isCorrect ? (session.pointsPerQuestion || 1000) : 0;
        
        setLastAnswer({
          questionIndex: session.currentQuestionIndex,
          selectedAnswer: answerIndex ?? -1,
          isCorrect,
          pointsEarned: points,
        });
        
        // Update participant data with new score from response or calculate it
        setParticipantData(prev => ({
          ...prev!,
          score: result.score || (prev!.score + points),
        }));
        
        setShowResults(true);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!session || !participantData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <p className="text-gray-600 mb-4">Unable to load quiz session</p>
            <Button onClick={() => router.push('/live-quiz')}>Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Waiting for quiz to start
  if (session.status === 'WAITING') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="max-w-2xl mx-4 bg-white shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <CardTitle className="text-3xl">Get Ready!</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome, {participantData.nickname}!
              </h2>
              <p className="text-gray-600">Waiting for host to start the quiz...</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Quiz:</span>
                <span className="font-semibold">{session.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Questions:</span>
                <span className="font-semibold">{session.questions.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Time per Question:</span>
                <span className="font-semibold">{session.timePerQuestion}s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Points per Question:</span>
                <span className="font-semibold">{session.pointsPerQuestion}</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <div className="animate-pulse flex space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animation-delay-200"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animation-delay-400"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz completed
  if (session.status === 'COMPLETED') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-white shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <CardTitle className="text-3xl flex items-center justify-center gap-2">
              <Trophy className="w-8 h-8" />
              Quiz Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-gray-800 mb-2">
                {participantData.score}
              </div>
              <p className="text-xl text-gray-600">Total Points</p>
            </div>
            
            {participantData.rank && (
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Your Ranking</p>
                    <p className="text-3xl font-bold text-gray-800">
                      #{participantData.rank}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Out of</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {participantData.totalParticipants}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push('/live-quiz')}
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Active quiz - show question
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with score and progress */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-500">Your Score</p>
                <p className="text-2xl font-bold text-blue-600">{participantData.score}</p>
              </div>
              {participantData.rank && (
                <div>
                  <p className="text-sm text-gray-500">Rank</p>
                  <p className="text-2xl font-bold text-purple-600">#{participantData.rank}</p>
                </div>
              )}
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500">Question</p>
              <p className="text-xl font-bold">
                {session.currentQuestionIndex + 1}/{session.questions.length}
              </p>
            </div>
          </div>
          <Progress 
            value={((session.currentQuestionIndex + 1) / session.questions.length) * 100} 
            className="mt-3"
          />
        </div>

        {/* Timer */}
        {!hasAnswered && session.status === 'IN_PROGRESS' && (
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke={timeRemaining <= 10 ? '#ef4444' : timeRemaining <= 20 ? '#f59e0b' : '#10b981'}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - timeRemaining / session.timePerQuestion)}`}
                  className="transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`text-4xl font-bold ${
                  timeRemaining <= 10 ? 'text-red-500 animate-pulse' :
                  timeRemaining <= 20 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {timeRemaining}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Question */}
        {currentQuestion && (
          <Card className="bg-white shadow-xl mb-6">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuestion.correctIndex;
                  const showCorrect = hasAnswered && session.showCorrectAnswers;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={hasAnswered}
                      className={`p-6 rounded-lg border-2 text-left transition-all transform hover:scale-105 ${
                        showCorrect && isCorrect
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : showCorrect && isSelected && !isCorrect
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : isSelected
                          ? 'bg-blue-100 border-blue-500 text-blue-800'
                          : 'bg-gray-50 border-gray-300 hover:border-blue-300'
                      } ${hasAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg">
                          {String.fromCharCode(65 + index)}. {option}
                        </span>
                        {showCorrect && isCorrect && (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                        {showCorrect && isSelected && !isCorrect && (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {!hasAnswered && selectedAnswer !== null && (
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={() => handleSubmitAnswer(selectedAnswer)}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 text-xl"
                  >
                    Submit Answer
                  </Button>
                </div>
              )}

              {/* Answer result */}
              {hasAnswered && lastAnswer && showResults && (
                <div className={`mt-6 p-6 rounded-lg ${
                  lastAnswer.isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    {lastAnswer.isCorrect ? (
                      <>
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="text-xl font-bold text-green-800">Correct!</p>
                          <p className="text-green-700">+{lastAnswer.pointsEarned} points</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-8 h-8 text-red-600" />
                        <div>
                          <p className="text-xl font-bold text-red-800">Incorrect</p>
                          <p className="text-red-700">0 points</p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {session.showCorrectAnswers && currentQuestion.explanation && (
                    <div className="mt-4 p-4 bg-blue-50 rounded">
                      <p className="text-sm font-semibold text-blue-800 mb-1">Explanation:</p>
                      <p className="text-sm text-blue-700">{currentQuestion.explanation}</p>
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-600 mt-3">
                    Waiting for next question...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
