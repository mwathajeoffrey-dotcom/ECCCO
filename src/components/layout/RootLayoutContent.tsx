"use client";

import { NewAppLayout } from "./NewAppLayout";

interface RootLayoutContentProps {
  children: React.ReactNode;
}

export function RootLayoutContent({ children }: RootLayoutContentProps) {
  return <NewAppLayout>{children}</NewAppLayout>;
}
