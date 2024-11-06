'use client';
import React from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store/useStore';
import Layout from '@/components/layout';
import Image from 'next/image';
import Head from 'next/head';
import JsonLd from '@/components/JsonLd';

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
      <Head>
        <title>{gearCard.title} - For Friends</title>
        <meta name="google-site-verification" content="tZ_uTosZ1qy33pO_8RY1JHWYuEpurFBUQq3lQYjhaQY" />
        <meta name="description" content={gearCard.short_description} />
        <meta property="og:title" content={gearCard.title} />
        <meta property="og:description" content={gearCard.short_description} />
        <meta property="og:image" content={gearCard.main_photo?.url || ''} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://for-friends.vercel.app/gear/${id}`} />
      </Head>

      <JsonLd
        id={gearCard.id}
        title={gearCard.title}
        description={gearCard.short_description}
        image={gearCard.main_photo?.url || ''}
        date={gearCard.date}
      />

      <main className="details"> 
        <h2>{gearCard.title}</h2>
        <p className="text-gray-700">{gearCard.date}</p>
        <p className="text-gray-600">{gearCard.short_description}</p>

        {gearCard.main_photo && (
          <Image
            className="image"
            src={gearCard.main_photo.url} 
            alt={gearCard.main_photo.alt_tag || "Gear image"} 
            width={500}
            height={300}
          />
        )}

        <div className="content" dangerouslySetInnerHTML={{ __html: gearCard.content }} />
      </main>
    </Layout>
  );
}
