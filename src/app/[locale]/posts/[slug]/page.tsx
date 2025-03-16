"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import MDXContent from '@/components/MDXContent';
import { ChevronLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PostDetailSkeleton } from '@/components/ui/skeleton';
import { LazyLoad } from '@/components/LazyLoad';

interface Post {
  id: number;
  title: string;
  date: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
  isMdx: boolean;
}

interface TableOfContents {
  id: string;
  text: string;
  level: number;
}

function PostContent() {
  const t = useTranslations("common");
  const params = useParams();
  const { locale, slug } = params as { locale: string; slug: string };

  const [post, setPost] = useState<Post | null>(null);
  const [prevPost, setPrevPost] = useState<Post | null>(null);
  const [nextPost, setNextPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toc, setToc] = useState<TableOfContents[]>([]);
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const mainNavbarHeight = 75;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts?locale=${locale}`);
        const data = await response.json();
        
        // Access the posts array from the response data
        const postsArray = data.posts || [];
        
        // Sort posts by date (newest first)
        const sortedPosts = [...postsArray].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        
        // Find current post index
        const currentIndex = sortedPosts.findIndex((p: Post) => p.slug === slug);
        
        if (currentIndex !== -1) {
          // Set current post
          setPost(sortedPosts[currentIndex]);
          
          // Set previous post (if not first post)
          if (currentIndex > 0) {
            setPrevPost(sortedPosts[currentIndex - 1]);
          } else {
            setPrevPost(null);
          }
          
          // Set next post (if not last post)
          if (currentIndex < sortedPosts.length - 1) {
            setNextPost(sortedPosts[currentIndex + 1]);
          } else {
            setNextPost(null);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [locale, slug]);

  useEffect(() => {
    // Extract headings for table of contents
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const tocItems: TableOfContents[] = [];
      
      headings.forEach((heading) => {
        const id = heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
        heading.id = id;
        
        tocItems.push({
          id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.substring(1))
        });
      });
      
      setToc(tocItems);
    }
  }, [post]);
    
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress based on article content
      if (contentRef.current) {
        // Get the article element's position and dimensions
        const articleRect = contentRef.current.getBoundingClientRect();
        const articleTop = window.scrollY + articleRect.top;
        const articleBottom = articleTop + articleRect.height;

        // Get the viewport height
        const viewportHeight = window.innerHeight;

        // Current scroll position
        const scrollPosition = window.scrollY;

        // Calculate the visible portion of the article
        // If we haven't reached the article yet
        if (scrollPosition < articleTop) {
          setScrollProgress(0);
        }
        // If we've scrolled past the article
        else if (scrollPosition + viewportHeight >= articleBottom) {
          setScrollProgress(100);
        }
        // We're somewhere in the article
        else {
          // Calculate how much of the article we've scrolled through
          const totalScrollableDistance = articleBottom - articleTop - viewportHeight;
          const scrolledDistance = scrollPosition - articleTop;

          // Calculate progress as a percentage (0 to 100)
          const progress = Math.max(0, Math.min(100, (scrolledDistance / totalScrollableDistance) * 100));
          setScrollProgress(progress);
        }
      } else {
        // Fallback to original calculation if contentRef is not available
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      // Check if scrolled more than 2%
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (window.scrollY / totalHeight) * 100;
      setIsScrolled(scrollPercentage >= 2);

      // Smooth secondary navbar positioning
      if (navRef.current) {
        // Calculate the position based on scroll
        // This creates a smooth transition as the navbar follows the main navbar
        // until it reaches the top, then sticks
        const navPosition = Math.max(0, mainNavbarHeight - window.scrollY);

        navRef.current.style.position = 'fixed';
        navRef.current.style.top = `${navPosition}px`;
        navRef.current.style.left = '0';
        navRef.current.style.width = '100%';
        navRef.current.style.zIndex = '30';

        // Update sticky state for any additional styling if needed
        setIsNavSticky(window.scrollY >= mainNavbarHeight);
      }
    };

    // Initial call to set correct position on load
    // Use a small timeout to ensure the content is rendered
    setTimeout(handleScroll, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  // Scroll to top function removed - now handled globally

  if (loading) {
    return <PostDetailSkeleton />;
  }

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Navigation bar */}
      <div
        ref={navRef}
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-zinc-100/90 dark:bg-zinc-900/90 backdrop-blur-sm border-zinc-300/80 dark:border-zinc-700/80'
            : 'bg-zinc-100/30 dark:bg-zinc-900/30 border-zinc-300/30 dark:border-zinc-700/30'
        } ${
          isNavSticky ? 'shadow-sm' : ''
        }`}
        >
        <div className="container px-4 relative py-3">
          {/* Back button - absolute positioning for proper centering */}
          <Link
            href={`/posts`}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-sm md:text-base hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden md:inline">Back to Posts</span>
            <span className="md:hidden">Back</span>
          </Link>

          {/* URL slug display - centered */}
          <div className={`px-3 py-1 rounded-full text-xs md:text-sm mx-auto w-fit transition-all duration-300 ${
            isScrolled
              ? 'bg-zinc-200/90 dark:bg-zinc-800/90'
              : 'bg-zinc-200/60 dark:bg-zinc-800/60'
          }`}>
            <span className="opacity-60">posts/</span>
            <span>{slug}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-0.5 bg-transparent">
            <div
            className="h-full bg-black dark:bg-white transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%`, opacity: scrollProgress > 0 ? 1 : 0 }}
            />
        </div>
        </div>

        {/* Spacer to prevent content from jumping when navbar becomes fixed */}
        <div style={{ height: '30px', marginTop: '10px' }}></div>


      {/* Scroll to top button removed - now handled globally */}
      
      <div className="container py-8 md:py-12 lg:pl-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <article className="lg:w-3/4 mx-auto lg:pr-16">
            <header className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post?.title}</h1>
              <div className="flex justify-center flex-wrap gap-2 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                <time dateTime={post?.date}>{post?.date}</time>
                <span>•</span>
                <span>{post?.author}</span>
              </div>
              {post?.tags && post.tags.length > 0 && (
                <div className="flex justify-center flex-wrap gap-1.5 mt-1.5 mt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-sm text-zinc-700 dark:text-zinc-300 text-zinc-700 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
            
            <div
              ref={contentRef}
              className="prose prose-zinc dark:prose-invert max-w-none mx-auto
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
                prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6
                prose-p:mb-4 prose-p:leading-relaxed
                prose-li:my-1 prose-li:leading-relaxed
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-medium
                prose-blockquote:border-l-4 prose-blockquote:border-zinc-300 dark:prose-blockquote:border-zinc-700
                prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-zinc-600 dark:prose-blockquote:text-zinc-400
                prose-img:rounded-lg prose-img:shadow-md
                prose-table:border-collapse prose-table:w-full
                prose-th:border prose-th:border-zinc-300 dark:prose-th:border-zinc-700 prose-th:bg-zinc-100 dark:prose-th:bg-zinc-800 prose-th:p-2 prose-th:text-left
                prose-td:border prose-td:border-zinc-300 dark:prose-td:border-zinc-700 prose-td:p-2"
            >
              <MDXContent
                content={post?.content || ""}
              />
            </div>
          </article>
          
          {/* Table of contents sidebar - hidden on mobile */}
            <aside className="hidden lg:block lg:w-1/4 order-first lg:order-last">
            <div className="sticky top-24 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg max-h-[calc(100vh-160px)] overflow-y-auto mb-8">
                <h3 className="text-lg font-semibold mb-3">Contents</h3>
                <nav className="space-y-2 text-sm">
                {toc.map((item) => (
                    <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                        item.level === 1 ? 'font-semibold' : ''
                    }`}
                    style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(item.id);
                      if (element) {
                        // Get the navbar height - account for both main and secondary navbars
                        const mainNavHeight = mainNavbarHeight;
                        const secondaryNavHeight = navRef.current ? navRef.current.offsetHeight : 0;
                        const totalOffset = mainNavHeight + secondaryNavHeight + 20; // Adding extra padding

                        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                        window.scrollTo({
                          top: elementPosition - totalOffset,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    >
                    {item.text}
                    </a>
                ))}
                </nav>
            </div>
            </aside>

        </div>
        
        {/* Previous and Next post navigation */}
        {(prevPost || nextPost) && (
          <div className="mt-12 border-t pt-8 dark:border-zinc-800">
            <h3 className="text-xl font-semibold mb-6 text-center">Continue Reading</h3>
            <div className="flex flex-col sm:flex-row justify-between items-stretch gap-6 sm:gap-8">
              {/* Previous post card */}
              {prevPost ? (
                <div className={`${nextPost ? 'w-full sm:w-1/2' : 'w-full'} group`}>
                  <div className="h-full p-5 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-all duration-200 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-sm">
                    <div className="flex flex-col h-full">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="m15 18-6-6 6-6"/>
                        </svg>
                        Previous post
                      </p>
                      <Link
                        href={`/posts/${prevPost.slug}`}
                        className="text-base sm:text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-words line-clamp-2 mb-2 h-14 overflow-hidden"
                      >
                        {prevPost.title}
                      </Link>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
                        {prevPost.date}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden sm:block sm:w-1/2"></div>
              )}

              {/* Next post card */}
              {nextPost ? (
                <div className={`${prevPost ? 'w-full sm:w-1/2' : 'w-full'} group`}>
                  <div className="h-full p-5 border border-zinc-200 dark:border-zinc-800 rounded-lg transition-all duration-200 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-sm">
                    <div className="flex flex-col h-full">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 flex items-center justify-start sm:justify-end">
                        Next post
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                          <path d="m9 18 6-6-6-6"/>
                        </svg>
                      </p>
                      <Link
                        href={`/posts/${nextPost.slug}`}
                        className="text-base sm:text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-words line-clamp-2 mb-2 text-left h-14 overflow-hidden"
                      >
                        {nextPost.title}
                      </Link>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-auto text-left">
                        {nextPost.date}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden sm:block sm:w-1/2"></div>
              )}
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default function PostPage() {
  return <PostContent />;
}