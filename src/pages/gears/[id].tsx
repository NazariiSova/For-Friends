'use client'

import React from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store/useStore';
import Layout from '@/app/layout';
import Image from 'next/image';

export default function GearDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { gearCards } = useStore();
  
  const gearCard = gearCards.find((card) => card.id === id);

  if (!gearCard) return <p>Card not found</p>;

  return (
    <Layout>
      <main>
        <h2>{gearCard.title}</h2>
        <p>{gearCard.date}</p>
        <p>{gearCard.shortDescription}</p>

        <Image
          src={gearCard.imageUrl}
          alt="Inside view"
          width={500}
          height={300}
        />
        
        <div dangerouslySetInnerHTML={{ __html: gearCard.fullContent }} />
      </main>
    </Layout>
  );
}
