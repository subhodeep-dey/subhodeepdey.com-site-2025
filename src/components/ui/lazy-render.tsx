"use client";

import { ReactNode, Suspense } from "react";

interface LazyRenderProps {
  children: ReactNode;
  fallback: ReactNode;
}

export function LazyRender({ children, fallback }: LazyRenderProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}