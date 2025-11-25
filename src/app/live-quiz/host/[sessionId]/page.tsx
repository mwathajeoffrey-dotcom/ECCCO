'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  Users,
  Timer,
  Trophy,
  Eye,
  BarChart3,
  RefreshCw
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Participant {
  id: string;
  nickname: string;
  score: number;
  isActive: boolean;
  joinedAt: string;
}

interface QuizSession {
  id: string;
  title: string;
  description?: string;
  accessCode: string;
  status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  currentQuestionIndex: number;
  questionTimeLimit: number;
  questionIds: string[];
  questions: Question[];
  participants: Participant[];
}

export default function HostQuizPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // State
  const [quizSession, setQuizSession] = useState<QuizSession | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState('');
  
  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params;
      setSessionId(resolvedParams.sessionId);
    }
    getParams();
  }, [params]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated' && sessionId) {
      fetchQuizSession();
      // setupWebSocket();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [status, sessionId, router]);

  useEffect(() => {
    if (isTimerActive && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerActive(false);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerActive, timeRemaining]);

  const fetchQuizSession = async () => {
    if (!sessionId) return;
    
    try {
      const response = await fetch(`/api/live-quiz/session/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setQuizSession(data);
        setTimeRemaining(data.questionTimeLimit);
      } else if (response.status === 404) {
        router.push('/live-quiz');
      }
    } catch (error) {
      console.error('Failed to fetch quiz session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeUp = () => {
    setShowResults(true);
    // In a real implementation, this would trigger showing results to all participants
  };

  const handleStartQuiz = async () => {
    try {
      const response = await fetch(`/api/live-quiz/session/${sessionId}/start`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json();
        const updatedSession = data.session || data;
        // refresh session from server shape
        setQuizSession(updatedSession);
        setTimeRemaining(updatedSession.questionTimeLimit || 30);
        setIsTimerActive(true);
        setShowResults(false);
        setResponses({});
      }
    } catch (error) {
      console.error('Failed to start quiz:', error);
    }
  };

  const handleNextQuestion = async () => {
    if (!quizSession) return;

    try {
      const response = await fetch(`/api/live-quiz/session/${sessionId}/next`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json();
        const updatedSession = data.session || data;
        setQuizSession(updatedSession);

        if (updatedSession.status === 'COMPLETED') {
          setIsTimerActive(false);
        } else {
          setTimeRemaining(updatedSession.questionTimeLimit || 30);
          setIsTimerActive(true);
          setShowResults(false);
          setResponses({});
        }
      }
    } catch (error) {
      console.error('Failed to go to next question:', error);
    }
  };

  const handleEndQuiz = async () => {
    try {
      const response = await fetch(`/api/live-quiz/session/${sessionId}/end`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json();
        const updatedSession = data.session || data;
        setQuizSession(updatedSession);
        setIsTimerActive(false);
      }
    } catch (error) {
      console.error('Failed to end quiz:', error);
    }
  };

  const getCurrentQuestion = (): Question | null => {
    if (!quizSession || !quizSession.questions) return null;
    return quizSession.questions[quizSession.currentQuestionIndex] || null;
  };

  const getProgressPercentage = (): number => {
    if (!quizSession) return 0;
    return ((quizSession.currentQuestionIndex + 1) / quizSession.questions.length) * 100;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz session...</p>
        </div>
      </div>
    );
  }

  if (!quizSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="bg-white shadow-lg max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <p className="text-gray-600 mb-4">Quiz session not found</p>
            <Button onClick={() => router.push('/live-quiz')}>
              Return to Live Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/live-quiz')}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{quizSession.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <Badge 
                variant={quizSession.status === 'WAITING' ? 'secondary' : 
                        quizSession.status === 'IN_PROGRESS' ? 'default' : 'outline'}
              >
                {quizSession.status.replace('_', ' ')}
              </Badge>
              <span className="text-gray-600">Access Code: </span>
              <Badge variant="outline" className="font-mono text-lg px-3 py-1">
                {quizSession.accessCode}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Quiz Progress */}
            <Card className="bg-white shadow-lg mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    Question {quizSession.currentQuestionIndex + 1} of {quizSession.questions.length}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Timer className={`w-5 h-5 ${timeRemaining <= 10 ? 'text-red-500' : 'text-blue-500'}`} />
                    <span className={`font-mono text-lg ${timeRemaining <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                </div>
                <Progress value={getProgressPercentage()} className="mt-2" />
              </CardHeader>
            </Card>

            {/* Current Question */}
            {currentQuestion ? (
              <Card className="bg-white shadow-lg mb-6">
                <CardHeader>
                  <CardTitle className="text-xl">Current Question</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-800 mb-4">
                    {currentQuestion.question}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg ${
                          showResults
                            ? index === currentQuestion.correctIndex
                              ? 'bg-green-100 border-green-500 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                            : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {String.fromCharCode(65 + index)}. {option}
                          </span>
                          {showResults && (
                            <span className="text-sm">
                              {responses[index.toString()] || 0} responses
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {showResults && currentQuestion.explanation && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Explanation:</h4>
                      <p className="text-blue-700">{currentQuestion.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white shadow-lg mb-6">
                <CardContent className="p-8 text-center">
                  <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Quiz Completed!
                  </h3>
                  <p className="text-gray-600">
                    All questions have been answered. Check the final results below.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Host Controls */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Host Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 flex-wrap">
                  {quizSession.status === 'WAITING' && (
                    <Button onClick={handleStartQuiz} className="bg-green-600 hover:bg-green-700">
                      <Play className="w-4 h-4 mr-2" />
                      Start Quiz
                    </Button>
                  )}
                  
                  {quizSession.status === 'IN_PROGRESS' && currentQuestion && (
                    <>
                      <Button 
                        onClick={() => setShowResults(!showResults)}
                        variant="outline"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {showResults ? 'Hide' : 'Show'} Results
                      </Button>
                      
                      <Button onClick={handleNextQuestion}>
                        <SkipForward className="w-4 h-4 mr-2" />
                        Next Question
                      </Button>
                    </>
                  )}
                  
                  <Button 
                    onClick={handleEndQuiz}
                    variant="outline"
                  >
                    End Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Participants Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Participants ({quizSession.participants.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {quizSession.participants.map((participant, index) => (
                    <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">
                          {participant.nickname}
                        </p>
                        <p className="text-sm text-gray-500">
                          #{index + 1} • {participant.score} points
                        </p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        participant.isActive ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                  ))}
                  
                  {quizSession.participants.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p>Waiting for participants...</p>
                      <p className="text-sm mt-1">
                        Share code: <span className="font-mono font-bold">{quizSession.accessCode}</span>
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}