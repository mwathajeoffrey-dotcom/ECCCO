'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the actual auth signup page
    router.push('/auth/signup');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to sign up...</p>
      </div>
    </div>
  );
}
