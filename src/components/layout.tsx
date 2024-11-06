'use client'

import Header from './Header'
import Footer from './Footer'
import Head from 'next/head'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Сайт створено Назаром Совою для друзів та однодумців. Тут ви знайдете інформацію про туризм, спорядження та мандрівки."
        />
        <meta
          name="keywords"
          content="For Friends, туризм, спорядження, мандрівки, Назар Сова"
        />
        <title>For Friends</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>{children}</main>

      <Footer />
    </>
  )
}
