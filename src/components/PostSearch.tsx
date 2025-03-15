"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface PostSearchProps {
  onSearch: (query: string) => void;
}

export function PostSearch({ onSearch }: PostSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle input changes with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div 
        className={`flex items-center bg-white dark:bg-zinc-800 border ${
          isFocused 
            ? 'border-blue-500 ring-2 ring-blue-500/20' 
            : 'border-zinc-300 dark:border-zinc-700'
        } rounded-lg overflow-hidden transition-all duration-200 ease-in-out`}
      >
        <div className="flex items-center justify-center pl-3 text-zinc-500 dark:text-zinc-400">
          <Search size={18} />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search posts by title, date, author, or tags..."
          className="flex-1 py-2.5 px-3 w-full bg-transparent text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none"
          aria-label="Search posts"
        />
        
        {query && (
          <button
            onClick={handleClear}
            className="flex items-center justify-center pr-3 hover:text-zinc-900 dark:hover:text-white text-zinc-500 dark:text-zinc-400 transition-colors"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}