"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import EnhancedSidebar from "@/components/navigation/EnhancedSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function AppLayout({ children, sidebarOpen, setSidebarOpen }: AppLayoutProps) {
  const pathname = usePathname();

  // Close sidebar when route changes (important for mobile navigation)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname, setSidebarOpen]);

  // Pages that should not show the sidebar (auth pages and redirects)
  // Note: /auth/signin handles both signin and signup (December 19th version)
  const noSidebarPages = ["/sign-in", "/sign-up", "/login", "/auth"];
  const shouldShowSidebar = !noSidebarPages.some((page) => pathname.startsWith(page));

  if (!shouldShowSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Sidebar - Desktop (always visible) + Mobile (drawer) */}
      <EnhancedSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Menu Toggle Button - Only visible on mobile (md:hidden) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSidebarOpen(!sidebarOpen);
          }}
          className="md:hidden fixed top-4 left-4 z-50 p-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg shadow-lg transition-all duration-200 hover:scale-110 active:scale-105"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          type="button"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Page Content */}
        <main className="flex-1 md:pt-0 pt-16">{children}</main>
      </div>
    </div>
  );
}
