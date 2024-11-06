'use client';

import React from 'react';
import { useStore } from '../store/useStore';
import CardList from '../components/CardList';
import Layout from '@/components/layout';

const Gears: React.FC = () => {
  const { gearCards } = useStore();

  return (
    <Layout>
      <main>
        <h2 className="mb-5 text-2xl">Спорядження</h2>
        <CardList cards={gearCards} />
      </main>
    </Layout>
  );
};

export default Gears;
