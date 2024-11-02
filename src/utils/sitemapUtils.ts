// export const getSitemapUrls = async () => {
//     const pages = [
//       { loc: `${process.env.NEXT_PUBLIC_SITE_URL}/`, priority: '1.0' },
//       { loc: `${process.env.NEXT_PUBLIC_SITE_URL}/about`, priority: '0.8' },
//       { loc: `${process.env.NEXT_PUBLIC_SITE_URL}/gears`, priority: '0.7' },
//       { loc: `${process.env.NEXT_PUBLIC_SITE_URL}/trips`, priority: '0.7' },
//     ];
  
//     const today = new Date().toISOString().split('T')[0];
//     return pages.map((page) => ({ ...page, lastmod: today }));
//   };
  