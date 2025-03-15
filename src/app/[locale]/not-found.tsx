"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { HomeIcon } from "lucide-react"

export default function NotFound() {
  const t = useTranslations("common")

  return (
    <section className="flex flex-col items-center justify-center py-20 text-center px-4">
      <h1 className="text-7xl md:text-9xl font-bold text-zinc-300 dark:text-zinc-700">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">Page Not Found</h2>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mb-8">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/" className="flex items-center gap-2">
          <HomeIcon size={16} />
          <span>Back to Home</span>
        </Link>
      </Button>
    </section>
  )
}
