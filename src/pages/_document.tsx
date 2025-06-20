// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        {/* Prism — Tomorrow Night theme */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css"
        />
      </Head>
      <body className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
