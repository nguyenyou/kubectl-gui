import { currentContextLocalAtom } from '@/atoms'
import * as commands from '@/commands'
import DeploymentsTab from '@/components/Deployments'
import HashLoader from '@/components/Loaders/HashLoader'
import { Deployment } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

const DeploymentsViewFeature = () => {
  const currContext = useAtomValue(currentContextLocalAtom)

  const query = useQuery({
    queryKey: ['deployments', currContext],
    queryFn: () => commands.kubeGetDeployments(),
    refetchInterval: 5000,
  })

  if (query.isLoading)
    return (
      <div className='flex h-full items-center justify-center'>
        <HashLoader />
      </div>
    )

  if (query.isError) return <span>Error...</span>

  const deployments: Deployment[] = []
  const deploymentLines = query?.data?.split('\n')
  deploymentLines?.forEach((line) => {
    const columns = line.split(/\s+/)
    if (columns.length === 5) {
      const deployment: Deployment = {
        name: columns[0],
        ready: columns[1],
        upToDate: columns[2],
        available: columns[3],
        age: columns[4],
      }
      deployments.push(deployment)
    }
  })

  return <DeploymentsTab deployments={deployments} />
}

export default DeploymentsViewFeature
