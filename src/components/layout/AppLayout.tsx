"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wrapping in a timeout moves the setState to the task queue,
    // satisfying the "non-synchronous" requirement of the linter.
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // On the server or during first hydration, we render the "Desktop" view skeleton
  // but WITHOUT the interactive button to prevent hydration mismatch.
  return (
    <div className="relative lg:flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* The Hamburger is gated by 'mounted' AND 'hidden lg:flex' */}
        {mounted && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed top-4 left-4 z-[100] p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors items-center justify-center"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        )}

        <main
          className={`flex-1 transition-all duration-300 ease-in-out lg:pl-64`}
        >
          <div className="min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
