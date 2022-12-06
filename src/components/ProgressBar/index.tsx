// @ts-nocheck
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ProgressBar from './ProgressBar'

export const progress = new ProgressBar()

const useProgressBar = () => {
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => {
      progress.start()
    }

    const handleStop = () => {
      progress.finish()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
}

export default useProgressBar
