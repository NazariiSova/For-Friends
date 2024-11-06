'use client';

import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import CardList from '../components/CardList';
import Layout from '@/components/layout';
import Link from 'next/link';
import Head from 'next/head';

const Home: React.FC = () => {
  const { gearCards, tripCards, loadCards } = useStore();

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const ogImage = gearCards[0]?.main_photo?.url || tripCards[0]?.main_photo?.url || '/img/default-image.jpg'; 
  const ogDescription = 'Тут ви знайдете інформацію про спорядження та мандрівки, які допоможуть вам краще підготуватись до нових пригод.';

  return (
    <>
      <Head>
        <title>Головна сторінка | Туризм та спорядження сайт For Friends | Назар Сова</title>

        <meta name="description" content="Сайт створено Назаром Совою для друзів та однодумців. Тут ви знайдете інформацію про туризм, спорядження та мандрівки." />

        <meta name="keywords" content="For Friends, туризм, спорядження, мандрівки, Назар Сова" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Головна сторінка | Туризм та спорядження сайт For Friends" />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="For Friends" />
        <meta property="og:url" content="https://for-friends.vercel.app/" /> 

         <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <section className="about-section">
          <h2 className="section-title">Про цей сайт :</h2>
          <p className="section-text">
            Тут ви зможете дізнатися про мене, мої погляди на туризм та багато іншого...
          </p>
          <Link href="/about" className="read-more-link">Читати більше</Link>
        </section>

        <section className="cards-section">
          <h2 className="section-title">Спорядження</h2>
          <CardList cards={gearCards.slice(0, 8)} />
          <Link href="/gears" className="see-more-link">Переглянути усі</Link>
        </section>

        <section className="cards-section">
          <h2 className="section-title">Мандрівки</h2>
          <CardList cards={tripCards.slice(0, 8)} />
          <Link href="/trips" className="see-more-link">Переглянути усі</Link>
        </section>
      </Layout>
    </>
  );
};

export default Home;
