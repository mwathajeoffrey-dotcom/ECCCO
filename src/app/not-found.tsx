import { FileX, Home, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <FileX className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the page you're looking for. It might have been moved, 
          deleted, or you may have entered the wrong URL.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Homepage
          </Link>
          
          <Link
            href="/exam"
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors inline-flex items-center justify-center"
          >
            <Search className="w-4 h-4 mr-2" />
            Browse Exams
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Check out our{' '}
            <Link href="/help" className="text-blue-600 hover:text-blue-700 underline">
              help center
            </Link>{' '}
            or{' '}
            <a 
              href="mailto:support@eccco.app" 
              className="text-blue-600 hover:text-blue-700 underline"
            >
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}