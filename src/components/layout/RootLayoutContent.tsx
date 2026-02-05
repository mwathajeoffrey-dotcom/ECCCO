"use client";

import { AppLayout } from "./AppLayout";

interface RootLayoutContentProps {
  children: React.ReactNode;
}

export function RootLayoutContent({ children }: RootLayoutContentProps) {
  return <AppLayout>{children}</AppLayout>;
}
