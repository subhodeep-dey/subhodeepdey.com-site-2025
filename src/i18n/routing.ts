import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'ko', 'ja'];
export const defaultLocale = 'en';

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Use 'as-needed' to only show the locale in the URL when it's not the default locale
  localePrefix: 'as-needed'
});
