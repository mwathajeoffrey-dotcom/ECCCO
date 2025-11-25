'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function QuickSignInPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleQuickSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter an email');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Use signIn with credentials
      const result = await signIn('credentials', {
        email: email,
        name: email.split('@')[0],
        redirect: false
      });
      
      console.log('Quick sign in result:', result);
      
      if (result?.ok) {
        setSuccess(true);
        // Give a moment for session to be established, then redirect
        setTimeout(() => {
          window.location.href = '/live-quiz';
        }, 1000);
      } else {
        alert('Sign in failed: ' + result?.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      alert('An error occurred during sign in');
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-green-600 text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Created Successfully!</h2>
          <p className="text-gray-600 mb-4">Redirecting you to the live quiz platform...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎯 Quick Access</h1>
          <p className="text-gray-600">Get instant access to ECCCO Live Quiz</p>
        </div>

        <form onSubmit={handleQuickSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email (any email works)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              required
              disabled={isLoading}
            />
            <p className="mt-2 text-sm text-gray-500">
              💡 This is for development testing - any email address will work
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Account...
              </div>
            ) : (
              'Create Account & Access Live Quiz'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-medium">
              Use regular sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">🚀 What you'll get access to:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Create live quiz sessions</li>
            <li>• Generate access codes for participants</li>
            <li>• Real-time quiz hosting (Kahoot-style)</li>
            <li>• Score tracking and leaderboards</li>
          </ul>
        </div>
      </div>
    </div>
  );
}