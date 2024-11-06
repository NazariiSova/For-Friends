'use client';

import React from 'react';
import { useStore } from '../store/useStore';
import CardList from '../components/CardList';
import Layout from '@/components/layout';

const Trips: React.FC = () => {
  const { tripCards } = useStore();

  return (
    <Layout>
      <main>
        <h2 className="mb-5 text-2xl">Мандрівки</h2>
        <CardList cards={tripCards} />
      </main>
    </Layout>
  );
};

export default Trips;
