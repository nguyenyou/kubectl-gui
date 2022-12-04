import { currentContextAtom, currentWorkloadAtom, filterNameAtom, Workload } from '@/atoms'
import { getCurrentContext, kubeGetDeployments, kubeGetPods, kubeGetServices } from '@/commands'
import DeploymentItems from '@/components/DeploymentItems'
import PodItems from '@/components/PodItems'
import ServiceItems from '@/components/ServiceItems'
import { Deployment, Pod, Service } from '@/types'
import * as Tabs from '@radix-ui/react-tabs'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

function App() {
  const [filterName, setFilterPods] = useAtom(filterNameAtom)
  const [currentContext, setCurrentContext] = useAtom(currentContextAtom)
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

  useEffect(() => {
    getCurrentContext().then((context) => {
      setCurrentContext(context)
    })
  }, [])

  if (queryPods.isLoading || queryDeployments.isLoading || queryServices.isLoading) {
    return <div className='p-3'>Loading...</div>
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
  const podHeaders = pods[0]
  const podRows = pods.slice(1)

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
  const serviceHeaders = services[0]
  const serviceRows = services.slice(1)

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
  const deploymentHeaders = deployments[0]
  const deploymentRows = deployments.slice(1)

  const handleChangeTab = (tab: string) => {
    setCurrentWorkload(tab as Workload)
  }

  return (
    <Tabs.Root value={currentWorkload} onValueChange={handleChangeTab} className='grid grid-cols-[130px_1fr] text-sm'>
      <div className='px-2 py-2 text-[13px]'>
        <div>
          <div className='mb-1 text-xs text-primary-400'>Context</div>
          <div className='px-1'>{currentContext}</div>
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
      <div className='px-3 py-2'>
        <div className='flex items-center justify-between'>
          <input
            value={filterName}
            onChange={(e) => setFilterPods(e.target.value)}
            className='rounded border border-primary-700 bg-primary-900 px-2 py-1 text-primary-400 focus:border-primary-600 focus:outline-none'
            placeholder='Filter'
            autoCapitalize='off'
            autoCorrect='off'
            autoComplete='off'
          />
          <div>Total: {podLines.length} pods</div>
        </div>
        <div className='mt-2'>
          <Tabs.Content value='pods'>
            <table className='w-full'>
              <thead>
                <tr>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {podHeaders.name}
                  </th>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {podHeaders.ready}
                  </th>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {podHeaders.status}
                  </th>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {podHeaders.restarts}
                  </th>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {podHeaders.age}
                  </th>
                </tr>
              </thead>
              <PodItems pods={podRows} />
            </table>
          </Tabs.Content>
          <Tabs.Content value='services'>
            <table className='w-full'>
              <thead>
                <tr>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {serviceHeaders.name}
                  </th>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {serviceHeaders.type}
                  </th>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {serviceHeaders.clusterIP}
                  </th>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {serviceHeaders.externalIP}
                  </th>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {serviceHeaders.ports}
                  </th>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {serviceHeaders.age}
                  </th>
                </tr>
              </thead>
              <ServiceItems services={serviceRows} />
            </table>
          </Tabs.Content>
          <Tabs.Content value='deployments'>
            <table className='w-full'>
              <thead>
                <tr>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {deploymentHeaders.name}
                  </th>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {deploymentHeaders.ready}
                  </th>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {deploymentHeaders.upToDate}
                  </th>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {deploymentHeaders.available}
                  </th>
                  <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
                    {deploymentHeaders.age}
                  </th>
                </tr>
              </thead>
              <DeploymentItems deployments={deploymentRows} />
            </table>
          </Tabs.Content>
        </div>
      </div>
    </Tabs.Root>
  )
}

export default App
