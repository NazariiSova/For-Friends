'use client';
import React from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store/useStore';
import Layout from '@/app/layout';
import Image from 'next/image';
import '../../styles/post.scss'

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
      <main className="details"> 
        <h2>{tripCard.title}</h2>
        <p className="text-gray-700">{tripCard.date}</p>
        <p className="text-gray-600">{tripCard.short_description}</p>

        {tripCard.main_photo && (
          <Image
            className="image"
            src={tripCard.main_photo.url}
            alt={tripCard.main_photo.alt_tag || "Trip image"}
            width={500}
            height={300}
          />
        )}
        
        <div className="content" dangerouslySetInnerHTML={{ __html: tripCard.content }} />
      </main>
    </Layout>
  );
}
