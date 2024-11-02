// pages/index.tsx
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Layout from '@/app/layout';
import CardList from '../components/CardList';
import Link from 'next/link';
import '../styles/home.scss';
import { fetchCachedData } from '../app/FetchCachedData';
import { Post } from '../store/useStore';

interface HomeProps {
  gearCards: Post[];
  tripCards: Post[];
}

const Home: NextPage<HomeProps> = ({ gearCards, tripCards }) => {
  // JSON-LD Schema дані
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Website",
    "url": "https://yourwebsite.com",
    "name": "Туризм в Карпатах та Легкохідство",
    "description": "Сайт про туризм в Карпатах, легкохідство, ultralight, fast and lite. Дізнайтеся про спорядження та мандрівки Україною!",
    "inLanguage": "uk",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://yourwebsite.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Head>
        <title>For Friends - Туризм, Спорядження, Мандрівки | Назар Сова</title>
        <meta
          name="description"
          content="Сайт For Friends від Назара Сови про туризм, мандрівки та спорядження. Запрошення для друзів та однодумців."
        />
        <meta
          name="keywords"
          content="туризм, спорядження, мандрівки, Назар Сова, For Friends"
        />
        {/* Додавання JSON-LD скрипта з використанням dangerouslySetInnerHTML */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <Layout>
        <section className="about-section">
          <h2 className="section-title">Про цей сайт :</h2>
          <p className="section-text">
            Тут ви зможете дізнатися про мене, мої погляди на туризм та багато іншого...
          </p>
          <Link href="/about" className="read-more-link">
            Читати більше
          </Link>
        </section>

        <section className="cards-section">
          <h2 className="section-title">Спорядження</h2>
          <CardList cards={gearCards.slice(0, 8)} />
          <Link href="/gears" className="see-more-link">
            Переглянути усі
          </Link>
        </section>

        <section className="cards-section">
          <h2 className="section-title">Мандрівки</h2>
          <CardList cards={tripCards.slice(0, 8)} />
          <Link href="/trips" className="see-more-link">
            Переглянути усі
          </Link>
        </section>
      </Layout>
    </>
  );
};

// Функція для серверного рендерингу даних
export const getServerSideProps: GetServerSideProps = async () => {
  const { gears, trips } = await fetchCachedData();
  return {
    props: {
      gearCards: gears,
      tripCards: trips,
    },
  };
};

export default Home;
