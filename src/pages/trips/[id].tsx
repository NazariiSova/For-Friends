'use client';
import React from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store/useStore';
import Layout from '@/components/layout';
import Image from 'next/image';
import Head from 'next/head';
import JsonLd from '@/components/JsonLd';

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
      <Head>
        <title>{tripCard.title} - For Friends</title>
        <meta name="description" content={tripCard.short_description} />
        <meta property="og:title" content={tripCard.title} />
        <meta property="og:description" content={tripCard.short_description} />
        <meta property="og:image" content={tripCard.main_photo?.url || ''} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://for-friends.vercel.app/trip/${id}`} />
      </Head>

      <JsonLd
        id={tripCard.id}
        title={tripCard.title}
        description={tripCard.short_description}
        image={tripCard.main_photo?.url || ''}
        date={tripCard.date}
      />

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
