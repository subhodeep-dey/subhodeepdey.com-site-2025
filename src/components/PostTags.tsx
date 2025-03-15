"use client";

import { useState, useEffect } from "react";

interface PostTagsProps {
  locale: string;
  onTagSelect: (tags: string[]) => void;
}

export function PostTags({ locale, onTagSelect }: PostTagsProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch(`/api/posts?locale=${locale}`);
      const data = await response.json();
      setTags(data.tags || []); // Ensure tags is an array
    };

    fetchTags();
  }, [locale]);

  const handleTagClick = (tag: string) => {
    // If tag is already selected, remove it; otherwise add it
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newSelectedTags);
    onTagSelect(newSelectedTags);
  };

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
      </div>
    </div>
  );
}