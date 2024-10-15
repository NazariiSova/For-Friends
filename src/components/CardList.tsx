'use client'

import React from 'react';
import Card from './Card';
import { GearCard, TripCard } from '../store/useStore';
import '../styles/cardList.scss'

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
