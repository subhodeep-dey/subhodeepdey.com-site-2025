"use client";

import { ReactNode } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  skeleton: ReactNode;
  isLoading: boolean;
}

export function LazyLoad({ children, skeleton, isLoading }: LazyLoadProps) {
  return isLoading ? skeleton : children;
}