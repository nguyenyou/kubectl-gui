import { currentContextLocalAtom } from '@/atoms'
import { useAtomValue } from 'jotai'
import React from 'react'
import * as commands from '@/commands'
import { useQuery } from '@tanstack/react-query'
import { Service } from '@/types'
import ServicesTab from '@/components/Services'

const ServicesViewFeature = () => {
  const currContext = useAtomValue(currentContextLocalAtom)

  const queryServices = useQuery({
    queryKey: ['services', currContext],
    queryFn: () => commands.kubeGetServices(),
    refetchInterval: 5000,
  })

  if (queryServices.isLoading) return <span>Loading...</span>
  if (queryServices.isError) return <span>Error...</span>

  const services: Service[] = []
  const serviceLines = queryServices?.data?.split('\n')
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
