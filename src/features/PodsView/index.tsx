import * as apis from '@/apis'
import { currentContextLocalAtom, totalCountAtom } from '@/atoms'
import HashLoader from '@/components/Loaders/HashLoader'
import PodsTab from '@/components/Pods'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

const PodsViewFeature = () => {
  const currContext = useAtomValue(currentContextLocalAtom)
  const setTotalCount = useSetAtom(totalCountAtom)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pods', currContext],
    queryFn: apis.getPods,
    refetchInterval: 2000,
  })

  useEffect(() => {
    if (data) {
      setTotalCount(`${data.length} pods`)
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
    <PodsTab pods={data} />
  )
}

export default PodsViewFeature
