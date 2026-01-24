"use client";

import { useState } from "react";
import * as Sentry from "@sentry/nextjs";

export default function TestSentryPage() {
  const [errorTriggered, setErrorTriggered] = useState(false);

  const triggerClientError = () => {
    setErrorTriggered(true);
    // This will trigger a client-side error that Sentry will catch
    throw new Error("🧪 Test Error: Client-side error triggered at " + new Date().toISOString());
  };

  const triggerCapturedError = () => {
    try {
      // Simulate some logic
      const data: any = null;
      data.nonExistentMethod(); // This will throw
    } catch (error) {
      // Manually capture the error with additional context
      Sentry.captureException(error, {
        tags: {
          test_type: "manual_capture",
          location: "test-sentry-page",
        },
        extra: {
          timestamp: new Date().toISOString(),
          userAction: "clicked manual capture button",
        },
      });
      alert("Error captured and sent to Sentry! Check your dashboard.");
    }
  };

  const triggerServerError = async () => {
    try {
      const response = await fetch("/api/test-sentry-error");
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Server error triggered! Check Sentry dashboard.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">🧪 Sentry Error Testing</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Click the buttons below to trigger test errors and verify Sentry integration
          </p>

          <div className="space-y-4">
            {/* Client Error - Unhandled */}
            <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
              <h2 className="text-lg font-semibold mb-2 text-red-900 dark:text-red-100">
                1. Client-Side Unhandled Error
              </h2>
              <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                This will throw an uncaught error that Sentry will automatically capture.
              </p>
              <button
                onClick={triggerClientError}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
              >
                Trigger Client Error
              </button>
            </div>

            {/* Manual Capture */}
            <div className="border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20">
              <h2 className="text-lg font-semibold mb-2 text-yellow-900 dark:text-yellow-100">
                2. Manual Error Capture (Recommended)
              </h2>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                This catches the error and manually sends it to Sentry with extra context.
              </p>
              <button
                onClick={triggerCapturedError}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md font-medium transition-colors"
              >
                Capture Error Manually
              </button>
            </div>

            {/* Server Error */}
            <div className="border border-purple-200 dark:border-purple-800 rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20">
              <h2 className="text-lg font-semibold mb-2 text-purple-900 dark:text-purple-100">3. Server-Side Error</h2>
              <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">
                This will trigger an error on the server that Sentry will capture server-side.
              </p>
              <button
                onClick={triggerServerError}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors"
              >
                Trigger Server Error
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              📍 How to Find Errors in Sentry:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Go to{" "}
                <a
                  href="https://eccco.sentry.io/issues/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  eccco.sentry.io/issues/
                </a>
              </li>
              <li>You'll see your error appear in the issues list (may take 5-10 seconds)</li>
              <li>
                Click on the error to see:
                <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
                  <li>Full stack trace with your actual code (not minified!)</li>
                  <li>Error message and context</li>
                  <li>Browser/device information</li>
                  <li>User information (if authenticated)</li>
                  <li>Breadcrumbs showing what happened before the error</li>
                </ul>
              </li>
            </ol>
          </div>

          {errorTriggered && (
            <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <p className="text-green-800 dark:text-green-200">
                ✅ If you're seeing this, the error was caught by an error boundary!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
