"use client";

import { useState } from "react";
import { BookOpen, User, LogIn, LogOut, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  currentPage?: string;
}

export default function Header({ title = "ECCCO", subtitle, currentPage }: HeaderProps) {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [showAuthMenu, setShowAuthMenu] = useState(false);

  const isLoading = !isLoaded;

  const handleSignIn = () => {
    setShowAuthMenu(false);
    router.push("/auth/signin");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-xs sm:text-sm text-gray-600">{subtitle}</p>}
            </div>
          </Link>

          {/* Navigation and Auth */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/modules"
                className={`font-medium text-sm ${
                  currentPage === "modules" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Modules
              </Link>
              <Link
                href="/practice"
                className={`font-medium text-sm ${
                  currentPage === "practice" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Practice
              </Link>
              <Link
                href="/exam"
                className={`font-medium text-sm ${
                  currentPage === "exam" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Exams
              </Link>
              {isSignedIn && (
                <Link
                  href="/dashboard"
                  className={`font-medium text-sm ${
                    currentPage === "dashboard" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </nav>

            {/* Authentication Section */}
            <div className="relative">
              {isLoading ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ) : isSignedIn ? (
                /* Signed In User */
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-gray-900">{user?.firstName || "User"}</p>
                    <p className="text-xs text-gray-600">{user?.emailAddresses[0]?.emailAddress}</p>
                  </div>

                  {user?.imageUrl ? (
                    <img
                      src={user?.imageUrl}
                      alt={user?.firstName || "User"}
                      className="w-8 h-8 rounded-full border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <SignOutButton>
                    <button className="text-gray-700 hover:text-red-600 transition-colors" title="Sign Out">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </SignOutButton>
                </div>
              ) : (
                /* Not Signed In */
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowAuthMenu(!showAuthMenu)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:block">Sign In</span>
                  </button>

                  {/* Auth Dropdown Menu */}
                  {showAuthMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Choose Sign In Method</p>
                        <p className="text-xs text-gray-600">Select your preferred way to access ECCCO</p>
                      </div>

                      <button
                        onClick={handleSignIn}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                      >
                        <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">G</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Continue with Google</p>
                          <p className="text-xs text-gray-600">Quick and secure sign-in</p>
                        </div>
                      </button>

                      <button
                        onClick={handleSignIn}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                      >
                        <UserPlus className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Create Account</p>
                          <p className="text-xs text-gray-600">Sign up with email or Google</p>
                        </div>
                      </button>

                      <div className="px-4 py-2 border-t border-gray-100">
                        <p className="text-xs text-gray-500">Your data is secure and we respect your privacy</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close auth menu */}
      {showAuthMenu && <div className="fixed inset-0 z-40" onClick={() => setShowAuthMenu(false)}></div>}
    </header>
  );
}
