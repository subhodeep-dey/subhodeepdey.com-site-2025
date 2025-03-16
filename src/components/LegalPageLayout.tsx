"use client";

import React, { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PrintButton from './PrintButton';
import LastUpdatedBadge from './LastUpdatedBadge';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  const pathname = usePathname();
  const urlRef = useRef<HTMLSpanElement>(null);

  // Update URL on client side to avoid hydration mismatch
  useEffect(() => {
    if (urlRef.current) {
      urlRef.current.textContent = window.location.href;
    }
  }, []);

  // Extract locale from pathname
  const locale = pathname.split('/')[1] === 'en' || pathname.split('/')[1] === 'ja' || pathname.split('/')[1] === 'ko'
    ? pathname.split('/')[1]
    : 'en';

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 min-h-screen print:bg-white print:dark:bg-white">
      <div className="container mx-auto px-6 py-12 md:px-12 lg:px-24 print:py-4 print:px-8">
        {/* Navigation and actions */}
        <div className="flex justify-between items-center mb-8 print:hidden">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to home</span>
          </Link>

          <PrintButton />
        </div>

        {/* Print header - only visible when printing */}
        <div className="hidden print:block mb-8">
          <h1 className="text-3xl font-bold text-black">{title}</h1>
          {lastUpdated && (
            <p className="text-sm text-gray-600 mt-2">
              Last updated: {lastUpdated}
            </p>
          )}
          <div className="border-t border-gray-300 mt-4 pt-4">
            <p className="text-sm text-gray-600">
              Printed from: <span ref={urlRef}></span>
            </p>
          </div>
        </div>

        {/* Content card */}
        <div className="bg-white dark:bg-black rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden print:border-0 print:shadow-none print:rounded-none">
          {/* Header - hidden when printing */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 px-8 py-6 print:hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
              {lastUpdated && (
                <LastUpdatedBadge date={lastUpdated} />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8 print:px-0 print:py-0">
            <div className="prose dark:prose-invert max-w-none print:prose-black print:max-w-full">
              {children}
            </div>
          </div>
        </div>

        {/* Print footer - only visible when printing */}
        <div className="hidden print:block mt-8 pt-4 border-t border-gray-300">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} Subhodeep Dey. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}