"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import EnhancedSidebar from "@/components/navigation/EnhancedSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

interface AppLayoutProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function AppLayout({ children, sidebarOpen, setSidebarOpen }: AppLayoutProps) {
  const pathname = usePathname();

  // Close sidebar on route change - ONLY on mobile (< 768px)
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [pathname, setSidebarOpen]);

  // Pages that should not show the sidebar (auth pages and redirects)
  const noSidebarPages = ["/sign-in", "/sign-up", "/login", "/auth"];
  const shouldShowSidebar = !noSidebarPages.some((page) => pathname.startsWith(page));

  if (!shouldShowSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Sidebar - Always visible on desktop, drawer on mobile */}
      <EnhancedSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Hamburger Button - ONLY visible on mobile (< 768px) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          type="button"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Page Content - Padding adjusts for sidebar on desktop */}
        <main className="flex-1 pb-20 md:pb-0 md:pl-0">{children}</main>

        {/* Mobile Bottom Navigation - Only visible on mobile */}
        <MobileBottomNav />
      </div>
    </div>
  );
}
