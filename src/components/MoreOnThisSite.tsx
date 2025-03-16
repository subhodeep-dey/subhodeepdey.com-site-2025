"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

const MoreOnThisSite = () => {
  const t = useTranslations('common');
  const pathname = usePathname();

  // Extract locale from pathname
  const locale = pathname && (pathname.split('/')[1] === 'en' || pathname.split('/')[1] === 'ja' || pathname.split('/')[1] === 'ko')
    ? pathname.split('/')[1]
    : 'en';

  return (
    <div id="more-on-this-site" className="pt-12 px-6 md:px-12 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-8">More on this site</h2>
        <ul className="space-y-4 pb-16">
          <li>
            <Link href={`/${locale}/about`} className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
              About me
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">A little bit more about me and what I do.</p>
          </li>
          <li>
            <Link href={`/${locale}/endorsements`} className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
              Endorsements
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Amazing things people have said about working with me.</p>
          </li>
          <li>
            <Link href={`/${locale}/interviews`} className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
              Interviews
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Public interviews about me and my work.</p>
          </li>
          <li>
            <Link href={`/${locale}/podcasts`} className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
              Podcasts
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Podcast interviews about work, freelance career, and beyond.</p>
          </li>
          <li>
            <Link href={`/${locale}/press-kit`} className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
              Press Kit
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Biographies and photos for public use.</p>
          </li>
          <li>
            <Link href={`/${locale}/the-desk`} className="text-lg font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
              The Desk
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Uncategorized thoughts about everything from travel, to work, productivity, and life.</p>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default MoreOnThisSite;