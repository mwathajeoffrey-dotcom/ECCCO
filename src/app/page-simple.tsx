import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">ECCCO Platform</h1>
        <p className="text-gray-600 mb-6">Emergency & Critical Care Comprehensive Online</p>
        <div className="space-y-4">
          <Link 
            href="/practice" 
            className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Practice Questions
          </Link>
          <Link 
            href="/exam" 
            className="block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Take Exam
          </Link>
          <Link 
            href="/dashboard" 
            className="block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Dashboard
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-6">
          Platform is working! Updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}