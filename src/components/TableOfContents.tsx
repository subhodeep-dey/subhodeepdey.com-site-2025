"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface TableOfContentsProps {
  items: {
    id: string;
    title: string;
  }[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white dark:bg-black rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 mb-8 sticky top-24 print:static print:bg-transparent print:border-0 print:p-0">
      <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-100 print:text-black">Table of Contents</h3>
      <ul className="space-y-2 print:space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className="flex items-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors w-full text-left print:text-black print:cursor-text"
            >
              <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0 print:text-black" />
              <span>{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}