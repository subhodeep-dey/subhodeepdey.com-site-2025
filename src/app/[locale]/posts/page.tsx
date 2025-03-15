"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PostSearch } from '@/components/PostSearch';

interface Post {
  id: number;
  title: string;
  date: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
}

export default function Posts({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [locale, setLocale] = useState<string>("");

  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setLocale(unwrappedParams.locale);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!locale) return;

    const fetchPosts = async () => {
      const response = await fetch(`/api/posts?locale=${locale}`);
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, [locale]);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;

    const lowercasedQuery = searchQuery.toLowerCase();
    return posts.filter(post =>
      (post.title && post.title.toLowerCase().includes(lowercasedQuery)) ||
      (post.date && post.date.includes(lowercasedQuery)) ||
      (post.author && post.author.toLowerCase().includes(lowercasedQuery)) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery)))
    );
  }, [searchQuery, posts]);

  return (
    <section className="py-12 md:py-20">
      <div className="container max-w-4xl">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("posts.title")}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            {t("posts.intro")}
          </p>

          <PostSearch onSearch={setSearchQuery} />
        </div>

        {filteredPosts.length > 0 ? (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <Link href={`/${locale}/posts/${post.slug}`} className="block">
                  <h2 className="text-xl font-semibold hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {post.date}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {post.author}
                  </p>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {post.tags?.join(', ')}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              {t("posts.noResults")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}