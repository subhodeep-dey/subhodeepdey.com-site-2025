"use client";

import React from 'react';
import { Printer } from 'lucide-react';

export default function PrintButton({ className = "" }: { className?: string }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-md transition-colors print:hidden ${className}`}
      aria-label="Print this page"
    >
      <Printer className="h-4 w-4" />
      <span>Print</span>
    </button>
  );
}