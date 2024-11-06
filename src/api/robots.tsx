import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const host = process.env.NEXT_PUBLIC_SITE_URL || 'https://for-friends.vercel.app';

  res.setHeader('Content-Type', 'text/plain');
  res.send(`
    User-agent: *
    Allow: /

    Sitemap: ${host}/api/sitemap
  `);
}
