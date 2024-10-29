'use client';

import React from 'react';
import { useRouter } from 'next/router';
import EditPost from '../../../components/EditPost';

const EditPostPage: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;

  if (!postId || typeof postId !== 'string') {
    return <p>Loading...</p>;
  }

  return <EditPost postId={postId} />;
};

export default EditPostPage;
