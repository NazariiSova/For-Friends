import React from 'react';
import { useStore } from '../store/useStore'; 
import CardList from '../components/CardList'; 
import Layout from '@/app/layout';

export default function Gears() {
  const { gearCards } = useStore(); 

  return (
    <Layout>
      <main>
        <h2>Gear Collection</h2>
        <CardList cards={gearCards} /> 
      </main>
    </Layout>
  );
}
