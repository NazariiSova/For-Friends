'use client'
import React from 'react';
import { useStore } from '../store/useStore'; 
import CardList from '../components/CardList'; 
import Layout from '../pages/_app';

export default function Trips() {
  const { tripCards } = useStore(); 

  return (
    <Layout>
      <main>
      <h2 className='mb-5 text-2xl'>Мандрівки</h2>
        <CardList cards={tripCards} />
      </main>
    </Layout>
  );
}
