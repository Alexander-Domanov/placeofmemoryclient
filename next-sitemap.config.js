/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://pf.cygan.lol',
  generateRobotsTxt: true,
  exclude: [
    '/auth/*',
    '/account',
    '/account',
    '/ru/account',
    '/en/account',
    '/dashboard*',
    '/server-sitemap.xml',
    '/articles*',
    '/ru/articles*',
    '/en/articles*',
    '/persons*',
    '/ru/persons*',
    '/en/persons*',
    '/places*',
    '/ru/places*',
    '/en/places*',
  ],
  robotsTxtOptions: {
    additionalSitemaps: [process.env.SITE_URL + '/server-sitemap.xml'],
  },
};
