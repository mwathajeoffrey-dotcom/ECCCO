"use client";

import { useState } from "react";
import Sidebar from "@/components/navigation/Sidebar";
import AppLayout from "@/components/layout/AppLayout";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

interface RootLayoutContentProps {
  children: React.ReactNode;
}

export function RootLayoutContent({ children }: RootLayoutContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar - OUTSIDE scroll container, fixed to viewport */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile Bottom Nav - OUTSIDE scroll container, fixed to viewport */}
      <MobileBottomNav />

      {/* Scrollable Content Container */}
      <div className="mobile-scroll-container md:contents">
        <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
          {children}
        </AppLayout>
      </div>
    </>
  );
}
