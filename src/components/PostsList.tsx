'use client';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../app/firebase/config';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  id: string;
  title: string;
  date: string;
  short_description: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  post_type?: string;
  main_photo?: {
    url: string;
    alt_tag: string;
  };
  additional_photo?: string;
}

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'post'));
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'post', id));
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posts.map((post) => (
        <div key={post.id} className="relative border p-4 rounded shadow-lg">
          <Link href={`/${post.post_type === '0' ? 'gears' : 'trips'}/${post.id}`}>
            <div className="group relative">
              <Image
                src={post.main_photo?.url || ''}
                alt={post.main_photo?.alt_tag || 'Post image'}
                width={500}
                height={300}
                priority
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity">
                <p className="absolute bottom-0 left-0 text-white p-2">
                  {post.short_description.replace(/'/g, '&apos;')}
                </p>
              </div>
            </div>
            <div className="p-2">
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.date}</p>
            </div>
          </Link>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => deletePost(post.id)}
              className="text-red-500 hover:underline"
            >
              Видалити
            </button>
            <Link href={`/posts/edit/${post.id}`}>
              <button className="text-blue-500 hover:underline">
                Редагувати
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
