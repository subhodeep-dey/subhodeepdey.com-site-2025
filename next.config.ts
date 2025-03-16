import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import ReactComponentName from "react-scan/react-component-name/webpack"; 

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.NODE_ENV === "production" ? "build" : ".next",
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
      },
    ],
  },
  // Add webpack configuration for ReactComponentName plugin
  webpack: (config) => {
    // Only enable in production
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(ReactComponentName({})); 
    }
    return config;
  },
};

// Apply plugin
export default withNextIntl(nextConfig);