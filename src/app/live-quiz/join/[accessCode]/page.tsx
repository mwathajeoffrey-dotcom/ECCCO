'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  ArrowLeft,
  Users,
  Clock,
  BookOpen,
  Trophy,
  UserPlus
} from 'lucide-react';

interface QuizSession {
  id: string;
  title: string;
  description?: string;
  accessCode: string;
  status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  participantCount: number;
  questionCount: number;
  topicName?: string;
}

interface Participant {
  id: string;
  nickname: string;
  score: number;
  isActive: boolean;
}

export default function JoinQuizPage({ params }: { params: Promise<{ accessCode: string }> }) {
  const router = useRouter();
  
  // State
  const [session, setSession] = useState<QuizSession | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [nickname, setNickname] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [accessCode, setAccessCode] = useState('');

  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params;
      setAccessCode(resolvedParams.accessCode);
    }
    getParams();
  }, [params]);

  useEffect(() => {
    if (accessCode) {
      fetchSessionInfo();
    }
  }, [accessCode]);

  const fetchSessionInfo = async () => {
    if (!accessCode) return;
    
    try {
      const response = await fetch(`/api/live-quiz/join/${accessCode}`);
      
      if (response.ok) {
        const data = await response.json();
        setSession(data.session);
        setParticipants(data.participants || []);
        setError('');
      } else if (response.status === 404) {
        setError('Quiz not found. Please check the access code.');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to load quiz information.');
      }
    } catch (error) {
      console.error('Failed to fetch session:', error);
      setError('Unable to connect to quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinQuiz = async () => {
    if (!nickname.trim()) {
      setError('Please enter a nickname');
      return;
    }

    setIsJoining(true);
    setError('');

    try {
      const response = await fetch(`/api/live-quiz/join/${accessCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickname.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setHasJoined(true);
        // Store participant info for the quiz session
        localStorage.setItem('liveQuizParticipant', JSON.stringify({
          sessionId: data.sessionId,
          participantId: data.participantId,
          nickname: nickname.trim(),
        }));
        
        // Redirect to the quiz interface
        router.push(`/live-quiz/participate/${accessCode}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to join quiz');
      }
    } catch (error) {
      console.error('Error joining quiz:', error);
      setError('Unable to join quiz. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz information...</p>
        </div>
      </div>
    );
  }

  if (error && !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="bg-white shadow-lg max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="text-red-500 mb-4">
              <Trophy className="w-12 h-12 mx-auto opacity-50" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Quiz Not Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => router.push('/live-quiz')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Live Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Join Quiz</h1>
            <p className="text-gray-600">Access Code: <span className="font-mono font-bold">{accessCode}</span></p>
          </div>
        </div>

        {session && (
          <div className="max-w-4xl mx-auto">
            {/* Quiz Info */}
            <Card className="bg-white shadow-lg mb-6">
              <CardHeader className="text-center bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl">{session.title}</CardTitle>
                {session.description && (
                  <p className="opacity-90">{session.description}</p>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Questions</p>
                      <p className="font-semibold">{session.questionCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Participants</p>
                      <p className="font-semibold">{session.participantCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge variant={
                        session.status === 'WAITING' ? 'secondary' :
                        session.status === 'IN_PROGRESS' ? 'default' :
                        'outline'
                      }>
                        {session.status === 'WAITING' ? 'Waiting to Start' :
                         session.status === 'IN_PROGRESS' ? 'In Progress' :
                         session.status === 'COMPLETED' ? 'Completed' : 'Cancelled'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {session.topicName && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">Topic</p>
                    <Badge variant="outline" className="mt-1">{session.topicName}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Join Form */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Join the Quiz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {session.status === 'WAITING' ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="nickname">Enter your nickname</Label>
                        <Input
                          id="nickname"
                          type="text"
                          placeholder="Your nickname (e.g., John Doe)"
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                          className="mt-1"
                          maxLength={30}
                          disabled={isJoining || hasJoined}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          This will be displayed to other participants
                        </p>
                      </div>

                      {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                          {error}
                        </div>
                      )}

                      <Button 
                        onClick={handleJoinQuiz}
                        disabled={!nickname.trim() || isJoining || hasJoined}
                        className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                      >
                        {isJoining ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Joining...
                          </div>
                        ) : hasJoined ? (
                          'Joined Successfully!'
                        ) : (
                          <div className="flex items-center gap-2">
                            <UserPlus className="w-4 h-4" />
                            Join Quiz
                          </div>
                        )}
                      </Button>
                    </div>
                  ) : session.status === 'IN_PROGRESS' ? (
                    <div className="text-center py-6">
                      <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Quiz in Progress</h3>
                      <p className="text-gray-600 mb-4">
                        This quiz has already started. You may not be able to join at this time.
                      </p>
                      <Button 
                        onClick={handleJoinQuiz}
                        disabled={!nickname.trim() || isJoining}
                        variant="outline"
                      >
                        Try to Join Anyway
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Quiz {session.status === 'COMPLETED' ? 'Completed' : 'Cancelled'}
                      </h3>
                      <p className="text-gray-600">
                        This quiz is no longer accepting participants.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Current Participants */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Participants ({participants.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {participants.map((participant, index) => (
                      <div key={participant.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {participant.nickname.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{participant.nickname}</p>
                          <p className="text-xs text-gray-500">
                            {session.status === 'WAITING' ? 'Ready' : `${participant.score} points`}
                          </p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          participant.isActive ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                      </div>
                    ))}
                    
                    {participants.length === 0 && (
                      <div className="text-center py-6 text-gray-500">
                        <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p>No participants yet</p>
                        <p className="text-sm">Be the first to join!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}