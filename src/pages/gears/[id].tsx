'use client';
import React from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store/useStore';
import Layout from '@/app/layout';
import Image from 'next/image';
import '../../styles/post.scss'

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
