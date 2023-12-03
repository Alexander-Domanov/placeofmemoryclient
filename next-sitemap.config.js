/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://pf.cygan.lol',
  generateRobotsTxt: true,
  exclude: ['/auth/*', '/account', '/account/', '/dashboard*'],
  // ...other options
};
