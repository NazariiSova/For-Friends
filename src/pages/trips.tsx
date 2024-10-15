'use client'
import React from 'react';
import { useStore } from '../store/useStore'; 
import CardList from '../components/CardList'; 
import Layout from '@/app/layout';

export default function Trips() {
  const { tripCards } = useStore(); 

  return (
    <Layout>
      <main>
        <h2>Trip Collection</h2>
        <CardList cards={tripCards} />
      </main>
    </Layout>
  );
}
