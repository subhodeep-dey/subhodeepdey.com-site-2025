"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
}

export function ThemeProvider({ children, defaultTheme = "dark", storageKey = "Subhodeep-theme" }: ThemeProviderProps) {
  return <NextThemesProvider defaultTheme={defaultTheme} attribute="class" storageKey={storageKey}>{children}</NextThemesProvider>
}

export { useNextTheme as useTheme }