'use client';
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

  if (!gearCard) return (
    <Layout>
      <b>Gear not found</b>
    </Layout>
  );

  return (
    <Layout>
      <main>
        <h2>{gearCard.title}</h2>
        <p>{gearCard.date}</p>
        <p>{gearCard.short_description}</p>

        {gearCard.main_photo && (
          <Image
            src={gearCard.main_photo.url} 
            alt={gearCard.main_photo.alt_tag || "Gear image"} 
            width={500}
            height={300}
          />
        )}

        <div dangerouslySetInnerHTML={{ __html: gearCard.content }} />
      </main>
    </Layout>
  );
}
