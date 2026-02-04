"use client";

interface RootLayoutContentProps {
  children: React.ReactNode;
}

export function RootLayoutContent({ children }: RootLayoutContentProps) {
  return <div className="mobile-scroll-container md:contents">{children}</div>;
}
