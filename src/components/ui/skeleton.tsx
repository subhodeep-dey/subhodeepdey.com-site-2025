"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-zinc-200 dark:bg-zinc-800",
        className
      )}
    />
  );
}

// Common skeleton components
export function TextSkeleton({ className, lines = 1 }: { className?: string, lines?: number }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array(lines).fill(0).map((_, i) => (
        <Skeleton 
          key={i} 
          className={cn(
            "h-4 w-full", 
            i === lines - 1 && lines > 1 ? "w-4/5" : "w-full"
          )} 
        />
      ))}
    </div>
  );
}

export function HeadingSkeleton({ className, level = 1 }: { className?: string, level?: 1 | 2 | 3 }) {
  const height = level === 1 ? "h-8" : level === 2 ? "h-6" : "h-5";
  return <Skeleton className={cn(height, "w-3/4", className)} />;
}

export function ImageSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("w-full aspect-video", className)} />;
}

export function AvatarSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-10 w-10 rounded-full", className)} />;
}

export function ButtonSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-9 w-24 rounded-md", className)} />;
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-40 w-full rounded-lg" />
      <HeadingSkeleton level={2} />
      <TextSkeleton lines={2} />
    </div>
  );
}

export function PostCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg", className)}>
      <HeadingSkeleton level={2} className="mb-3" />
      <div className="flex flex-wrap gap-2 mb-3">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <TextSkeleton lines={3} />
    </div>
  );
}

export function TagsSkeleton({ className, count = 4 }: { className?: string, count?: number }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {Array(count).fill(0).map((_, i) => (
        <Skeleton key={i} className="h-6 w-16 rounded-full" />
      ))}
    </div>
  );
}

export function NavbarSkeleton() {
  return (
    <div className="w-full py-4 px-6 flex items-center justify-between border-b">
      <Skeleton className="h-8 w-32" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
        <AvatarSkeleton />
      </div>
    </div>
  );
}

export function PostDetailSkeleton() {
  return (
    <div className="container max-w-3xl py-12 space-y-8">
      <div className="text-center space-y-4">
        <HeadingSkeleton level={1} className="mx-auto" />
        <div className="flex justify-center gap-2">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
        <div className="flex justify-center gap-2">
          <Skeleton className="h-6 w-20 rounded-md" />
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>
      </div>
      <div className="space-y-6">
        <TextSkeleton lines={4} />
        <Skeleton className="h-64 w-full rounded-lg" />
        <TextSkeleton lines={3} />
        <HeadingSkeleton level={2} />
        <TextSkeleton lines={5} />
      </div>
    </div>
  );
}

export function PostListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array(count).fill(0).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HomepageSkeleton() {
  return (
    <div className="container py-12 space-y-16">
      {/* Hero section */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 space-y-4">
          <HeadingSkeleton level={1} />
          <TextSkeleton lines={3} />
          <ButtonSkeleton />
        </div>
        <div className="w-full md:w-1/2">
          <ImageSkeleton className="rounded-lg" />
        </div>
      </div>
      
      {/* Featured posts */}
      <div className="space-y-6">
        <HeadingSkeleton level={2} />
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array(3).fill(0).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutPageSkeleton() {
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <HeadingSkeleton level={1} className="mx-auto" />
        <TextSkeleton lines={2} />
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/3">
          <AvatarSkeleton className="h-40 w-40 mx-auto" />
        </div>
        <div className="w-full md:w-2/3 space-y-4">
          <HeadingSkeleton level={2} />
          <TextSkeleton lines={4} />
        </div>
      </div>
      
      <div className="space-y-4">
        <HeadingSkeleton level={2} />
        <TextSkeleton lines={6} />
      </div>
    </div>
  );
}
export function ProjectCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden p-6 bg-white dark:bg-zinc-950">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-6">
        <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
        <div className="w-full">
          <Skeleton className="h-7 w-48 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800">
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-9 w-32 rounded-md" />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
    </div>
  );
}

export function ProjectsPageSkeleton() {
  return (
    <section className="py-12 md:py-20">
      <div className="container max-w-5xl">
        <div className="mb-12">
          <HeadingSkeleton level={1} className="mb-4" />
          <TextSkeleton lines={2} className="max-w-3xl" />
        </div>

        <div className="grid grid-cols-1 gap-8">
          {[1, 2, 3].map(i => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactPageSkeleton() {
  return (
    <section className="py-12 md:py-20">
      <div className="container max-w-4xl">
        <div className="text-center mb-10">
          <HeadingSkeleton level={1} className="mx-auto mb-4" />
          <TextSkeleton lines={2} className="max-w-2xl mx-auto" />
        </div>

        <div className="space-y-6 max-w-xl mx-auto">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-32 w-full rounded-md" />
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </section>
  );
}

export function WorkPageSkeleton() {
  return (
    <section className="py-12 md:py-20">
      <div className="container max-w-5xl">
        <div className="mb-12">
          <HeadingSkeleton level={1} className="mb-4" />
          <TextSkeleton lines={2} className="max-w-3xl" />
        </div>

        <div className="space-y-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="border rounded-lg overflow-hidden p-6 bg-white dark:bg-zinc-950">
              <div className="space-y-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-7 w-64" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>

                <TextSkeleton lines={2} />

                <div className="flex flex-wrap gap-2 mt-4">
                  {[1, 2, 3, 4, 5, 6].map(j => (
                    <Skeleton key={j} className="h-6 w-20 rounded-full" />
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 border-zinc-200 dark:border-zinc-800">
                <Skeleton className="h-9 w-40 rounded-md mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}