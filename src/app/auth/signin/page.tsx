'use client';

import { signIn, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ChevronLeft, BookOpen, Users, BarChart3, Trophy } from 'lucide-react';
import Link from 'next/link';

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [testName, setTestName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const handleSignIn = async (providerId: string) => {
    setIsLoading(true);
    try {
      await signIn(providerId, { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Sign in error:', error);
      setIsLoading(false);
    }
  };

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: email.toLowerCase(),
        password,
        redirect: false,
      });

      if (result?.ok && !result?.error) {
        window.location.href = '/dashboard';
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred during sign in');
      setIsLoading(false);
    }
  };

  const handleTestSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail) return;
    
    setIsLoading(true);
    try {
      console.log('Attempting sign in with:', { email: testEmail, name: testName });
      
      const result = await signIn('credentials', {
        email: testEmail,
        name: testName || testEmail.split('@')[0],
        redirect: false // Handle redirect manually
      });
      
      console.log('Sign in result:', result);
      
      if (result?.ok && !result?.error) {
        console.log('Sign in successful, redirecting...');
        // Force a page refresh to ensure session is properly loaded
        window.location.href = '/live-quiz';
      } else {
        console.error('Sign in failed:', result?.error);
        alert('Sign in failed. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Test sign in error:', error);
      alert('An error occurred during sign in.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <BookOpen className="w-12 h-12 mx-auto text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to ECCCO
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access live quiz features and track your progress
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Email/Password Sign In */}
          <form onSubmit={handlePasswordSignIn} className="space-y-4 mb-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Development Test Sign In */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-sm font-medium text-yellow-800 mb-3">
                🧪 Development Test Account
              </h3>
              <form onSubmit={handleTestSignIn} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter any email for testing"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={isLoading || !testEmail}
                  className="w-full flex justify-center items-center px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : null}
                  Create Test Account
                </button>
              </form>
            </div>
          )}

          {/* Benefits of signing in */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Benefits of Creating an Account
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-sm text-gray-700">Track your learning progress</span>
              </div>
              <div className="flex items-center">
                <Trophy className="w-5 h-5 text-yellow-600 mr-3" />
                <span className="text-sm text-gray-700">Create and host live quizzes</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-sm text-gray-700">Join live quiz sessions with access codes</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-sm text-gray-700">View detailed performance analytics</span>
              </div>
            </div>
          </div>

          {/* Sign in options */}
          <div>
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign in with</span>
              </div>
            </div>

            <div className="space-y-4">
              {providers &&
                Object.values(providers)
                  .filter(provider => provider.id !== 'credentials') // Hide credentials provider from main list
                  .map((provider) => (
                  <div key={provider.name}>
                    <button
                      onClick={() => handleSignIn(provider.id)}
                      disabled={isLoading}
                      className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-3" />
                      ) : (
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      )}
                      Sign in with {provider.name}
                    </button>
                  </div>
                ))}
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue as guest</span>
                </div>
              </div>

              <div className="mt-4">
                <Link
                  href="/exam"
                  className="w-full flex justify-center px-4 py-3 border border-blue-300 rounded-lg shadow-sm bg-blue-50 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  Continue without account
                </Link>
              </div>
            </div>
          </div>

          {/* Privacy note */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Don't have an account?{' '}
              <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                Create one now
              </Link>
            </p>
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}