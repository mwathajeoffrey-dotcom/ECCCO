'use client';

import { signIn, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ChevronLeft, BookOpen, Users, BarChart3, Trophy, Eye, EyeOff, AlertCircle, Loader2, UserPlus } from 'lucide-react';
import Link from 'next/link';

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

interface SignInFormData {
  email: string;
  password: string;
}

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [formData, setFormData] = useState<SignInFormData>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);

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

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        // For now, we'll create a user and then sign them in
        const signUpResponse = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!signUpResponse.ok) {
          const errorData = await signUpResponse.json();
          throw new Error(errorData.message || 'Failed to create account');
        }
      }

      // Sign in the user
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        // Successful sign in - redirect will happen automatically
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
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
            Sign in to track your progress and access personalized features
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
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
                <span className="text-sm text-gray-700">View detailed performance analytics</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-sm text-gray-700">Compare with peers (coming soon)</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-sm text-gray-700">Personalized study recommendations</span>
              </div>
            </div>
          </div>

          {/* Sign in options */}
          <div>
            {!showEmailForm ? (
              <>
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Choose your sign in method</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {providers &&
                    Object.values(providers).map((provider) => (
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

                  {/* Email/Password Option */}
                  <button
                    onClick={() => setShowEmailForm(true)}
                    className="w-full flex justify-center items-center px-4 py-3 border border-blue-300 rounded-lg shadow-sm bg-blue-50 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    <UserPlus className="w-5 h-5 mr-3" />
                    Create Account with Email
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Email/Password Form */}
                <div className="mb-4">
                  <button
                    onClick={() => setShowEmailForm(false)}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to sign in options
                  </button>
                </div>

                {/* Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                  <button
                    onClick={() => setMode('signin')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      mode === 'signin'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setMode('signup')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      mode === 'signup'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                <form onSubmit={handleEmailSignIn} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={mode === 'signup' ? 'Create a password' : 'Enter your password'}
                        required
                        minLength={mode === 'signup' ? 6 : undefined}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {mode === 'signup' && (
                      <p className="text-xs text-gray-600 mt-1">Password must be at least 6 characters</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <UserPlus className="w-4 h-4" />
                    )}
                    <span>
                      {isLoading
                        ? mode === 'signin' ? 'Signing In...' : 'Creating Account...'
                        : mode === 'signin' ? 'Sign In' : 'Create Account'
                      }
                    </span>
                  </button>
                </form>
              </>
            )}

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