
import Head from 'next/head';

interface JsonLdProps {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

function JsonLd({ id, title, description, image, date }: JsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://for-friends.vercel.app/gear/${id}`
    },
    "headline": title,
    "image": image,
    "datePublished": date,
    "author": {
      "@type": "Organization",
      "name": "For Friends"
    },
    "publisher": {
      "@type": "Organization",
      "name": "For Friends",
      "logo": {
        "@type": "ImageObject",
        "url": "https://for-friends.vercel.app/logo.png"
      }
    },
    "description": description
  };

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Head>
  );
}

export default JsonLd;
