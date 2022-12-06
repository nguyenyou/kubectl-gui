import * as apis from '@/apis'
import { currentContextLocalAtom } from '@/atoms'
import DeploymentsTab from '@/components/Deployments'
import HashLoader from '@/components/Loaders/HashLoader'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

const DeploymentsViewFeature = () => {
  const currContext = useAtomValue(currentContextLocalAtom)

  const query = useQuery({
    queryKey: ['deployments', currContext],
    queryFn: () => apis.getDeployments(),
    refetchInterval: 5000,
  })

  if (query.isLoading)
    return (
      <div className='flex h-full items-center justify-center'>
        <HashLoader />
      </div>
    )

  if (query.isError) return <span>Error...</span>

  return (
    <div>
      <div>Total: {query.data.length}</div>
      <DeploymentsTab deployments={query.data} />
    </div>
  )
}

export default DeploymentsViewFeature
