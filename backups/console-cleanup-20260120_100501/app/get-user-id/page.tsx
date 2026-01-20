"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Copy, CheckCircle, User, Key, ChevronLeft } from "lucide-react";

export default function GetUserIdPage() {
  const { user, isLoaded } = useUser();
  const [userId, setUserId] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserId();
    }
  }, [isLoaded, user]);

  const fetchUserId = async () => {
    try {
      const response = await fetch("/api/auth/my-user-id");
      const data = await response.json();
      if (data.success) {
        setUserId(data.userId);
      }
    } catch (error) {
      console.error("Failed to fetch user ID:", error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Key className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to view your Clerk user ID</p>
          <Link
            href="/sign-in"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Get Your User ID</h1>
              <p className="text-sm text-gray-600">For admin and developer authorization</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Your Account Information
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">{user.primaryEmailAddress?.emailAddress}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <p className="text-gray-900">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>
        </div>

        {/* User ID Card */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Your Clerk User ID
          </h2>

          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <code className="text-lg font-mono text-gray-900 break-all">{userId || "Loading..."}</code>
              <button
                onClick={() => copyToClipboard(userId)}
                className="ml-4 flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                disabled={!userId}
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-sm text-blue-800">Use this ID to grant yourself admin and developer permissions</p>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Setup Instructions</h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Update Local Environment</h3>
                <p className="text-gray-600 mb-2">
                  Add to your <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file:
                </p>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-sm">
                  <div className="mb-1">ADMIN_USER_IDS={userId || "user_xxxxx"}</div>
                  <div>DEVELOPER_USER_IDS={userId || "user_xxxxx"}</div>
                </div>
                <button
                  onClick={() => copyToClipboard(`ADMIN_USER_IDS=${userId}\nDEVELOPER_USER_IDS=${userId}`)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy both lines
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Restart Development Server</h3>
                <p className="text-gray-600 mb-2">Stop your current server and run:</p>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-sm">npm run dev</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Add to Vercel (Production)</h3>
                <p className="text-gray-600 mb-2">Go to your Vercel project:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 ml-4">
                  <li>Open Vercel Dashboard → Your Project → Settings</li>
                  <li>Navigate to "Environment Variables"</li>
                  <li>
                    Add <code className="bg-gray-100 px-1 rounded">ADMIN_USER_IDS</code> with value:{" "}
                    <code className="bg-gray-100 px-1 rounded">{userId || "your_user_id"}</code>
                  </li>
                  <li>
                    Add <code className="bg-gray-100 px-1 rounded">DEVELOPER_USER_IDS</code> with value:{" "}
                    <code className="bg-gray-100 px-1 rounded">{userId || "your_user_id"}</code>
                  </li>
                  <li>Click "Save"</li>
                  <li>Redeploy your application</li>
                </ol>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Test Your Access</h3>
                <p className="text-gray-600 mb-2">After setup, you should be able to access:</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>
                    •{" "}
                    <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
                      /admin/dashboard
                    </Link>{" "}
                    - Admin panel
                  </li>
                  <li>
                    •{" "}
                    <Link href="/admin/users" className="text-blue-600 hover:underline">
                      /admin/users
                    </Link>{" "}
                    - User management
                  </li>
                  <li>
                    •{" "}
                    <Link href="/guidelines" className="text-blue-600 hover:underline">
                      /guidelines
                    </Link>{" "}
                    - Guidelines editor (developer access)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-yellow-900 mb-1">Security Notice</h4>
              <p className="text-sm text-yellow-800">
                Never commit your <code className="bg-yellow-100 px-1 rounded">.env.local</code> file to git. It's
                already in <code className="bg-yellow-100 px-1 rounded">.gitignore</code> to prevent this.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
