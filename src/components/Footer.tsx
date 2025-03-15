"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { Github, Linkedin, Twitter, Youtube, Mail } from "lucide-react"

export function Footer() {
  const t = useTranslations("common")
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-10 border-t border-zinc-200 dark:border-zinc-800">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </a>
            <a
              href="mailto:example@example.com"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>

          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            © {currentYear} Subhodeep Dey. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
