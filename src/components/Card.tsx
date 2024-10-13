import React from 'react';
import Image from 'next/image';
import '../styles/card.scss'
import { GearCard, TripCard } from '../store/useStore';

interface CardProps {
  card: GearCard | TripCard;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="relative border p-2 rounded shadow-lg break-inside-avoid	">
      <div className="group relative">
        <Image
          src={card.imageUrl}
          alt={card.title}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity">
          <p className="absolute bottom-0 left-0 text-white p-2">
            {card.shortDescription}
          </p>
        </div>
      </div>
      <div className="p-2">
        <h3 className="font-bold">{card.title}</h3>
        <p>{card.date}</p>
      </div>
    </div>
  );
};

export default Card;
