import fs from 'fs';
import path from 'path';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://for-friends.vercel.app';

const pages = [
  { loc: `${siteUrl}/`, priority: '1.0' },
  { loc: `${siteUrl}/about`, priority: '0.8' },
  { loc: `${siteUrl}/gears`, priority: '0.7' },
  { loc: `${siteUrl}/trips`, priority: '0.7' },
];

const today = new Date().toISOString().split('T')[0];

const generateSitemap = () => {
  const urls = pages.map((page) => `
    <url>
      <loc>${page.loc}</loc>
      <lastmod>${today}</lastmod>
      <priority>${page.priority}</priority>
    </url>
  `).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;

    fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
    console.log("Sitemap generated!");
};

generateSitemap();
