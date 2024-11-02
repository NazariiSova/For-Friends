/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/sitemap.xml',
//         destination: '/api/sitemap.xml',
//       },
//     ];
//   },
// };

export default nextConfig;
