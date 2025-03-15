'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Callout } from '@/components/mdx/Callout';
import { Counter } from '@/components/mdx/Counter';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

interface MDXContentProps {
  content: string;
}

// Custom components for ReactMarkdown
const components = {
  h1: ({ children }: any) => (
    <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-8">{children}</h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-xl md:text-2xl font-bold mb-3 mt-6">{children}</h3>
  ),
  h4: ({ children }: any) => (
    <h4 className="text-lg md:text-xl font-bold mb-2 mt-4">{children}</h4>
  ),
  p: ({ children, node }: any) => {
    // Check if paragraph contains only an image
    const hasOnlyImage =
      node?.children?.length === 1 &&
      node?.children[0]?.type === 'element' &&
      node?.children[0]?.tagName === 'img';

    // If it only contains an image, don't wrap in <p> to avoid nesting issues
    if (hasOnlyImage) {
      return <>{children}</>;
    }

    return <p className="mb-4 leading-relaxed">{children}</p>;
  },
  a: ({ href, children }: any) => {
    const isInternal = href && !href.startsWith('http');
    if (isInternal) {
      return (
        <Link
          href={href}
          className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }: any) => (
    <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
  ),
  li: ({ children }: any) => (
    <li className="my-1 leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 italic text-zinc-600 dark:text-zinc-400 mb-4">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }: any) => (
    // Render the image directly without a div wrapper to avoid nesting issues
    <img
      src={src}
      alt={alt || 'Blog image'}
      className="rounded-lg shadow-md w-full h-auto my-6 block"
    />
  ),
  code: ({ className, children }: any) => {
    // For inline code
    if (!className) {
      return (
        <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    }
    // For code blocks (which have a language className)
    return (
      <code className={`${className} block p-4 rounded-lg overflow-x-auto my-4 text-sm`}>
        {children}
      </code>
    );
  },
  pre: ({ children }: any) => (
    <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto my-4">
      {children}
    </pre>
  ),
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: any) => (
    <th className="border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 p-2 text-left">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="border border-zinc-300 dark:border-zinc-700 p-2">
      {children}
    </td>
  ),
  hr: () => (
    <hr className="my-8 border-zinc-300 dark:border-zinc-700" />
  ),
  // Custom components
  Callout: ({ node, ...props }: any) => {
    // Extract type and title from props or node data
    const type = props.type || 'info';
    const title = props.title || '';
    return (
      <Callout type={type} title={title}>
        {props.children}
      </Callout>
    );
  },
  Counter: () => <Counter />,
};

export default function MDXContent({ content }: MDXContentProps) {
  return (
    <ReactMarkdown components={components}>
      {content}
    </ReactMarkdown>
  );
}