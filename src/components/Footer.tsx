"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, Twitter, Youtube, Mail, Instagram } from "lucide-react";

export function Footer() {
  const t = useTranslations("common");
  const currentYear = new Date().getFullYear();
  const lastUpdated = process.env.NEXT_PUBLIC_LAST_UPDATED || "Sep 22, 2024";

  return (
    <footer className="w-full bg-white dark:bg-black py-36">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <div className="flex flex-col items-start text-left mb-8 md:mb-0">
          <div className="mb-6">
            <img
              src="/signature.png"
              alt="Subhodeep Dey's signature"
              className="h-12 md:h-14"
            />
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
            This Web site is made in India 🇮🇳 • Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Next.js
            </a>{" "}
            and hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Vercel
            </a>
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            © {currentYear > 2023 ? "2023 – " + currentYear : ""} Subhodeep Dey.{" "}
            <span className="font-bold">All rights reserved.</span>
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-3">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-5">
          <a
            href={process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/subhodeep-dey"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <Github className="h-5 w-5 md:h-6 md:w-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/subhodeep-dey"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href={process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/sdeysocial"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <Twitter className="h-5 w-5 md:h-6 md:w-6" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href={process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/sdeysocial"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <Youtube className="h-5 w-5 md:h-6 md:w-6" />
            <span className="sr-only">YouTube</span>
          </a>
          <a
            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/sdeysocial"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <Instagram className="h-5 w-5 md:h-6 md:w-6" />
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href="mailto:example@example.com"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <Mail className="h-5 w-5 md:h-6 md:w-6" />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}