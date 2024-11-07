import fs from 'fs';
import path from 'path';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://for-friends.vercel.app';

async function generateSitemap() {
  const pages = [
    { loc: `${siteUrl}/`, priority: '1.0' },
    { loc: `${siteUrl}/about`, priority: '0.8' },
    { loc: `${siteUrl}/gears`, priority: '0.7' },
    { loc: `${siteUrl}/trips`, priority: '0.7' },
  ];

  const today = new Date().toISOString().split('T')[0];
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
          <url>
            <loc>${page.loc}</loc>
            <lastmod>${today}</lastmod>
            <changefreq>daily</changefreq>
            <priority>${page.priority}</priority>
          </url>`
        )
        .join('')}
    </urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemapContent);
  console.log('Sitemap generated at /public/sitemap.xml');
}

generateSitemap();
