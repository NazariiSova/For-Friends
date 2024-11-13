/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://for-friends.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://for-friends.vercel.app'}/api/sitemap`
    ],
  },
};