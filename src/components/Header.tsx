'use client'
import React, { useState } from 'react'
import Link from 'next/dist/client/link'
import '../styles/global.scss'
import searchIcon from '../img/icon/search.svg'
import HamburgerIcon from '../img/icon/hamburger.svg'
import Image from '../../node_modules/next/image'
import Modal from './Modal' 

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header>
      <nav className="mt-3 mb-8 overflow-hidden">
        <div className="box justify-around w-screen">
          <h1 className="box text-xl font-bold font-roman">
            {' '}
            <Link href="/">For Friends</Link>
          </h1>

          <ul className="list-none justify-between w-1/4 box hamburger-menu">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/gears" className="hover:underline">
                Gears
              </Link>
            </li>
            <li>
              <Link href="/trips" className="hover:underline">
                Trips
              </Link>
            </li>
          </ul>

          <div className="relative">
            <input type="text" placeholder="Search..." className="input" />
            <span className="search-icon">
              <Image src={searchIcon} alt="search" />
            </span>
          </div>

          <div className="md:hidden">
            <Image src={HamburgerIcon} alt="menu" onClick={toggleMenu} />
          </div>
        </div>
      </nav>

      <Modal isOpen={isMenuOpen} onClose={toggleMenu}>
        <nav>
          <ul className="list-none flex flex-col items-center">
            <li className="my-2">
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li className="my-2">
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li className="my-2">
              <Link href="/gears" className="hover:underline">
                Gears
              </Link>
            </li>
            <li className="my-2">
              <Link href="/trips" className="hover:underline">
                Trips
              </Link>
            </li>
          </ul>
        </nav>
      </Modal>
    </header>
  )
}
