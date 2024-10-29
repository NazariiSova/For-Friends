import { create } from 'zustand';
import { fetchCachedData } from '../app/FetchCachedData';


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
    const { gears, trips } = await fetchCachedData();
    set({ gearCards: gears, tripCards: trips });
  },
}));

