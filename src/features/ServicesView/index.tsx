import * as apis from '@/apis'
import { currentContextLocalAtom } from '@/atoms'
import HashLoader from '@/components/Loaders/HashLoader'
import ServicesTab from '@/components/Services'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

const ServicesViewFeature = () => {
  const currContext = useAtomValue(currentContextLocalAtom)

  const query = useQuery({
    queryKey: ['services', currContext],
    queryFn: () => apis.getServices(),
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
      <ServicesTab services={query.data} />
    </div>
  )
}

export default ServicesViewFeature
