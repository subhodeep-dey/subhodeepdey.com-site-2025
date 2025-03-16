"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PostSearch } from '@/components/PostSearch';
import { PostTags } from '@/components/PostTags';
import { PostYears } from '@/components/PostYears';
import { PostListSkeleton, TagsSkeleton, TextSkeleton, HeadingSkeleton } from '@/components/ui/skeleton';
import { NewsletterForm } from '@/components/NewsletterForm';

interface Post {
  id: number;
  title: string;
  date: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
}

type PostItem = {
  type: 'post';
  value: Post;
}

type YearItem = {
  type: 'year';
  value: string;
}

type ListItem = PostItem | YearItem;

function PostsContent({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [locale, setLocale] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

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
      setPosts(data.posts || []); // Ensure posts is an array
    };

    fetchPosts();
  }, [locale]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags, selectedYears]);

  // Filter posts based on search query, tags, and years
  const filteredPosts = useMemo(() => {
    // If no filters are applied, return all posts
    if (!searchQuery.trim() && selectedTags.length === 0 && selectedYears.length === 0) return posts;

    return posts.filter(post => {
      // Check if post has any of the selected tags (if tags are selected)
      const matchesTags = selectedTags.length === 0 ||
        (post.tags && selectedTags.some(tag => post.tags.includes(tag)));

      // Check if post is from any of the selected years (if years are selected)
      const postYear = post.date ? new Date(post.date).getFullYear().toString() : "";
      const matchesYears = selectedYears.length === 0 ||
        selectedYears.includes(postYear);

      // If there's no search query, just check the tags and years
      if (!searchQuery.trim()) return matchesTags && matchesYears;

      // Otherwise, check search query, tags, and years
      const lowercasedQuery = searchQuery.toLowerCase();
      const matchesSearch =
        (post.title && post.title.toLowerCase().includes(lowercasedQuery)) ||
        (post.date && post.date.includes(lowercasedQuery)) ||
        (post.author && post.author.toLowerCase().includes(lowercasedQuery)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery)));

      return matchesTags && matchesYears && matchesSearch;
    });
  }, [searchQuery, selectedTags, selectedYears, posts]);

  // Group posts by year
  const postsByYear = useMemo(() => {
    // Sort posts by date (newest first)
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Group by year
    const groupedByYear: Record<string, Post[]> = {};

    sortedPosts.forEach(post => {
      const year = new Date(post.date).getFullYear().toString();
      if (!groupedByYear[year]) {
        groupedByYear[year] = [];
      }
      groupedByYear[year].push(post);
    });

    return groupedByYear;
  }, [filteredPosts]);

  // Get years in descending order
  const years = useMemo(() => {
    return Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));
  }, [postsByYear]);

  // Flatten posts for pagination
  const flattenedPosts = useMemo(() => {
    return years.flatMap(year => {
      return [{ type: 'year', value: year }, ...postsByYear[year].map(post => ({ type: 'post', value: post }))];
    });
  }, [years, postsByYear]);

  // Calculate pagination
  const totalItems = flattenedPosts.length;
  const totalPages = Math.ceil(totalItems / postsPerPage);

  // Get current page items
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * postsPerPage;
    const indexOfFirstItem = indexOfLastItem - postsPerPage;
    return flattenedPosts.slice(indexOfFirstItem, indexOfLastItem);
  }, [flattenedPosts, currentPage, postsPerPage]);

  // Handle page changes
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!locale) {
    // Show skeleton UI while locale is loading
    return <PostsPageSkeleton />;
  }

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

        {/* Mobile filters at the top on small screens */}
        <div className="md:hidden mb-6">
          <PostTags locale={locale} onTagSelect={setSelectedTags} />
          <PostYears locale={locale} onYearSelect={setSelectedYears} />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4">
            {filteredPosts.length > 0 ? (
              <>
                <div className="space-y-6">
                  {currentItems.map((item, index) => {
                    if (item.type === 'year') {
                      return (
                        <div key={`year-${item.value}`} className="flex items-center gap-3 mt-8 first:mt-0">
                          <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{typeof item.value === 'string' ? item.value : ''}</span>
                          <div className="h-px bg-zinc-300 dark:bg-zinc-700 flex-grow"></div>
                        </div>
                      );
                    } else {
                      const post = item.value as Post;
                      return (
                        <div
                          key={post.id}
                          className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                        >
                          <Link href={`/posts/${post.slug}`} className="block">
                            <h2 className="text-xl font-semibold hover:underline">
                              {post.title}
                            </h2>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                              {post.date}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {post.tags?.map(tag => (
                                <span
                                  key={tag}
                                  className="inline-block text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-zinc-600 dark:text-zinc-400"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </Link>
                        </div>
                      );
                    }
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-10 space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === 1
                          ? 'text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {t("posts.pagination.prev")}
                    </button>

                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      {t("posts.pagination.page")} {currentPage} {t("posts.pagination.of")} {totalPages}
                    </span>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === totalPages
                          ? 'text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {t("posts.pagination.next")}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-zinc-500 dark:text-zinc-400">
                  {t("posts.noResults")}
                </p>
              </div>
            )}
          </div>

          {/* Desktop filters on the side */}
          <div className="hidden md:block md:w-1/4">
            <PostTags locale={locale} onTagSelect={setSelectedTags} />
            <PostYears locale={locale} onYearSelect={setSelectedYears} />
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16">
          <div className="max-w-3xl mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}

// Create a skeleton component for posts page
const PostsPageSkeleton = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container max-w-4xl">
        <div className="mb-10">
          <HeadingSkeleton level={1} className="mb-4" />
          <TextSkeleton lines={2} className="mb-8" />
          {/* Skeleton for search */}
          <div className="h-12 w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse" />
        </div>

        {/* Mobile filters skeleton */}
        <div className="md:hidden mb-6">
          <TagsSkeleton />
          <div className="mt-6">
            <TagsSkeleton />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4">
            <PostListSkeleton count={5} />
          </div>

          {/* Desktop filters skeleton */}
          <div className="hidden md:block md:w-1/4">
            <TagsSkeleton />
            <div className="mt-6">
              <TagsSkeleton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Posts({ params }: { params: Promise<{ locale: string }> }) {
  // We'll handle the loading state inside the PostsContent component
  return <PostsContent params={params} />;
}