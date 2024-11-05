'use client'
import React, { useEffect } from 'react'
import { useStore } from '../store/useStore'
import CardList from '../components/CardList'
import Link from 'next/link'
import styles from '../styles/home.module.scss'

const Home: React.FC = () => {
  const { gearCards, tripCards, loadCards } = useStore()

  useEffect(() => {
    loadCards()
  }, [loadCards])

  return (
    <>
      <section className={styles.aboutSection}>
        <h2 className={styles.sectionTitle}>Про цей сайт :</h2>
        <p className={styles.sectionText}>
          Тут ви зможете дізнатися про мене, мої погляди на туризм та багато іншого...
        </p>
        <Link href="/about" className={styles.readMoreLink}>Читати більше</Link>
      </section>

      <section className={styles.cardsSection}>
        <h2 className={styles.sectionTitle}>Спорядження</h2>
        <CardList cards={gearCards.slice(0, 8)} />
        <Link href="/gears" className={styles.seeMoreLink}>Переглянути усі</Link>
      </section>

      <section className={styles.cardsSection}>
        <h2 className={styles.sectionTitle}>Мандрівки</h2>
        <CardList cards={tripCards.slice(0, 8)} />
        <Link href="/trips" className={styles.seeMoreLink}>Переглянути усі</Link>
      </section>
    </>
  )
}

export default Home
