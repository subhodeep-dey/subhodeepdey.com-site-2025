import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.NODE_ENV === "production" ? "build" : ".next",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
