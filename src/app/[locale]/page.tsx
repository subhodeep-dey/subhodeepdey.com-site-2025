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
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          {/* Profile Image */}
          <div className="shrink-0">
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden">
              <Image
                src="https://ext.same-assets.com/1998769025/1948230010.png"
                alt="Subhodeep Dey"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Profile Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("home.title")}</h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6">
              {t("home.subtitle")}
            </p>

            <div className="space-y-4 max-w-3xl">
              <p className="bio-text">
                {t("home.bio1")}. {t("home.bio2")}.
              </p>
              <p className="bio-text">
                {t("home.bio3")} <span className="text-zinc-500">&#9679;</span>{" "}
                {t("home.bio4")} <span className="text-zinc-500">&#9679;</span>{" "}
                {t("home.bio5")} <span className="text-zinc-500">&#9679;</span>
              </p>
              <p className="bio-text">
                {t("home.bio6")} <span className="text-zinc-500">&#9679;</span>{" "}
                {t("home.bio7")}
              </p>
              <p className="bio-text">
                {t("home.bio8")}; {t("home.bio9")}
              </p>
              <p className="bio-text">
                {t("home.bio10")} <span className="text-zinc-500">&#9679;</span>{" "}
                {t("home.bio11")} <span className="text-zinc-500">&#9679;</span>{" "}
                {t("home.bio12")}. {t("home.bio13")}{" "}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline decoration-zinc-400 underline-offset-4 hover:decoration-zinc-700 dark:hover:decoration-zinc-200"
                >
                  {t("home.bio14")}
                </a>{" "}
                {t("home.bio15")}.
              </p>
            </div>

            <div className="mt-8 flex gap-4 flex-wrap justify-center md:justify-start">
              <a
                href={resumeUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 dark:bg-zinc-700 text-white rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors mb-6 md:mb-0"
              >
                <Download className="h-4 w-4" />
                <span>Resume</span>
              </a>

              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-4 py-2 rounded-full transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-4 py-2 rounded-full transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-4 py-2 rounded-full transition-colors"
              >
                <Twitter className="h-4 w-4" />
                <span>Twitter</span>
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-4 py-2 rounded-full transition-colors"
              >
                <Youtube className="h-4 w-4" />
                <span>YouTube</span>
              </a>
            </div>

            <div className="mt-10">
              <p className="text-lg">
                {t("home.contactText")}{" "}
                <Link
                  href="/contact"
                  className="font-semibold underline decoration-zinc-400 underline-offset-4 hover:decoration-zinc-700 dark:hover:decoration-zinc-200"
                >
                  {t("navigation.sayHi")}
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 max-w-3xl mx-auto">
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
