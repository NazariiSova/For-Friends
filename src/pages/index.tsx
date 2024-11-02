import Head from 'next/head'
import React, { useEffect } from 'react'
import { useStore } from '../store/useStore'
import CardList from '../components/CardList'
import Layout from '@/app/layout'
import Link from 'next/link'
import '../styles/home.scss'

const Home : React.FC = () => {
const { gearCards, tripCards, loadCards } = useStore()
  useEffect(() => {
    loadCards()
  }, [loadCards])

  return (
    <>
    <Head>
      <title>For Friends - Туризм, Спорядження, Мандрівки | Назар Сова</title>
      <meta
        name="description"
        content="Сайт For Friends від Назара Сови про туризм, мандрівки та спорядження. Запрошення для друзів та однодумців."
      />
      <meta
        name="keywords"
        content="туризм, спорядження, мандрівки, Назар Сова, For Friends"
      />
    </Head>
    <script type="application/ld+json">
      {`
        {
          "@context": "http://schema.org",
          "@type": "Website",
          "name": "For Friends",
          "url": "https://yourwebsite.com",
          "author": {
            "@type": "Person",
            "name": "Назар Сова"
          },
          "description": "Сайт про туризм, спорядження та мандрівки від Назара Сови для друзів і однодумців."
        }
      `}
    </script>
      <Layout>
        <section className="about-section">
          <h2 className="section-title">Про цей сайт :</h2>
          <p className="section-text">
            Тут ви зможете дізнатися про мене, мої погляди на туризм та багато
            іншого...
          </p>
          <Link href="/about" className="read-more-link">
            Читати більше
          </Link>
        </section>

        <section className="cards-section">
          <h2 className="section-title">Спорядження</h2>
          <CardList cards={gearCards.slice(0, 8)} />
          <Link href="/gears" className="see-more-link">
            Переглянути усі
          </Link>
        </section>

        <section className="cards-section">
          <h2 className="section-title">Мандрівки</h2>
          <CardList cards={tripCards.slice(0, 8)} />
          <Link href="/trips" className="see-more-link">
            Переглянути усі
          </Link>
        </section>
      </Layout>
    </>
  )
}

export default Home
