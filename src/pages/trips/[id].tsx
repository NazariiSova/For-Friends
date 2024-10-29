'use client';
import React from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store/useStore';
import Layout from '@/app/layout';
import Image from 'next/image';

export default function TripDetails() {
  const router = useRouter();
  const { id } = router.query; 
  const { tripCards } = useStore();
  
  const tripCard = tripCards.find((card) => card.id === id);

  if (!tripCard) return (
    <Layout>
      <b>Trip not found</b>
    </Layout>
  );

  return (
    <Layout>
      <main>
        <h2>{tripCard.title}</h2>
        <p>{tripCard.date}</p>
        <p>{tripCard.short_description}</p>

        {tripCard.main_photo && (
          <Image
            src={tripCard.main_photo.url}
            alt={tripCard.main_photo.alt_tag || "Trip image"}
            width={500}
            height={300}
          />
        )}
        
        <div dangerouslySetInnerHTML={{ __html: tripCard.content }} />
      </main>
    </Layout>
  );
}
