import { currentContextLocalAtom } from '@/atoms'
import * as commands from '@/commands'
import HashLoader from '@/components/Loaders/HashLoader'
import ServicesTab from '@/components/Services'
import { Service } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

const ServicesViewFeature = () => {
  const currContext = useAtomValue(currentContextLocalAtom)

  const query = useQuery({
    queryKey: ['services', currContext],
    queryFn: () => commands.kubeGetServices(),
    refetchInterval: 5000,
  })

  if (query.isLoading)
    return (
      <div className='flex h-full items-center justify-center'>
        <HashLoader />
      </div>
    )
  if (query.isError) return <span>Error...</span>

  const services: Service[] = []
  const serviceLines = query?.data?.split('\n')
  serviceLines?.forEach((line) => {
    const columns = line.split(/\s+/)
    if (columns.length === 6) {
      const service: Service = {
        name: columns[0],
        type: columns[1],
        clusterIP: columns[2],
        externalIP: columns[3],
        ports: columns[4],
        age: columns[5],
      }
      services.push(service)
    }
  })

  return <ServicesTab services={services} />
}

export default ServicesViewFeature
