import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
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
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  // Validate that the locale is supported
  if (!hasLocale(routing.locales, locale)) {
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
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider defaultTheme="dark" storageKey="Subhodeep-theme">
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <Toaster position="bottom-right" />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}