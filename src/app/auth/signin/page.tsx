'use client';'use client';



import { SignIn } from '@clerk/nextjs';import { signIn } from 'next-auth/react';

import Link from 'next/link';import { useState } from 'react';

import { BookOpen } from 'lucide-react';import { useRouter } from 'next/navigation';

import Link from 'next/link';

export default function SignInPage() {import { 

  return (  ChevronLeft, 

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">  BookOpen, 

      {/* Header */}  Eye, 

      <div className="w-full px-6 py-4">  EyeOff, 

        <Link   AlertCircle, 

          href="/"   Loader2,

          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"  Mail,

        >  Lock,

          <BookOpen className="w-5 h-5" />  User

          <span className="font-semibold">Back to Home</span>} from 'lucide-react';

        </Link>import Image from 'next/image';

      </div>

export default function AuthPage() {

      {/* Sign In Form */}  const router = useRouter();

      <div className="flex-1 flex items-center justify-center px-4 py-12">  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

        <div className="w-full max-w-md">  const [formData, setFormData] = useState({

          {/* Welcome Message */}    name: '',

          <div className="text-center mb-8">    email: '',

            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">    password: '',

              <BookOpen className="w-8 h-8 text-white" />  });

            </div>  const [showPassword, setShowPassword] = useState(false);

            <h1 className="text-3xl font-bold text-gray-900 mb-2">  const [error, setError] = useState<string | null>(null);

              Welcome Back!  const [isLoading, setIsLoading] = useState(false);

            </h1>  const [showEmailForm, setShowEmailForm] = useState(false);

            <p className="text-gray-600">

              Sign in to access your personalized learning dashboard  const handleGoogleSignIn = async () => {

            </p>    setIsLoading(true);

          </div>    try {

      await signIn('google', { callbackUrl: '/dashboard' });

          {/* Clerk Sign In Component */}    } catch (error) {

          <div className="flex justify-center">      console.error('Google sign in error:', error);

            <SignIn       setError('Failed to sign in with Google');

              appearance={{      setIsLoading(false);

                elements: {    }

                  rootBox: 'w-full',  };

                  card: 'shadow-xl border border-gray-200',

                  headerTitle: 'hidden',  const handleSubmit = async (e: React.FormEvent) => {

                  headerSubtitle: 'hidden',    e.preventDefault();

                  socialButtonsBlockButton: 'bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-blue-500 transition-all',    setIsLoading(true);

                  socialButtonsBlockButtonText: 'font-semibold text-gray-700',    setError(null);

                  formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 transition-colors',

                  footerActionLink: 'text-blue-600 hover:text-blue-700',    try {

                }      if (mode === 'signup') {

              }}        // Create new user

            />        const signUpResponse = await fetch('/api/auth/signup', {

          </div>          method: 'POST',

          headers: { 'Content-Type': 'application/json' },

          {/* Features */}          body: JSON.stringify({

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">            name: formData.name,

            <div className="p-4 bg-white rounded-lg border border-gray-200">            email: formData.email,

              <div className="text-2xl font-bold text-blue-600 mb-1">5000+</div>            password: formData.password,

              <div className="text-xs text-gray-600">Questions</div>          }),

            </div>        });

            <div className="p-4 bg-white rounded-lg border border-gray-200">

              <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>        if (!signUpResponse.ok) {

              <div className="text-xs text-gray-600">Evidence-Based</div>          const errorData = await signUpResponse.json();

            </div>          throw new Error(errorData.message || 'Failed to create account');

            <div className="p-4 bg-white rounded-lg border border-gray-200">        }

              <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>

              <div className="text-xs text-gray-600">Access</div>        // After successful signup, sign in the user

            </div>        const result = await signIn('credentials', {

          </div>          email: formData.email,

        </div>          password: formData.password,

      </div>          redirect: false,

    </div>        });

  );

}        if (result?.error) {

          throw new Error('Account created but sign in failed. Please try signing in.');
        }

        // Success - redirect to dashboard
        router.push('/dashboard');
      } else {
        // Sign in existing user
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error('Invalid email or password');
        }

        // Success - redirect to dashboard
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Back to Home Link */}
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {mode === 'signin' ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'signin'
              ? 'Sign in to access your personalized learning dashboard'
              : 'Join ECCCO to track your progress and excel in emergency medicine'}
          </p>
        </div>
      </div>

      {/* Auth Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          {/* Mode Toggle */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setError(null);
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                mode === 'signin'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError(null);
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                mode === 'signup'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {!showEmailForm ? (
            <>
              {/* OAuth Sign In Buttons */}
              <div className="space-y-3">
                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium text-gray-700">
                    {mode === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}
                  </span>
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                  </div>
                </div>

                {/* Email Sign In Button */}
                <button
                  type="button"
                  onClick={() => setShowEmailForm(true)}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md font-medium"
                >
                  <Mail className="w-5 h-5" />
                  <span>{mode === 'signin' ? 'Sign in with Email' : 'Sign up with Email'}</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Back Button */}
              <button
                type="button"
                onClick={() => setShowEmailForm(false)}
                className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to sign in options
              </button>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Signup Only) */}
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required={mode === 'signup'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Dr. John Smith"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {mode === 'signup' && (
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 6 characters long
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>{mode === 'signin' ? 'Sign In' : 'Create Account'}</>
              )}
            </button>
          </form>
        </>
      )}

          {/* Footer */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
                </span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'signin' ? 'signup' : 'signin');
                  setError(null);
                }}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                {mode === 'signin' ? 'Create a new account' : 'Sign in to existing account'}
              </button>
            </div>
          </div>
        </div>

        {/* Benefits Section (Signup Only) */}
        {mode === 'signup' && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What you'll get:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-3 text-sm text-gray-700">Track your progress across 5,000+ questions</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-3 text-sm text-gray-700">Personalized learning analytics powered by AI</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-3 text-sm text-gray-700">Access to live quiz sessions and competitions</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-3 text-sm text-gray-700">Comprehensive evidence library and clinical guidelines</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
