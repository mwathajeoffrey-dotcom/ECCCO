"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ScrollSanitizer from "@/components/layout/ScrollSanitizer";
import TouchUnlocker from "@/components/layout/TouchUnlocker";
import ScrollDebugger from "@/components/layout/ScrollDebugger";
import { NewMobileNav } from "@/components/layout/NewMobileNav";

interface RootLayoutContentProps {
  children: React.ReactNode;
}

export function RootLayoutContent({ children }: RootLayoutContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <ScrollSanitizer />
      <TouchUnlocker />
      <ScrollDebugger />
      {/* Scrollable Content Container */}
      <div className="mobile-scroll-container md:contents">
        <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
          {children}
        </AppLayout>
      </div>
      {/* New Phone-Friendly Navigation */}
      <NewMobileNav />
    </>
  );
}
