// import '@/styles/globals.css';
// import type { AppProps } from 'next/app';
// import type { FC, ReactNode } from 'react';
// import { useState, useEffect } from 'react';

// /** A no-op provider for prod/CI */
// const Noop: FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;

// export default function MyApp({ Component, pageProps }: AppProps) {
//   // Start with the No-op provider
//   const [Provider, setProvider] = useState<FC<{ children: ReactNode }>>(Noop);

//   useEffect(() => {
//     if (process.env.NODE_ENV === 'development') {
//       // Tina is only in devDependencies – dynamically load it in dev
//       import('tinacms/dist/edit-state').then(({ TinaEditProvider }) => {
//         // Cast so the signature matches Noop ➜ type-safe
//         setProvider(() => TinaEditProvider as unknown as typeof Noop);
//       });
//     }
//   }, []);

//   return (
//     <Provider>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }

// src/pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

/** Minimal custom App – no Tina during build */
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
