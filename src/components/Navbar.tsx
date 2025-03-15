"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const t = useTranslations("common")
  const pathname = usePathname()
  const locale = useLocale()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path: string) => {
    return (pathname === path || pathname === `${path}/`)
      ? "font-bold"
      : ""
  }

  const scrollToMoreSection = (e: React.MouseEvent) => {
    e.preventDefault()

    // Close mobile menu first if it's open
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }

    // Use setTimeout to ensure the menu has time to close and recalculate positions
    setTimeout(() => {
      const moreSection = document.getElementById('more-on-this-site')
      if (moreSection) {
        // Get the section's position
        const moreSectionRect = moreSection.getBoundingClientRect()
        const offsetPosition = moreSectionRect.top + window.scrollY

        // Calculate header height - use different values for mobile and desktop
        const headerHeight = window.innerWidth < 768 ? 60 : 75 // Adjust these values as needed

        // Add extra padding for mobile to ensure the heading is clearly visible
        const mobilePadding = window.innerWidth < 768 ? 20 : 0

        // Scroll to the section with offset for the header
        window.scrollTo({
          top: offsetPosition - headerHeight - mobilePadding,
          behavior: 'smooth'
        })
      }
    }, isMenuOpen ? 300 : 0) // Add delay only if menu was open
  }

  return (
    <header className="w-full py-4 border-b border-zinc-200 dark:border-zinc-800">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`nav-link ${isActive("/")}`}
            >
              {t("navigation.home")}
            </Link>
            <Link
              href="/work"
              className={`nav-link ${isActive("/work")}`}
            >
              {t("navigation.work")}
            </Link>
            <Link
              href="/projects"
              className={`nav-link ${isActive("/projects")}`}
            >
              {t("navigation.projects")}
            </Link>
            <Link
              href="/about"
              className={`nav-link ${isActive("/about")}`}
            >
              {t("navigation.about")}
            </Link>
            <Link
              href="/posts"
              className={`nav-link ${isActive("/posts")}`}
            >
              {t("navigation.posts")}
            </Link>
            <a
              href="#more-on-this-site"
              className="nav-link cursor-pointer"
              onClick={scrollToMoreSection}
            >
              {t("navigation.more")}
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href="/contact"
            className="hidden md:block rounded-full px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition-opacity"
          >
            {t("navigation.sayHi")}
          </Link>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <nav className="container flex flex-col space-y-4">
            <Link
              href="/"
              className={`nav-link ${isActive("/")} text-lg`}
              onClick={toggleMenu}
            >
              {t("navigation.home")}
            </Link>
            <Link
              href="/work"
              className={`nav-link ${isActive("/work")} text-lg`}
              onClick={toggleMenu}
            >
              {t("navigation.work")}
            </Link>
            <Link
              href="/projects"
              className={`nav-link ${isActive("/projects")} text-lg`}
              onClick={toggleMenu}
            >
              {t("navigation.projects")}
            </Link>
            <Link
              href="/about"
              className={`nav-link ${isActive("/about")} text-lg`}
              onClick={toggleMenu}
            >
              {t("navigation.about")}
            </Link>
            <Link
              href="/posts"
              className={`nav-link ${isActive("/posts")} text-lg`}
              onClick={toggleMenu}
            >
              {t("navigation.posts")}
            </Link>
            <a
              href="#more-on-this-site"
              className="nav-link text-lg cursor-pointer"
              onClick={scrollToMoreSection}
            >
              {t("navigation.more")}
            </a>
            <Link
              href="/contact"
              className="rounded-full px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition-opacity w-fit mt-2"
              onClick={toggleMenu}
            >
              {t("navigation.sayHi")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
