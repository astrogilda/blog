import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { TinaEditProvider, useTina } from 'tinacms/dist/edit-state';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TinaEditProvider editMode="<YOUR_DOMAIN>/admin">
      <Component {...pageProps} />
    </TinaEditProvider>
  );
}
