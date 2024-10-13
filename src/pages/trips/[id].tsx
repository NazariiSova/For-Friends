import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useStore } from '@/store/useStore';
import Layout from '@/app/layout';

export default function TripDetails() {
  const router = useRouter();
  const { id } = router.query; 
  const { tripCards } = useStore();
  
  
  const tripCard = tripCards.find((card) => card.id === id);

  if (!tripCard) return <p>Card not found</p>;

  return (
    <Layout>
      <main>
        <h2>{tripCard.title}</h2>
        <p>{tripCard.date}</p>
        <p>{tripCard.shortDescription}</p>

        <Image
          src={tripCard.imageUrl}
          alt="Inside view"
          width={500}
          height={300}
        />
        
        <div dangerouslySetInnerHTML={{ __html: tripCard.fullContent }} />
      </main>
    </Layout>
  );
}
