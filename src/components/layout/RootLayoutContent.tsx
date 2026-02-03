"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ScrollSanitizer from "@/components/layout/ScrollSanitizer";

interface RootLayoutContentProps {
  children: React.ReactNode;
}

export function RootLayoutContent({ children }: RootLayoutContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <ScrollSanitizer />
      {/* Scrollable Content Container */}
      <div className="mobile-scroll-container md:contents">
        <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
          {children}
        </AppLayout>
      </div>
    </>
  );
}
