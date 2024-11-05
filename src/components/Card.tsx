import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../styles/card.module.scss';
import { Post } from '../store/useStore';

interface CardProps {
  card: Post;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const imageUrl = card.main_photo?.url || '';
  const altText = card.main_photo?.alt_tag || card.title;

  return (
    <div className="relative border p-2 rounded shadow-lg break-inside-avoid">
      <Link href={`/${card.post_type === '0' ? 'gears' : 'trips'}/${card.id}`}>
        <div className="group relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={altText}
              className="w-full h-auto object-cover"
              width={400}
              height={300}
            />
          ) : (
            <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity">
            <p className="absolute bottom-0 left-0 text-white p-2">
              {card.short_description}
            </p>
          </div>
        </div>
        <div className="p-2">
          <h3 className="font-bold">{card.title}</h3>
          <p>{card.date}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
