import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '@/components/layout';
import Image from 'next/image';
import Head from 'next/head';
import JsonLd from '@/components/JsonLd';
import { fetchItemById } from '@/api/FetchCachedData';
import { Post } from '@/store/useStore';

interface GearDetailsProps {
  gearCard: Post | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};
  if (!id || typeof id !== 'string') {
    return { notFound: true };
  }

  try {
    const gearCard = await fetchItemById(id); 

    if (!gearCard) {
      return { notFound: true };
    }

    return {
      props: {
        gearCard,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return { notFound: true };
  }
};

const GearDetails: React.FC<GearDetailsProps> = ({ gearCard }) => {
  if (!gearCard) {
    return (
      <Layout>
        <b>Gear not found</b>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{gearCard.title} - For Friends</title>
        <meta name="description" content={gearCard.short_description} />
        <meta property="og:title" content={gearCard.title} />
        <meta property="og:description" content={gearCard.short_description} />
        <meta property="og:image" content={gearCard.main_photo?.url || ''} />
        <meta
          property="og:url"
          content={`https://for-friends.vercel.app/gear/${gearCard.id}`}
        />
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
            alt={gearCard.main_photo.alt_tag || 'Gear image'}
            width={500}
            height={300}
          />
        )}

        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: gearCard.content }}
        />
      </main>
    </Layout>
  );
};

export default GearDetails;
