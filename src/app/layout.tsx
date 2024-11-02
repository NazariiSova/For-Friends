import Head from 'next/head'

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>
          Туризм в Карпатах та Легкохідство | Спорядження та Мандрівки
        </title>
        <meta
          name="description"
          content="Сайт про туризм в Карпатах, легкохідство, ultralight, fast and lite. Дізнайтеся про спорядження та мандрівки Україною!"
        />
        <meta
          name="keywords"
          content="туризм, Карпати, легкохідство, fast and lite, ultralight, спорядження, мандрівки Україна"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Туризм в Карпатах та Легкохідство" />
        <meta
          property="og:description"
          content="Мандрівки та спорядження для легкоходів та туристів в Карпатах і по Україні."
        />
        <meta property="og:image" content="/static/images/preview.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:locale" content="uk_UA" />
        <meta property="og:locale:alternate" content="ru_RU" />
        <meta property="og:locale:alternate" content="en_US" />
        <link rel="canonical" href="https://yourwebsite.com" />
      </Head>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Website',
          url: 'https://yourwebsite.com',
          name: 'Туризм в Карпатах та Легкохідство',
          description:
            'Сайт про туризм в Карпатах, легкохідство, ultralight, fast and lite. Дізнайтеся про спорядження та мандрівки Україною!',
          inLanguage: 'uk',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://yourwebsite.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        })}
      </script>

      <Header />

      <main>{children}</main>
      <Footer />
    </>
  )
}
