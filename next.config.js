/** @types {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['**'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 1080, 1200, 1920],
    minimumCacheTTL: 604800,
  },
  i18n: {
    locales: ['by', 'ru', 'en'],
    defaultLocale: 'by',
  },
};

module.exports = nextConfig;
