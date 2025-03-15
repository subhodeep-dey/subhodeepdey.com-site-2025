import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import { Link } from '@/i18n/navigation'
import { Callout } from '@/components/mdx/Callout'
import { Counter } from '@/components/mdx/Counter'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold mb-3 mt-6">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-bold mb-2 mt-4">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    a: ({ href, children }) => {
      const isInternal = href && !href.startsWith('http')
      if (isInternal) {
        return (
          <Link
            href={href}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            {children}
          </Link>
        )
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
      )
    },
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="my-1 leading-relaxed">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 italic text-zinc-600 dark:text-zinc-400 mb-4">
        {children}
      </blockquote>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        className="rounded-lg shadow-md my-6"
        {...(props as ImageProps)}
        alt={props.alt || 'Blog image'}
      />
    ),
    code: ({ children, className }) => {
      // For inline code
      if (!className) {
        return (
          <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        )
      }
      // For code blocks (which have a language className)
      return (
        <code className={`${className} block p-4 rounded-lg overflow-x-auto my-4 text-sm`}>
          {children}
        </code>
      )
    },
    pre: ({ children }) => (
      <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto my-4">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 p-2 text-left">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-zinc-300 dark:border-zinc-700 p-2">
        {children}
      </td>
    ),
    hr: () => (
      <hr className="my-8 border-zinc-300 dark:border-zinc-700" />
    ),
    // Custom MDX components
    Callout,
    Counter,
    ...components,
  }
}