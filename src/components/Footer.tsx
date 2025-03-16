"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, Twitter, Youtube, Mail, Instagram } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const t = useTranslations("common");
  const currentYear = new Date().getFullYear();
  const lastUpdated = process.env.NEXT_PUBLIC_LAST_UPDATED || "Sep 22, 2024";
  const pathname = usePathname();

  // Extract locale from pathname
  const locale = pathname && (pathname.split('/')[1] === 'en' || pathname.split('/')[1] === 'ja' || pathname.split('/')[1] === 'ko')
    ? pathname.split('/')[1]
    : 'en';

  return (
    <footer className="w-full bg-white dark:bg-black py-16 md:py-36 relative overflow-hidden">
      {/* Large background email */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden pb-4 md:pb-12">
        <div className="text-[8vw] md:text-[10vw] lg:text-[8vw] font-black text-zinc-300/60 dark:text-zinc-600/60 whitespace-nowrap transform -rotate-0 select-none tracking-tight">
          hi@subhodeepdey.com
        </div>
      </div>

      <div className="container mx-auto flex flex-col px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          {/* Left column - Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mb-10 md:mb-0 w-full md:w-auto">
            <div className="mb-4 md:mb-6">
              <div className="h-12 md:h-14 font-bold text-xl italic text-zinc-700 dark:text-zinc-300">
                Subhodeep Dey
              </div>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 max-w-md">
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

          {/* Right column - Social & Legal */}
          <div className="flex flex-col items-center md:items-end w-full md:w-auto">
            {/* Social media icons */}
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <a
                href={process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/subhodeep-dey"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/subhodeep-dey"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href={process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/sdeysocial"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href={process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com/sdeysocial"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </a>
              <a
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/sdeysocial"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="mailto:example@example.com"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </div>

            {/* Legal links below social icons */}
                        <div className="flex flex-row items-center justify-center gap-2 mt-4">
              <Link href={`/${locale}/impressum`} className="text-xs text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                {t('impressum.title', { fallback: 'Impressum' })}
              </Link>
              <span className="text-zinc-400 dark:text-zinc-600 text-xs">|</span>
              <Link href={`/${locale}/privacy`} className="text-xs text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                {t('privacy.title', { fallback: 'Privacy Policy' })}
              </Link>
              <span className="text-zinc-400 dark:text-zinc-600 text-xs">|</span>
              <Link href={`/${locale}/moral`} className="text-xs text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                {t('moral.title', { fallback: 'Moral Code' })}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}