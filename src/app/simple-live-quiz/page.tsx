'use client';

import { useEffect, useState } from 'react';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Users, 
  Plus, 
  Clock, 
  Trophy,
  Settings,
  LogOut,
  User
} from 'lucide-react';

export default function SimpleLiveQuizPage() {
  const { isSignedIn, user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Handle join quiz
  const handleJoinQuiz = () => {
    if (!joinCode.trim()) {
      alert('Please enter an access code');
      return;
    }
    
    // Navigate to join page
    window.location.href = `/live-quiz/join/${joinCode.toUpperCase()}`;
  };

  // Show authentication status
  const renderAuthStatus = () => {
    if (status === 'loading') {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
            <span className="text-yellow-800">Loading authentication...</span>
          </div>
        </div>
      );
    }

    if (isSignedIn && user) {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <User className="w-5 h-5 text-green-600 mr-2" />
              <div>
                <span className="text-green-800 font-medium">Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}!</span>
                <p className="text-sm text-green-600">You're signed in and ready to use live quiz features</p>
              </div>
            </div>
            <SignOutButton>
              <Button
                variant="outline"
                size="sm"
                className="text-green-700 border-green-300 hover:bg-green-100"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Sign Out
              </Button>
            </SignOutButton>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-blue-800 font-medium">Not signed in</span>
            <p className="text-sm text-blue-600">Sign in to access full live quiz features</p>
          </div>
          <div className="space-x-2">
            <Button
              onClick={() => window.location.href = '/quick-signin'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Quick Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🎯 ECCCO Live Quiz</h1>
          <p className="text-xl text-gray-600">Create and host interactive quiz sessions like Kahoot!</p>
        </div>

        {/* Authentication Status */}
        {renderAuthStatus()}

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Quiz */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Plus className="w-6 h-6 mr-2 text-blue-600" />
                Create New Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Start a new live quiz session with questions from your topic library.
              </p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={status !== 'authenticated'}
                onClick={() => {
                  if (status === 'authenticated') {
                    window.location.href = '/live-quiz/create';
                  } else {
                    window.location.href = '/quick-signin';
                  }
                }}
              >
                <Play className="w-4 h-4 mr-2" />
                Create Quiz Session
              </Button>
            </CardContent>
          </Card>

          {/* Join Quiz */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Users className="w-6 h-6 mr-2 text-green-600" />
                Join Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Join an existing live quiz session using an access code.
              </p>
              <div className="space-y-2">
                <Input 
                  placeholder="Enter access code (e.g., ABC123)"
                  className="text-center text-lg font-mono tracking-widest uppercase"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  maxLength={6}
                />
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleJoinQuiz}
                  disabled={!joinCode.trim()}
                >
                  Join Quiz
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* My Sessions */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Clock className="w-6 h-6 mr-2 text-purple-600" />
                My Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                View and manage your quiz sessions and results.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                disabled={status !== 'authenticated'}
                onClick={() => {
                  if (status === 'authenticated') {
                    alert('Session management coming soon!');
                  } else {
                    window.location.href = '/quick-signin';
                  }
                }}
              >
                <Settings className="w-4 h-4 mr-2" />
                View Sessions
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Live Quiz Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Scoring</h3>
              <p className="text-sm text-gray-600">Points based on correctness and speed, just like Kahoot!</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Live Participation</h3>
              <p className="text-sm text-gray-600">Multiple participants can join with simple access codes</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Clock className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Timed Questions</h3>
              <p className="text-sm text-gray-600">Configurable timers add excitement and urgency</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Settings className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Host Controls</h3>
              <p className="text-sm text-gray-600">Full control over quiz flow and participant management</p>
            </div>
          </div>
        </div>

        {/* Debug Info (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 bg-gray-100 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🔧 Debug Info</h3>
            <pre className="text-sm text-gray-700 overflow-x-auto">
              {JSON.stringify({ 
                isSignedIn, 
                user: user ? {
                  id: user.id,
                  email: user.emailAddresses[0]?.emailAddress,
                  name: user.firstName
                } : null,
                mounted 
              }, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

// Force dynamic rendering - don't try to statically generate
export const dynamic = 'force-dynamic';