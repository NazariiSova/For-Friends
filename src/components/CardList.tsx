import React from 'react';
import Card from './Card';
import { GearCard, TripCard } from '../store/useStore'; 

type CardListProps = {
  cards: (GearCard | TripCard)[]; 
};

const CardList: React.FC<CardListProps> = ({ cards }) => {
  console.log(...cards);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default CardList;
