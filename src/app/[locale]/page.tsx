"use client";

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { useLocale } from "next-intl";
import { Github, Linkedin, Twitter, Youtube, Download } from "lucide-react"
import { HomepageSkeleton } from "@/components/ui/skeleton"
import { LazyLoad } from "@/components/LazyLoad"
import { NewsletterForm } from "@/components/NewsletterForm"

function HomeContent() {
  const t = useTranslations("common")

  // Get social URLs from environment variables
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com"
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com"
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com"
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com"
  const locale = useLocale();
  const resumeUrl = `/downloads/${locale}/subhodeep_dey_resume_${locale === 'en' ? 'english' : locale === 'ko' ? 'korean' : 'japanese'}.pdf`;

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          {/* Profile Image */}
          <div className="shrink-0">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden">
              {/* Different images for light and dark themes */}
              <div className="absolute inset-0 bg-white dark:bg-zinc-900">
                {/* Dark theme image */}
                <Image
                  src="/images/assets/Photo black n white 2048x2048.png"
                  alt="Subhodeep Dey"
                  fill
                  className="object-cover hidden dark:block"
                  priority
                />
                {/* Light theme image */}
                <Image
                  src="/images/assets/Photo colored 2048x2048 black bg.png"
                  alt="Subhodeep Dey"
                  fill
                  className="object-cover dark:hidden block"
                  priority
                />
              </div>
            </div>

            {/* Social Links - Mobile Only */}
            <div className="mt-6 flex gap-3 justify-center md:hidden">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 p-2.5 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 p-2.5 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 p-2.5 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 p-2.5 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Profile Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                  {t("home.title")}
                </h1>
                <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400">
                  {t("home.subtitle")}
                </p>
              </div>

              {/* Resume Button - Desktop */}
              <div className="hidden md:block">
                <a
                  href={resumeUrl}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 dark:bg-zinc-700 text-white rounded-xl hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors shadow-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>

            {/* Bio Content */}
            <div className="space-y-5 max-w-3xl bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <p className="bio-text text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {t("home.bio1")}. {t("home.bio2")}.
              </p>

              <div className="hidden md:flex flex-wrap gap-2 py-2">
                <span className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm">{t("home.bio3")}</span>
                <span className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm">{t("home.bio4")}</span>
                <span className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm">{t("home.bio5")}</span>
                <span className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm">{t("home.bio6")}</span>
                <span className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm">{t("home.bio7")}</span>
              </div>

              <p className="bio-text text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {t("home.bio8")}; {t("home.bio9")}
              </p>

              <p className="bio-text text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {t("home.bio10")} • {t("home.bio11")} • {t("home.bio12")}. {t("home.bio13")}{" "}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t("home.bio14")}
                </a>{" "}
                {t("home.bio15")}.
              </p>
            </div>

            {/* Social Links - Desktop */}
            <div className="mt-8 hidden md:flex gap-4">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                <Twitter className="h-5 w-5" />
                <span>Twitter</span>
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                <Youtube className="h-5 w-5" />
                <span>YouTube</span>
              </a>
            </div>

            {/* Resume Button - Mobile */}
            <div className="mt-8 md:hidden flex justify-center">
              <a
                href={resumeUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 dark:bg-zinc-700 text-white rounded-xl hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors shadow-sm"
              >
                <Download className="h-4 w-4" />
                <span>Download Resume</span>
              </a>
            </div>

            <div className="mt-10 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <p className="text-lg text-center md:text-left">
                {t("home.contactText")}{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t("navigation.sayHi")}
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <NewsletterForm />
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  // Home page doesn't need to fetch data, so we can render it directly
  return <HomeContent />;
}
