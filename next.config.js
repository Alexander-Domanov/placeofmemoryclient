/** @types {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        hostname: 'place.cygan.lol',
        pathname: '/**'
      },
    ],
  },
  i18n: {
    locales: ['by', 'ru', 'en'],
    defaultLocale: 'by',
  },
};

module.exports = nextConfig;
