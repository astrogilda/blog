// src/pages/_app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { FC, ReactNode, useEffect, useState } from 'react'

const Noop: FC<{ children: ReactNode }> = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const [Provider, setProvider] = useState<typeof Noop>(() => Noop)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('tinacms/dist/react')
        .then((mod) => {
          if (mod.TinaProvider) {
            // ✔ only update state when TinaProvider is actually present
            setProvider(() => mod.TinaProvider as unknown as typeof Noop)
          } else {
            console.warn('tinacms/dist/react loaded, but TinaProvider undefined')
          }
        })
        .catch((e) =>
          console.warn('Failed to load TinaProvider – running without CMS', e),
        )
    }
  }, [])

  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
