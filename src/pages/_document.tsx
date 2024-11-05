// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Додаємо посилання на favicon */}
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          {/* Сюди також можна додавати інші глобальні мета-теги або посилання на шрифти */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
