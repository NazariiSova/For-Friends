
import { NextApiRequest, NextApiResponse } from 'next';
import { fetchCachedData } from './FetchCachedData';

const getSitemapUrls = async () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://for-friends.vercel.app';

  const pages = [
    { loc: `${siteUrl}/`, priority: '1.0' },
    { loc: `${siteUrl}/about`, priority: '0.8' },
    { loc: `${siteUrl}/gears`, priority: '0.7' },
    { loc: `${siteUrl}/trips`, priority: '0.7' },
  ];

  const today = new Date().toISOString().split('T')[0];
  return pages.map((page) => ({ ...page, lastmod: today }));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://for-friends.vercel.app';

  const { gears, trips } = await fetchCachedData();

  const staticPages = await getSitemapUrls();

  const dynamicPages = [
    ...gears.map((gear: { id: string }) => ({
      loc: `${siteUrl}/gears/${gear.id}`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: '0.7',
    })),
    ...trips.map((trip: { id: string }) => ({
      loc: `${siteUrl}/trips/${trip.id}`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: '0.7',
    })),
  ];

  const allPages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages
        .map((page) => `
            <url>
              <loc>${page.loc}</loc>
              <lastmod>${page.lastmod}</lastmod>
              <changefreq>daily</changefreq>
              <priority>${page.priority}</priority>
            </url>
          `)
        .join('')}
    </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).end(sitemap);
}
