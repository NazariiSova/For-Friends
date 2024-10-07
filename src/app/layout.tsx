import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div id="modal-root"></div>
      <main>{children}</main>
      <Footer />
    </>
  );
}
