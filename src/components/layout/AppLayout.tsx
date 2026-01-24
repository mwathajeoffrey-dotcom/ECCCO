"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function AppLayout({ children, setSidebarOpen }: AppLayoutProps) {
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
    <>
      {/* Floating Menu Button - Visible on ALL devices */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-[60] p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
