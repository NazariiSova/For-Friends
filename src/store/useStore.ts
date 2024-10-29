'use client';
import { create } from 'zustand';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../app/firebase/config';

export interface Post {
  id: string;
  title: string;
  date: string;
  main_photo?: {
    url: string;
    alt_tag: string;
  };
  short_description: string;
  content: string;
  post_type: '0' | '1';
}

export interface GearCard {
  id: string;
  title: string;
  date: string;
  main_photo: {
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
  main_photo: {
    url: string;
    alt_tag: string;
  };
  short_description: string;
  content: string;
  post_type: '1';
}

type StoreState = {
  gearCards: Post[];
  tripCards: Post[];
  loadCards: () => Promise<void>;
};

export const useStore = create<StoreState>((set) => ({
  gearCards: [],
  tripCards: [],
  loadCards: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'post'));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      const gearCards = postsData.filter((post) => post.post_type === '0');
      const tripCards = postsData.filter((post) => post.post_type === '1');

      set({ gearCards, tripCards });
    } catch (error) {
      console.error('Error loading posts from Firebase:', error);
    }
  },
}));
