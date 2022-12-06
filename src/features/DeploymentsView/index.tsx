import * as apis from '@/apis'
import { currentContextLocalAtom, totalCountAtom } from '@/atoms'
import DeploymentsTab from '@/components/Deployments'
import HashLoader from '@/components/Loaders/HashLoader'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

const DeploymentsViewFeature = () => {
  const currContext = useAtomValue(currentContextLocalAtom)
  const setTotalCount = useSetAtom(totalCountAtom)

  const { isLoading, isError, data } = useQuery({
    queryKey: ['deployments', currContext],
    queryFn: () => apis.getDeployments(),
    refetchInterval: 5000,
  })

  useEffect(() => {
    if (data) {
      setTotalCount(`${data.length} deployments`)
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
    <DeploymentsTab deployments={data} />
  )
}

export default DeploymentsViewFeature
