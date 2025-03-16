import React from 'react';
import { Clock } from 'lucide-react';

interface LastUpdatedBadgeProps {
  date: string;
  className?: string;
}

export default function LastUpdatedBadge({ date, className = "" }: LastUpdatedBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-xs ${className}`}>
      <Clock className="h-3 w-3" />
      <span>Last updated: {date}</span>
    </div>
  );
}