'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Mail, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setIsSuccess(true);
        setEmail(''); // Clear form
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900">ECCCO</h1>
              <p className="text-sm text-gray-600">Medical Training Platform</p>
            </div>
          </Link>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
            <p className="text-gray-600">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {isSuccess ? (
            /* Success Message */
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Your Email</h3>
              {message && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-700">{message}</p>
                </div>
              )}
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to your email address. Please check your inbox and spam folder.
              </p>
              
              <div className="space-y-3">
                <Link
                  href="/auth/signin"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
                </Link>
                
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setMessage(null);
                  }}
                  className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm transition-colors"
                >
                  Send another reset email
                </button>
              </div>
            </div>
          ) : (
            /* Reset Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Mail className="w-4 h-4" />
                )}
                <span>
                  {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
                </span>
              </button>

              <div className="text-center">
                <Link
                  href="/auth/signin"
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}

          {/* Additional Help */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500 mb-2">
              Still having trouble accessing your account?
            </p>
            <Link
              href="mailto:support@eccco.app"
              className="text-xs text-blue-600 hover:text-blue-700 underline"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Reset links expire after 1 hour for security. If you don't receive the email, 
          please check your spam folder or try again.
        </div>
      </div>
    </div>
  );
}