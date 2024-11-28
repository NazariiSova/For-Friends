import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Post } from '../store/useStore';

let cachedData: { gears: Post[]; trips: Post[] } | null = null;

export const fetchCachedData = async () => {
  if (cachedData) {
    return cachedData;
  }

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

export const fetchItemById = async (id: string): Promise<Post | null> => {
  try {
    const docRef = doc(db, 'post', id); 
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Post;
    } else {
      console.warn(`No document found with id: ${id}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    return null;
  }
};
