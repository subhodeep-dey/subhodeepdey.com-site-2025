"use client"

import { useTheme } from "@/components/ThemeProvider"
import { Moon, Sun, Laptop, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const t = useTranslations("common")
  const [mounted, setMounted] = useState(false)
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={theme === "light" ? "bg-zinc-100 dark:bg-zinc-800" : ""}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span className="flex-1">{t("themeSwitch.light")}</span>
          {theme === "light" && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={theme === "dark" ? "bg-zinc-100 dark:bg-zinc-800" : ""}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span className="flex-1">{t("themeSwitch.dark")}</span>
          {theme === "dark" && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={theme === "system" ? "bg-zinc-100 dark:bg-zinc-800" : ""}
        >
          <Laptop className="mr-2 h-4 w-4" />
          <span className="flex-1">{t("themeSwitch.system")}</span>
          {theme === "system" && <Check className="h-4 w-4 ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
