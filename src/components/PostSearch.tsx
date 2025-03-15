"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PostSearchProps {
  onSearch: (query: string) => void;
}

export function PostSearch({ onSearch }: PostSearchProps) {
  const t = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative max-w-md w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-zinc-400" />
      </div>
      <Input
        type="text"
        placeholder={t("posts.search")}
        value={searchQuery}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  );
}