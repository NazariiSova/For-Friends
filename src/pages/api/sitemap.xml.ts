// import { NextApiRequest, NextApiResponse } from 'next';
// import { getSitemapUrls } from '../../utils/sitemapUtils';

// const Sitemap = async (req: NextApiRequest, res: NextApiResponse) => {
//   const urls = await getSitemapUrls();
//   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//       ${urls
//         .map(
//           (url) => `
//         <url>
//           <loc>${url.loc}</loc>
//           <lastmod>${url.lastmod}</lastmod>
//           <priority>${url.priority}</priority>
//         </url>`
//         )
//         .join('')}
//     </urlset>`;

//   res.setHeader('Content-Type', 'application/xml');
//   res.write(sitemap);
//   res.end();
// };

// export default Sitemap;
