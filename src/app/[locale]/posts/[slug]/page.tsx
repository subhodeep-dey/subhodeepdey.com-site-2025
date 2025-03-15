"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import { ArrowUp, ChevronLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface Post {
  id: number;
  title: string;
  date: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
}

interface TableOfContents {
  id: string;
  text: string;
  level: number;
}

export default function PostPage() {
  const t = useTranslations("common");
  const params = useParams();
  const { locale, slug } = params as { locale: string; slug: string };
  
  const [post, setPost] = useState<Post | null>(null);
  const [prevPost, setPrevPost] = useState<Post | null>(null);
  const [nextPost, setNextPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toc, setToc] = useState<TableOfContents[]>([]);
  const [isNavSticky, setIsNavSticky] = useState(false);
  
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
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Show scroll to top button after scrolling down 300px
      setShowScrollTop(window.scrollY > 300);

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
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!loading && !post) {
    notFound();
  }

  if (loading) {
    return (
      <div className="container max-w-3xl py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4 mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navigation bar */}
      <div
        ref={navRef}
        className={`w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 transition-all ${
          isNavSticky ? 'shadow-sm' : ''
        }`}
        >
        <div className="container px-4 relative py-3">
          {/* Back button - absolute positioning for proper centering */}
          <Link 
            href={`/${locale}/posts`}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-sm md:text-base"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden md:inline">Back to Posts</span>
            <span className="md:hidden">Back</span>
          </Link>
          
          {/* URL slug display - centered */}
          <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-xs md:text-sm mx-auto w-fit">
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


      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full shadow-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      
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
                <div className="flex justify-center flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-sm"
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
              <ReactMarkdown>{post?.content || ""}</ReactMarkdown>
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
                    className={`block hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors ${
                        item.level === 1 ? 'font-semibold' : ''
                    }`}
                    style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
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
          <div className="flex flex-row justify-between items-start mt-12 border-t pt-6 dark:border-zinc-800">
            <div className={`${nextPost ? 'w-[48%]' : 'w-full'}`}>
              {prevPost && (
                <>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Previous post:</p>
                  <Link 
                    href={`/${locale}/posts/${prevPost.slug}`} 
                    className="text-base sm:text-lg font-semibold hover:underline break-words"
                  >
                    {prevPost.title}
                  </Link>
                </>
              )}
            </div>
            
            <div className={`${prevPost ? 'w-[48%]' : 'w-full'} text-right`}>
              {nextPost && (
                <>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Next post:</p>
                  <Link 
                    href={`/${locale}/posts/${nextPost.slug}`} 
                    className="text-base sm:text-lg font-semibold hover:underline break-words inline-block"
                  >
                    {nextPost.title}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}