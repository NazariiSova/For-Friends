'use client';
import { create } from 'zustand';
import Gear1Img from '../img/gear1.jpg';
import Gear2Img from '../img/gear2.jpg';
import Trip1Img from '../img/trip1.jpg';
import Trip2Img from '../img/trip2.jpg';
import { StaticImageData } from 'next/image';

export interface GearCard {
  id: string;
  title: string;
  date: string;
  imageUrl: string | StaticImageData;
  youtubeVideo: string;
  shortDescription: string;
  fullContent: string;
  type: 'gear';
}

export interface TripCard {
  id: string;
  title: string;
  date: string;
  imageUrl: string | StaticImageData;
  youtubeVideo: string;
  shortDescription: string;
  fullContent: string;
  type: 'trip';
}

type StoreState = {
  gearCards: GearCard[];
  tripCards: TripCard[];
  addCard: (card: GearCard | TripCard) => void;
};

export const useStore = create<StoreState>((set) => ({
  gearCards: [
    {
      id: "1",
      title: "Ultralight Backpack1",
      date: "2023-10-05",
      imageUrl: Gear1Img,  
      youtubeVideo: "https://www.youtube.com/watch?v=DTOkTHtzwSE",
      shortDescription: "This is an amazing ultralight backpack designed for long hikes.",
      fullContent: `
        <p>This backpack weighs less than 1kg and is perfect for long expeditions.</p>
        <img src="gear1" alt="Inside view" />
        <p>It's made of durable materials and can hold up to 35 liters of gear.</p>
        <Image src="gear1" alt="Durability test" />
      `,
      type: 'gear',
    },
    {
      id: "2",
      title: "Ultralight Backpack2",
      date: "2023-10-05",
      imageUrl: Gear2Img,  
      youtubeVideo: "https://www.youtube.com/watch?v=DTOkTHtzwSE",
      shortDescription: "This is an amazing ultralight backpack designed for long hikes.",
      fullContent: `
        <p>This backpack weighs less than 1kg and is perfect for long expeditions.</p>
        <img src="gear1" alt="Inside view" />
        <p>It's made of durable materials and can hold up to 35 liters of gear.</p>
        <Image src="gear2" alt="Durability test" />
      `,
      type: 'gear',
    },
    {
      id: "3",
      title: "Ultralight Backpack3",
      date: "2023-10-05",
      imageUrl: Gear2Img,  
      youtubeVideo: "https://www.youtube.com/watch?v=DTOkTHtzwSE",
      shortDescription: "This is an amazing ultralight backpack designed for long hikes.",
      fullContent: `
        <p>This backpack weighs less than 1kg and is perfect for long expeditions.</p>
        <img src="gear1" alt="Inside view" />
        <p>It's made of durable materials and can hold up to 35 liters of gear.</p>
        <Image src="gear2" alt="Durability test" />
      `,
      type: 'gear',
    },
    {
      id: "4",
      title: "Ultralight Backpack4",
      date: "2023-10-05",
      imageUrl: Gear1Img,  
      youtubeVideo: "https://www.youtube.com/watch?v=DTOkTHtzwSE",
      shortDescription: "This is an amazing ultralight backpack designed for long hikes.",
      fullContent: `
        <p>This backpack weighs less than 1kg and is perfect for long expeditions.</p>
        <img src="gear1" alt="Inside view" />
        <p>It's made of durable materials and can hold up to 35 liters of gear.</p>
        <Image src="gear1" alt="Durability test" />
      `,
      type: 'gear',
    },
    {
      id: "5",
      title: "Ultralight Backpack5",
      date: "2023-10-05",
      imageUrl: Gear2Img,  
      youtubeVideo: "https://www.youtube.com/watch?v=DTOkTHtzwSE",
      shortDescription: "This is an amazing ultralight backpack designed for long hikes.",
      fullContent: `
        <p>This backpack weighs less than 1kg and is perfect for long expeditions.</p>
        <img src="gear1" alt="Inside view" />
        <p>It's made of durable materials and can hold up to 35 liters of gear.</p>
        <Image src="gear1" alt="Durability test" />
      `,
      type: 'gear',
    },
    {
      id: "6",
      title: "Ultralight Backpack6",
      date: "2023-10-05",
      imageUrl: Gear1Img,  
      youtubeVideo: "https://www.youtube.com/watch?v=DTOkTHtzwSE",
      shortDescription: "This is an amazing ultralight backpack designed for long hikes.",
      fullContent: `
        <p>This backpack weighs less than 1kg and is perfect for long expeditions.</p>
        <img src="gear1" alt="Inside view" />
        <p>It's made of durable materials and can hold up to 35 liters of gear.</p>
        <Image src="gear1" alt="Durability test" />
      `,
      type: 'gear',
    },
    {
      id: "7",
      title: "Ultralight Backpack7",
      date: "2023-10-05",
      imageUrl: Gear1Img,  
      youtubeVideo: "https://www.youtube.com/watch?v=DTOkTHtzwSE",
      shortDescription: "This is an amazing ultralight backpack designed for long hikes.",
      fullContent: `
        <p>This backpack weighs less than 1kg and is perfect for long expeditions.</p>
        <img src="gear1" alt="Inside view" />
        <p>It's made of durable materials and can hold up to 35 liters of gear.</p>
        <Image src="gear1" alt="Durability test" />
      `,
      type: 'gear',
    },
    {
      id: "8",
      title: "Ultralight Backpack8",
      date: "2023-10-05",
      imageUrl: Gear2Img,  
      youtubeVideo: "https://www.youtube.com/watch?v=DTOkTHtzwSE",
      shortDescription: "This is an amazing ultralight backpack designed for long hikes.",
      fullContent: `
        <p>This backpack weighs less than 1kg and is perfect for long expeditions.</p>
        <img src="gear1" alt="Inside view" />
        <p>It's made of durable materials and can hold up to 35 liters of gear.</p>
        <Image src="gear1" alt="Durability test" />
      `,
      type: 'gear',
    },
    {
      id: "9",
      title: "Ultralight Backpack9",
      date: "2023-10-05",
      imageUrl: Gear1Img,  
      youtubeVideo: "https://www.youtube.com/watch?v=DTOkTHtzwSE",
      shortDescription: "This is an amazing ultralight backpack designed for long hikes.",
      fullContent: `
        <p>This backpack weighs less than 1kg and is perfect for long expeditions.</p>
        <img src="gear1" alt="Inside view" />
        <p>It's made of durable materials and can hold up to 35 liters of gear.</p>
        <Image src="gear1" alt="Durability test" />
      `,
      type: 'gear',
    },
  ],
  tripCards: [
    {
      id: "1",
      title: "Mountain Adventure1",
      date: "2023-08-20",
      imageUrl: Trip1Img,  
      youtubeVideo: "https://www.youtube.com/watch?v=DTOkTHtzwSE",
      shortDescription: "An unforgettable adventure in the mountains, with breathtaking views and challenges.",
      fullContent: `
        <p>This trip took us to the top of the highest peaks in the region.</p>
        <img src="trip1" alt="View from the peak" />
        <p>We camped overnight and enjoyed the most beautiful sunrise ever.</p>
        <Image src="trip1" alt="Durability test" />
      `,
      type: 'trip',
    },
    {
      id: "2",
      title: "Mountain Adventure2",
      date: "2023-08-20",
      imageUrl: Trip2Img,  
      youtubeVideo: "https://www.youtube.com/watch?v=DTOkTHtzwSE",
      shortDescription: "An unforgettable adventure in the mountains, with breathtaking views and challenges.",
      fullContent: `
        <p>This trip took us to the top of the highest peaks in the region.</p>
        <img src="trip1" alt="View from the peak" />
        <p>We camped overnight and enjoyed the most beautiful sunrise ever.</p>
        <Image src="trip2" alt="Durability test" />
      `,
      type: 'trip',
    },
  ],
  addCard: (card) =>
    set((state) => {
      if (card.type === 'gear') {
        return { gearCards: [...state.gearCards, card] };
      } else if (card.type === 'trip') {
        return { tripCards: [...state.tripCards, card] };
      }
      return {}; 
    }),
}));