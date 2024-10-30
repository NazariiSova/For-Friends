'use client'
import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import searchIcon from '../img/icon/search.svg';
import HamburgerIcon from '../img/icon/hamburger.svg';
import Modal from './Modal';
import SearchResultsModal from './SearchResultsModal';
import { DataFetcher } from './DataFetcher';
import '../styles/header.scss'

export interface Post {
  id: string;
  title: string;
  short_description: string;
  main_photo?: {
    url: string;
    alt_tag: string;
  };
  post_type: '0' | '1';
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleSearchModal = () => setIsSearchModalOpen(!isSearchModalOpen);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts: Post[] = await DataFetcher();
      setAllPosts(posts);
    };
    fetchPosts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredResults = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.short_description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <header>
      <nav className="mt-3 mb-8 overflow-hidden">
        <div className="box justify-around w-screen">
          <h1 className="box text-xl font-bold font-roman">
            <Link href="/">For Friends</Link>
          </h1>

          <ul className="list-none justify-between gap-[5%] w-[46%] max-md:hidden box">
            <li><Link href="/" className="hover:underline">Головна</Link></li>
            <li><Link href="/about" className="hover:underline">Про це</Link></li>
            <li><Link href="/gears" className="hover:underline">Спорядження</Link></li>
            <li><Link href="/trips" className="hover:underline">Мандрівки</Link></li>
          </ul>
<div className='flex gap-5'>
  
          <div className="relative">
            <span className="search-icon" onClick={toggleSearchModal}>
              <Image src={searchIcon} alt="search" />
            </span>
          </div>

          <div className="md:hidden">
            <Image src={HamburgerIcon} alt="menu" onClick={toggleMenu} />
          </div>
</div>
        </div>
      </nav>

      <Modal isOpen={isMenuOpen} onClose={toggleMenu}>
        <nav>
          <ul className="list-none flex flex-col items-center">
            <li className="my-2"><Link href="/" className="hover:underline">Home</Link></li>
            <li className="my-2"><Link href="/about" className="hover:underline">About</Link></li>
            <li className="my-2"><Link href="/gears" className="hover:underline">Gears</Link></li>
            <li className="my-2"><Link href="/trips" className="hover:underline">Trips</Link></li>
          </ul>
        </nav>
      </Modal>

      {isSearchModalOpen && (
        <SearchResultsModal 
          results={searchResults} 
          onClose={toggleSearchModal} 
          onSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
    </header>
  );
}
