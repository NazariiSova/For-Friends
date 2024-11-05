// pages/_app.tsx
import type { AppProps } from 'next/app';
import Layout from '../components/Layout'; 
import '../styles/global.scss';
import '../styles/card.module.scss';
import '../styles/cardList.module.scss';
import '../styles/header.module.scss';
import '../styles/home.module.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
