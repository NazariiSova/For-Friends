import { NextApiRequest, NextApiResponse } from 'next';
import { fetchCachedData } from './FetchCachedData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const siteUrl = 'https://for-friends.vercel.app';

  const { gears, trips } = await fetchCachedData();
  const staticPages = ['/', '/about', '/contact'];
  
  const dynamicPages = [
    ...gears.map((gear: { id: string }) => `/gears/${gear.id}`),
    ...trips.map((trip: { id: string }) => `/trips/${trip.id}`)
  ];

  const allPages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages
        .map((page) => {
          return `
            <url>
              <loc>${siteUrl}${page}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.7</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).end(sitemap);
}
