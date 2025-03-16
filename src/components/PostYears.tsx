"use client";

import { useState, useEffect } from "react";

interface PostYearsProps {
  locale: string;
  onYearSelect: (years: string[]) => void;
}

export function PostYears({ locale, onYearSelect }: PostYearsProps) {
  const [years, setYears] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Don't fetch if locale is not available
    if (!locale) return;

    const fetchYears = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/posts?locale=${locale}`);
        const data = await response.json();
        
        // Extract years from posts
        const yearsSet = new Set<string>();
        if (data.posts && Array.isArray(data.posts)) {
          data.posts.forEach((post: { date: string }) => {
            if (post.date) {
              const year = new Date(post.date).getFullYear().toString();
              yearsSet.add(year);
            }
          });
        }
        
        // Convert to array and sort in descending order (newest first)
        const yearsArray = Array.from(yearsSet).sort((a, b) => parseInt(b) - parseInt(a));
        setYears(yearsArray);
      } catch (error) {
        console.error("Error fetching years:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchYears();
  }, [locale]);

  const handleYearClick = (year: string) => {
    const newSelectedYears = selectedYears.includes(year)
      ? selectedYears.filter(y => y !== year)
      : [...selectedYears, year];
    
    setSelectedYears(newSelectedYears);
    onYearSelect(newSelectedYears);
  };

  // If loading and no years yet, show a loading indicator
  if (isLoading && years.length === 0) {
    return (
      <div className="post-years animate-pulse mt-6">
        <h3 className="font-bold mb-3">Years</h3>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map(i => (
            <span 
              key={i}
              className="inline-block w-16 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="post-years mt-6">
      <h3 className="font-bold mb-3">Years</h3>
      <div className="flex flex-wrap gap-1.5">
        {years.map(year => (
          <span
            key={year}
            className={`inline-block cursor-pointer text-sm px-2.5 py-1 rounded-md transition-colors ${
              selectedYears.includes(year)
                ? "bg-emerald-500 text-white"
                : "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600"
            }`}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </span>
        ))}
        {years.length === 0 && !isLoading && (
          <span className="text-zinc-500 dark:text-zinc-400">No years found</span>
        )}
      </div>
    </div>
  );
}