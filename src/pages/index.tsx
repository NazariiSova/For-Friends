import React from 'react';
import { useStore } from '../store/useStore';
import CardList from '../components/CardList';
import Layout from '@/app/layout';

const Home: React.FC = () => {
  const { gearCards, tripCards } = useStore();

  return (
    <Layout>
      <section>
        <h2 className="text-xl font-bold">Gears</h2>
        <p>Дослідіть наші прилади...</p>
        <CardList cards={gearCards} />
      </section>
      <section>
        <h2 className="text-xl font-bold">Подорожі</h2>
        <p>Дослідіть наші подорожі...</p>
        <CardList cards={tripCards} />
      </section>
    </Layout>
  );
};

export default Home;
