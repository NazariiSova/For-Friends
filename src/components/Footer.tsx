'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto text-center">
        <h1 className="font-bold text-xl mb-2">For Friends</h1>
        <p>&copy; 2024 For Friends. All rights reserved.</p>
                <nav className="mt-4 flex justify-center gap-4">
          <Link href="https://www.youtube.com/@%D0%9D%D0%B0%D0%B7%D0%B0%D1%80%D0%A1%D0%BE%D0%B2%D0%B0-%D1%8D2%D0%BE/featured" target="_blank" className="hover:underline">
            YouTube
          </Link>
          <Link href="https://www.instagram.com/for_friends_outdoor?igsh=MTRkNmIxaTRidGd1Mw==" target="_blank" className="hover:underline">
            Instagram
          </Link>
        </nav>
      </div>
    </footer>
  );
}
