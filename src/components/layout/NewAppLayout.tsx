"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { NewSidebar } from "./NewSidebar";

interface NewAppLayoutProps {
  children: React.ReactNode;
}

export function NewAppLayout({ children }: NewAppLayoutProps) {
  // Sidebar starts HIDDEN - only opens when hamburger is clicked
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    // Debug logging
    if (typeof window !== "undefined") {
      console.warn("🍔 Hamburger clicked! Current state:", sidebarOpen, "→ New state:", !sidebarOpen);
    }
    setSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    if (typeof window !== "undefined") {
      console.warn("❌ Closing sidebar");
    }
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen" suppressHydrationWarning>
      {/* Sidebar - Hidden by default, opens on hamburger click */}
      <NewSidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

      {/* Floating Hamburger Button - Always visible, highest z-index */}
      <button
        onClick={handleToggleSidebar}
        className="fixed top-4 left-4 z-[60] p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" strokeWidth={2} />
      </button>

      {/* Main Content Area - No margins needed */}
      <div suppressHydrationWarning>
        {/* Page Content - Pages have their own headers and backgrounds */}
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
