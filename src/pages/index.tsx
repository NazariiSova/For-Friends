'use client';

import React from 'react';
import Layout from '@/app/layout';
import CardList from '../components/CardList';
import { useStore } from '../store/useStore';

export default function Home() {
  const { gearCards, tripCards } = useStore();  // Отримуємо gearCards і tripCards зі стору

  return (
    <Layout>
      <section>
        <h2>Gears</h2>
        <p>Explore our gears...</p>
        <CardList cards={gearCards} />  {/* Передаємо всі картки gears */}
      </section>
      <section>
        <h2>Trips</h2>
        <p>Explore our trips...</p>
        <CardList cards={tripCards} />  {/* Передаємо всі картки trips */}
      </section>
    </Layout>
  );
}
