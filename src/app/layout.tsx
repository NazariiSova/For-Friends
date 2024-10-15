'use client'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <Header />
      <body>
        <div id="modal-root"></div>
        <main>{children}</main>
      </body>
      <Footer />

    </html>
  )
}
