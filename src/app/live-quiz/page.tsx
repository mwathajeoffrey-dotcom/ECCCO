'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Users, 
  Plus, 
  Clock, 
  Trophy,
  Settings,
  BarChart3
} from 'lucide-react';

interface LiveQuizSession {
  id: string;
  title: string;
  description?: string;
  accessCode: string;
  status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  participantCount: number;
  topicName?: string;
  createdAt: string;
  questionCount: number;
}

export default function LiveQuizPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<LiveQuizSession[]>([]);
  const [joinCode, setJoinCode] = useState('');
  const [loading, setLoading] = useState(true);

  // NOTE: Authentication removed for simplified development and testing
  // Will be added back after core functionality is complete

  const fetchSessions = useCallback(async () => {
    try {
      const response = await fetch('/api/live-quiz/sessions');
      if (response.ok) {
        const data = await response.json();
        setSessions(data);
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch sessions on mount - no auth required
    fetchSessions();
  }, [fetchSessions]);

  const handleJoinQuiz = async () => {
    if (!joinCode.trim()) return;
    router.push(`/live-quiz/join/${joinCode.trim().toUpperCase()}`);
  };

  const handleCreateQuiz = () => {
    router.push('/live-quiz/create');
  };

  const handleHostQuiz = (sessionId: string) => {
    router.push(`/live-quiz/host/${sessionId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ECCCO Live...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎯 ECCCO Live
          </h1>
          <p className="text-gray-600 text-lg">
            Interactive Medical Training Quizzes
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Join Quiz */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="text-center bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <Users className="w-6 h-6" />
                Join a Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4 text-center">
                Enter the code provided by your instructor
              </p>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter quiz code (e.g., ABC123)"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  className="text-center text-lg font-mono tracking-wider"
                  maxLength={6}
                />
                <Button 
                  onClick={handleJoinQuiz}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                  disabled={!joinCode.trim()}
                >
                  Join Quiz
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Host Quiz */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <Play className="w-6 h-6" />
                Host a Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4 text-center">
                Create and manage live quiz sessions
              </p>
              <Button 
                onClick={handleCreateQuiz}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Quiz
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Your Sessions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Sessions</h2>
            
            {sessions.length === 0 ? (
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8 text-center">
                  <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    You haven't created any quiz sessions yet.
                  </p>
                  <Button onClick={handleCreateQuiz}>
                    Create Your First Quiz
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {sessions.map((session) => (
                  <Card key={session.id} className="bg-white shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {session.title}
                            </h3>
                            <Badge 
                              variant={
                                session.status === 'WAITING' ? 'secondary' :
                                session.status === 'IN_PROGRESS' ? 'default' :
                                session.status === 'COMPLETED' ? 'outline' : 'secondary'
                              }
                            >
                              {session.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          
                          {session.description && (
                            <p className="text-gray-600 mb-2">{session.description}</p>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {new Date(session.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {session.participantCount} participants
                            </span>
                            <span className="flex items-center gap-1">
                              <BarChart3 className="w-4 h-4" />
                              {session.questionCount} questions
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">Access Code</p>
                            <Badge variant="outline" className="font-mono text-lg px-3 py-1">
                              {session.accessCode}
                            </Badge>
                          </div>
                          
                          <Button 
                            onClick={() => handleHostQuiz(session.id)}
                            className="ml-4"
                            disabled={session.status === 'COMPLETED' || session.status === 'CANCELLED'}
                          >
                            {session.status === 'WAITING' ? 'Start Quiz' : 
                             session.status === 'IN_PROGRESS' ? 'Manage' : 'View Results'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}