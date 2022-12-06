import * as apis from '@/apis'
import { currentContextLocalAtom } from '@/atoms'
import HashLoader from '@/components/Loaders/HashLoader'
import PodsTab from '@/components/Pods'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

const PodsViewFeature = () => {
  const currContext = useAtomValue(currentContextLocalAtom)

  const query = useQuery({
    queryKey: ['pods', currContext],
    queryFn: apis.getPods,
    refetchInterval: 2000,
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
      <PodsTab pods={query.data} />
    </div>
  )
}

export default PodsViewFeature
