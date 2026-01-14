'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/navigation/Sidebar';
import { Menu } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Pages that should not show the sidebar (auth pages and redirects)
  // Note: /auth/signin handles both signin and signup (December 19th version)
  const noSidebarPages = ['/sign-in', '/sign-up', '/login', '/auth'];
  const shouldShowSidebar = !noSidebarPages.some(page => pathname.startsWith(page));

  if (!shouldShowSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Floating Menu Button - Visible on ALL devices */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
