'use client';

import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      <div className="w-full px-6 py-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          <span className="font-semibold">Back to Home</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600">
              Sign in to access your personalized learning dashboard
            </p>
          </div>

          <div className="flex justify-center">
            <SignIn 
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-xl border border-gray-200',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton: 'bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-blue-500 transition-all',
                  socialButtonsBlockButtonText: 'font-semibold text-gray-700',
                  formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 transition-colors',
                  footerActionLink: 'text-blue-600 hover:text-blue-700',
                }
              }}
            />
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-blue-600 mb-1">5000+</div>
              <div className="text-xs text-gray-600">Questions</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
              <div className="text-xs text-gray-600">Evidence-Based</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
              <div className="text-xs text-gray-600">Access</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
