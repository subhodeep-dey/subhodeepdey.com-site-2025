"use client"

import { useRouter, usePathname } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { routing } from "@/i18n/routing"

export function LanguageSwitcher() {
  const router = useRouter()
  const t = useTranslations("common")
  const pathname = usePathname()
  const locale = useLocale()

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  const getLanguageName = (localeCode: string) => {
    switch (localeCode) {
      case "en":
        return t("languageSwitch.en")
      case "ko":
        return t("languageSwitch.ko")
      case "ja":
        return t("languageSwitch.ja")
      default:
        return localeCode
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((localeCode) => (
          <DropdownMenuItem
            key={localeCode}
            onClick={() => changeLanguage(localeCode)}
          >
            <span className={locale === localeCode ? "font-bold" : ""}>
              {getLanguageName(localeCode)}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
