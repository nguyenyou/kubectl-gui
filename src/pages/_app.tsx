import useProgressBar from '@/components/ProgressBar'
import { queryClient } from '@/config/config'
import { font } from '@/config/font'
import MainLayout from '@/layouts/MainLayout'
import '@/styles/globals.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageProps: any) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const defaultGetLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? defaultGetLayout
  useProgressBar()
  const page = <Component {...pageProps} />

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
      {getLayout(page, pageProps)}
      <Toaster position='top-right' />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
