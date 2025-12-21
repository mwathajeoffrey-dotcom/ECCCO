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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
