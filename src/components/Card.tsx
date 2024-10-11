'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Gear1Img from '../img/gear1.jpg';  
import { useStore } from '../store/useStore';
import { GearCard, TripCard } from '../store/useStore'; 

import '../styles/card.scss';

type CardProps = {
  card: (GearCard | TripCard)[];
};

export default function Card() {
  const { gearCards, tripCards } = useStore(); 
  const card = gearCards[0]; 


  if (!card) return <p>No card found</p>; 

  return (
    <div className="card">
      <Image
        src={card?.imageUrl}  
        alt={card?.title }
        className="card-image"
      />
      <h3>{card?.title}</h3>
      <p>{card?.date}</p>
      <div className="card-hover">
        <p>{card?.fullContent}</p>
      </div>
      <Link href={`/${card?.type === 'gear' ? 'gears' : 'trips'}/${card?.id}`}>
        Read More
      </Link>
    </div>
  );
}
