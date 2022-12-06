import * as apis from '@/apis'
import { currentContextLocalAtom, totalCountAtom } from '@/atoms'
import HashLoader from '@/components/Loaders/HashLoader'
import ServicesTab from '@/components/Services'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

const ServicesViewFeature = () => {
  const currContext = useAtomValue(currentContextLocalAtom)
  const setTotalCount = useSetAtom(totalCountAtom)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['services', currContext],
    queryFn: () => apis.getServices(),
    refetchInterval: 5000,
  })

  useEffect(() => {
    if (data) {
      setTotalCount(`${data.length} services`)
    }
  }, [data, setTotalCount])

  if (isLoading)
    return (
      <div className='flex h-full items-center justify-center'>
        <HashLoader />
      </div>
    )
  if (isError) return <span>Error...</span>

  return (
    <ServicesTab services={data} />
  )
}

export default ServicesViewFeature
