'use client';

import React from 'react';
import Card from './Card';

export interface GearCard {
  id: string;
  title: string;
  date: string;
  main_photo?: { 
    url: string;
    alt_tag: string;
  };
  short_description: string;
  content: string;
  post_type: '0';
}

export interface TripCard {
  id: string;
  title: string;
  date: string;
  main_photo?: {
    url: string;
    alt_tag: string;
  };
  short_description: string;
  content: string;
  post_type: '1';
}

interface CardListProps {
  cards: Array<GearCard | TripCard>;
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div className="card-container">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardList;
