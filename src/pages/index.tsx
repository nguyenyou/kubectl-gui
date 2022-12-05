import { currentContextAtom, currentWorkloadAtom, filterNameAtom, Workload } from '@/atoms'
import { getCurrentContext, kubeGetDeployments, kubeGetPods, kubeGetServices } from '@/commands'
import DeploymentsTab from '@/components/Deployments'
import HashLoader from '@/components/Loaders/HashLoader'
import PodsTab from '@/components/Pods'
import ServicesTab from '@/components/Services'
import { Deployment, Pod, Service } from '@/types'
import { XMarkIcon } from '@heroicons/react/24/outline'
import * as Tabs from '@radix-ui/react-tabs'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

function App() {
  const [filterName, setFilterName] = useAtom(filterNameAtom)
  const [currentWorkload, setCurrentWorkload] = useAtom(currentWorkloadAtom)
  const queryPods = useQuery({
    queryKey: ['pods'],
    queryFn: kubeGetPods,
    refetchInterval: 2000,
  })
  const queryServices = useQuery({
    queryKey: ['services'],
    queryFn: () => kubeGetServices(),
    refetchInterval: 5000,
  })
  const queryDeployments = useQuery({
    queryKey: ['deployments'],
    queryFn: () => kubeGetDeployments(),
    refetchInterval: 5000,
  })
  const queryCurrentContext = useQuery({
    queryKey: ['currentContext'],
    queryFn: () => getCurrentContext(),
    refetchInterval: 5000,
  })

  const handleRemoveSearch = () => {
    setFilterName('')
  }

  if (queryPods.isLoading || queryDeployments.isLoading || queryServices.isLoading) {
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        <HashLoader />
      </div>
    )
  }
  if (queryPods.isError || queryDeployments.isError || queryServices.isError) {
    return <div className='p-3'>Error</div>
  }

  const pods: Pod[] = []
  const podLines = queryPods.data.split('\n')
  podLines.forEach((line) => {
    const columns = line.split(/\s+/)
    if (columns.length === 5) {
      const pod: Pod = {
        name: columns[0],
        ready: columns[1],
        status: columns[2],
        restarts: columns[3],
        age: columns[4],
      }
      pods.push(pod)
    }
  })

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

  const handleChangeTab = (tab: string) => {
    setCurrentWorkload(tab as Workload)
  }

  return (
    <Tabs.Root
      value={currentWorkload}
      onValueChange={handleChangeTab}
      className='grid grid-cols-[1fr] pl-[130px] pt-[44px] text-sm'
    >
      <div className='fixed left-0 top-0 bottom-0 w-[130px] px-2 py-2 text-[13px]'>
        <div>
          <div className='mb-1 text-xs text-primary-400'>Context</div>
          <div className='px-1'>{queryCurrentContext?.data}</div>
        </div>
        <Tabs.List className='mt-4 flex flex-col items-start'>
          <div className='mb-1 text-xs text-primary-400'>Workloads</div>
          <Tabs.Trigger
            className='w-full flex-1 rounded py-1 px-1 text-left hover:bg-primary-700 data-[state=active]:bg-primary-700 data-[state=active]:text-gray-200'
            value='pods'
          >
            <div>Pods</div>
          </Tabs.Trigger>
          <Tabs.Trigger
            className='mt-1 w-full flex-1 rounded py-1 px-1 text-left hover:bg-primary-700 data-[state=active]:bg-primary-700 data-[state=active]:text-gray-200'
            value='deployments'
          >
            <div>Deployments</div>
          </Tabs.Trigger>
          <div className='mb-1 mt-4 text-xs text-primary-400'>Networking</div>
          <Tabs.Trigger
            className='w-full flex-1 rounded py-1 px-1 text-left hover:bg-primary-700 data-[state=active]:bg-primary-700 data-[state=active]:text-gray-200'
            value='services'
          >
            <div>Services</div>
          </Tabs.Trigger>
        </Tabs.List>
      </div>
      <div className=''>
        <div className='fixed left-[130px] right-0 top-0 h-[44px] bg-primary-900 px-3'>
          <div className='flex h-full items-center justify-between'>
            <div className='relative inline-block w-auto'>
              <input
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className='rounded border border-primary-700 bg-primary-900 py-1 pr-7 pl-2 text-primary-400 focus:border-primary-600 focus:outline-none'
                placeholder='Filter'
                autoCapitalize='off'
                autoCorrect='off'
                autoComplete='off'
              />
              {filterName && (
                <button
                  onClick={handleRemoveSearch}
                  className='absolute right-[8px] top-[6px] inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-primary-600 active:bg-primary-700'
                >
                  <XMarkIcon className='h-3 w-3' />
                </button>
              )}
            </div>
            <div>Total: {podLines.length} pods</div>
          </div>
        </div>
        <div className='px-3'>
          <Tabs.Content value='pods'>
            <PodsTab pods={pods} />
          </Tabs.Content>
          <Tabs.Content value='services'>
            <ServicesTab services={services} />
          </Tabs.Content>
          <Tabs.Content value='deployments'>
            <DeploymentsTab deployments={deployments} />
          </Tabs.Content>
        </div>
      </div>
    </Tabs.Root>
  )
}

export default App
