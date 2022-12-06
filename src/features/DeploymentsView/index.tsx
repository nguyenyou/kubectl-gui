import { currentContextLocalAtom } from '@/atoms'
import { useAtomValue } from 'jotai'
import React from 'react'
import * as commands from '@/commands'
import { useQuery } from '@tanstack/react-query'
import { Deployment } from '@/types'
import DeploymentsTab from '@/components/Deployments'

const DeploymentsViewFeature = () => {
  const currContext = useAtomValue(currentContextLocalAtom)

  const queryDeployments = useQuery({
    queryKey: ['deployments', currContext],
    queryFn: () => commands.kubeGetDeployments(),
    refetchInterval: 5000,
  })

  if (queryDeployments.isLoading) return <span>Loading...</span>
  if (queryDeployments.isError) return <span>Error...</span>

  const deployments: Deployment[] = []
  const deploymentLines = queryDeployments?.data?.split('\n')
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

  return (
    <DeploymentsTab deployments={deployments} />
  )
}

export default DeploymentsViewFeature