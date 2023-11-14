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
  },
  i18n: {
    locales: ['By', 'Ru',],
    defaultLocale: 'By',
  },
};

module.exports = nextConfig;
