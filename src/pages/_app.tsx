import { font } from '@/config/font'
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
       <style global jsx>{`
        html {
          font-family: ${font.style.fontFamily};
        }
        code,
        kbd,
        samp,
        pre {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <Toaster position='top-right' />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
