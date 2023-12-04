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
    '/articles/article*',
    '/ru/articles/article*',
    '/en/articles/article*',
    '/persons/person*',
    '/ru/persons/person*',
    '/en/persons/person*',
    '/places/place*',
    '/ru/places/place*',
    '/en/places/place*',
    '/articles-sitemap.xml',
    '/persons-sitemap.xml',
    '/places-sitemap.xml',
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      process.env.SITE_URL + '/articles-sitemap.xml',
      process.env.SITE_URL + '/persons-sitemap.xml',
      process.env.SITE_URL + '/places-sitemap.xml',
    ],
  },
};
