// app/FetchCachedData.ts
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../app/firebase/config';
import { Post } from '../store/useStore';

let cachedData: { gears: Post[]; trips: Post[] } | null = null;

export const fetchCachedData = async () => {
  if (cachedData) {
    console.log("Using cached data");
    return cachedData;
  }

  console.log("Fetching data from Firebase");
  const querySnapshot = await getDocs(collection(db, 'post'));
  const postsData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];

  cachedData = {
    gears: postsData.filter((post) => post.post_type === '0'),
    trips: postsData.filter((post) => post.post_type === '1'),
  };

  return cachedData;
};
