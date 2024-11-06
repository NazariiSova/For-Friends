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

  return (
    <>
     <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* Додаткові мета-теги або стилі */}
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
