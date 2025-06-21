// // src/pages/_app.tsx
// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'
// import dynamic from 'next/dynamic'

// /**
//  * Tina helpers live in `tinacms/dist/react` from v2 onward.
//  * The dynamic import keeps Tina out of the server bundle.
//  */
// const TinaEditProvider = dynamic(
//   () => import('tinacms/dist/react').then((m) => m.TinaEditProvider),
//   { ssr: false }
// )
// const TinaCMS = dynamic(() => import('tinacms').then((m) => m.TinaCMS), {
//   ssr: false,
// })

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <TinaEditProvider
//       /**
//        * When someone clicks “Edit”, TinaEditProvider swaps
//        * in the CMS below; otherwise it just renders children.
//        */
//       editMode={
//         <TinaCMS {...pageProps}>
//           <Component {...pageProps} />
//         </TinaCMS>
//       }
//     >
//       {/* Normal view-mode render */}
//       <Component {...pageProps} />
//     </TinaEditProvider>
//   )
// }


import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
