import { collection, getDocs } from 'firebase/firestore';
import { db } from '../app/firebase/config';

interface Post {
  id: string;
  title: string;
  short_description: string;
  main_photo?: {
    url: string;
    alt_tag: string;
  };
  post_type: '0' | '1';
}

export const DataFetcher = async () => {
  const postsCollection = collection(db, 'post');
  const querySnapshot = await getDocs(postsCollection);
  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];

  return posts;
};
