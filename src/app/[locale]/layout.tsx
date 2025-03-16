import '@/app/globals.css';
import '@/styles/print.css';
import { Inter } from 'next/font/google';
import Script from "next/script"; 
import { Monitoring } from "react-scan/monitoring/next";
import { Analytics } from '@vercel/analytics/next';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { NavbarSkeleton } from '@/components/ui/skeleton';
import { LazyLoad } from '@/components/LazyLoad';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Toaster } from '@/components/ui/sonner';
import MoreOnThisSite from '@/components/MoreOnThisSite';
import { NextIntlClientProvider } from 'next-intl';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: {
      default: 'Subhodeep Dey',
      template: '%s | Subhodeep Dey',
    },
    description: 'Full stack developer and a leader based in UK with over 10 years of experience.',
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  // Resolve params if it's a Promise
  const resolvedParams = 'then' in params ? await params : params;
  const locale = resolvedParams.locale;

  // Validate that the locale is supported
  if (!locale || !hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../../public/locales/${locale}/common.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
      <Script
          src="https://unpkg.com/react-scan/dist/install-hook.global.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased">
      <Monitoring
          apiKey="Cb-lmjADfG-2aoebS3U07ofe68P82BzH" // Safe to expose publically
          url="https://monitoring.react-scan.com/api/v1/ingest"
          commit={process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA} // optional but recommended
          branch={process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF} // optional but recommended
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider defaultTheme="dark" storageKey="Subhodeep-theme">
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <MoreOnThisSite />
              <Footer />
              <ScrollToTop />
              <Toaster position="bottom-right" />
            </div>
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}