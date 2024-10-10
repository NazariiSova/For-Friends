'use client'
import React, { useState } from 'react'
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
      <nav className="mt-3 mb-8">
        <div className="box justify-around w-screen">
          <h1 className="box text-xl font-bold font-roman">
            {' '}
            <a href="/">For Friends</a>
          </h1>

          <ul className="list-none justify-between w-1/4 box hamburger-menu">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/gears" className="hover:underline">
                Gears
              </a>
            </li>
            <li>
              <a href="/trips" className="hover:underline">
                Trips
              </a>
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
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li className="my-2">
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li className="my-2">
              <a href="/gears" className="hover:underline">
                Gears
              </a>
            </li>
            <li className="my-2">
              <a href="/trips" className="hover:underline">
                Trips
              </a>
            </li>
          </ul>
        </nav>
      </Modal>
    </header>
  )
}
