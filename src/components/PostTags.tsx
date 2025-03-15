"use client";

import { useState, useEffect } from "react";

interface PostTagsProps {
  locale: string;
  onTagSelect: (tags: string[]) => void;
}

export function PostTags({ locale, onTagSelect }: PostTagsProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Don't fetch if locale is not available
    if (!locale) return;

    const fetchTags = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/posts?locale=${locale}`);
        const data = await response.json();
        setTags(data.tags || []);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, [locale]);

  const handleTagClick = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newSelectedTags);
    onTagSelect(newSelectedTags);
  };

  // If loading and no tags yet, show a loading indicator
  if (isLoading && tags.length === 0) {
    return (
      <div className="post-tags animate-pulse">
        <h3 className="font-bold mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map(i => (
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
    <div className="post-tags">
      <h3 className="font-bold mb-3">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span
            key={tag}
            className={`inline-block cursor-pointer text-sm px-3 py-1 rounded-full transition-colors ${
              selectedTags.includes(tag) 
                ? "bg-sky-500 text-white" 
                : "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600"
            }`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
        {tags.length === 0 && !isLoading && (
          <span className="text-zinc-500 dark:text-zinc-400">No tags found</span>
        )}
      </div>
    </div>
  );
}