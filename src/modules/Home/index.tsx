import { currentContextLocalAtom, currentWorkloadAtom, filterNameAtom, Workload } from '@/atoms'
import {
  getCurrentContext
} from '@/commands'
import DeploymentsViewFeature from '@/features/DeploymentsView'
import PodsViewFeature from '@/features/PodsView'
import ServicesViewFeature from '@/features/ServicesView'
import SwitchContext from '@/features/SwitchContext'
import { XMarkIcon } from '@heroicons/react/24/outline'
import * as Tabs from '@radix-ui/react-tabs'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

function HomeModule() {
  const [filterName, setFilterName] = useAtom(filterNameAtom)
  const [currentWorkload, setCurrentWorkload] = useAtom(currentWorkloadAtom)
  const [currContext, setCurrContext] = useAtom(currentContextLocalAtom)

  const queryCurrentContext = useQuery({
    queryKey: ['currentContext'],
    queryFn: () => getCurrentContext(),
    refetchInterval: 5000,
  })
  let currentContext = queryCurrentContext?.data ?? ''


  useEffect(() => {
    setCurrContext(currentContext)
  }, [currentContext])

  const handleRemoveSearch = () => {
    setFilterName('')
  }

  const handleChangeTab = (tab: string) => {
    setCurrentWorkload(tab as Workload)
  }

  return (
    <Tabs.Root
      value={currentWorkload}
      onValueChange={handleChangeTab}
      className='grid grid-cols-[1fr] pl-[160px] pt-[44px] text-sm'
    >
      <div className='fixed left-0 top-0 bottom-0 grid w-[160px] grid-cols-[30px_1fr] pr-2 text-[13px]'>
        <SwitchContext />
        <div className='py-2 pl-2'>
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
      </div>
      <div className=''>
        <div className='fixed left-[160px] right-0 top-0 h-[44px] bg-primary-900 px-3'>
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
          </div>
        </div>
        <div className='px-3'>
          <Tabs.Content value='pods'>
            <PodsViewFeature />
          </Tabs.Content>
          <Tabs.Content value='services'>
            <ServicesViewFeature />
          </Tabs.Content>
          <Tabs.Content value='deployments'>
            <DeploymentsViewFeature />
          </Tabs.Content>
        </div>
      </div>
    </Tabs.Root>
  )
}

export default HomeModule
