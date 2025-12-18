'use client';

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function UserMenu() {
  return (
    <div className="flex items-center gap-4">
      {/* Show when user is NOT signed in */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>

      {/* Show when user IS signed in */}
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-10 h-10'
            }
          }}
          userProfileMode="modal"
          afterSignOutUrl="/"
        />
      </SignedIn>
    </div>
  );
}
