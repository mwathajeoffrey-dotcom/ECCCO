"use client";

import ScrollSanitizer from "@/components/layout/ScrollSanitizer";
import TouchUnlocker from "@/components/layout/TouchUnlocker";
import ScrollDebugger from "@/components/layout/ScrollDebugger";

interface RootLayoutContentProps {
  children: React.ReactNode;
}

export function RootLayoutContent({ children }: RootLayoutContentProps) {
  return (
    <>
      <ScrollSanitizer />
      <TouchUnlocker />
      <ScrollDebugger />
      {/* Clean layout - No sidebar */}
      <div className="mobile-scroll-container md:contents">{children}</div>
    </>
  );
}
