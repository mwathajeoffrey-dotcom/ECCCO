'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function TestAuthPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Authentication Test</h1>
        
        {session ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-green-600 text-lg font-semibold mb-2">✅ Authenticated!</div>
              <p className="text-gray-600">Session Details:</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div>
                <strong>User ID:</strong> {session.user?.id}
              </div>
              <div>
                <strong>Email:</strong> {session.user?.email}
              </div>
              <div>
                <strong>Name:</strong> {session.user?.name}
              </div>
              {session.user?.image && (
                <div>
                  <strong>Image:</strong> {session.user.image}
                </div>
              )}
            </div>
            
            <div className="flex flex-col space-y-2">
              <Link
                href="/live-quiz"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors"
              >
                Go to Live Quiz
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-red-600 text-lg font-semibold">❌ Not Authenticated</div>
            <p className="text-gray-600">You need to sign in to access protected features.</p>
            <Link
              href="/auth/signin"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}