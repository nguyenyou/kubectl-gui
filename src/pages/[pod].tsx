import { kubeDescribePods, kubeGetLogs, kubeGetPodYaml } from '@/commands'
import ErrorBoundary from '@/components/ErrorBoundary'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Editor from '@monaco-editor/react'
import * as Tabs from '@radix-ui/react-tabs'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

type TabValue = 'Describe' | 'YAML' | 'Logs'

const PodPage = () => {
  const [currentTab, setCurrentTab] = useState<TabValue>('Describe')

  const router = useRouter()
  const { pod } = router.query
  const { data: describeData } = useQuery({
    queryKey: ['describe', pod],
    queryFn: () => kubeDescribePods(pod as string),
    refetchInterval: 2000,
  })
  const { data: yamlData } = useQuery({
    queryKey: ['yaml', pod],
    queryFn: () => kubeGetPodYaml(pod as string),
    refetchInterval: 2000,
  })
  const { data: logsData } = useQuery({
    queryKey: ['logs', pod],
    queryFn: () => kubeGetLogs(pod as string),
    refetchInterval: 2000,
  })

  const handleChangeTab = (tab: string) => {
    setCurrentTab(tab as TabValue)
  }

  return (
    <div className='text-sm'>
      <div className='px-3 pt-3'>
        <Link href='/'>
          <button className='inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-primary-700'>
            <ArrowLeftIcon className='h-6 w-6' />
          </button>
        </Link>
      </div>
      <Tabs.Root className='flex h-screen w-screen flex-col' value={currentTab} onValueChange={handleChangeTab}>
        <div className='flex justify-between p-3'>
          <Tabs.List className='inline-flex w-auto overflow-hidden rounded-lg bg-primary-800 text-gray-400'>
            <Tabs.Trigger
              className='inline-flex items-center  bg-primary-800 px-4 py-2 data-[state=active]:bg-primary-700 data-[state=active]:text-gray-200'
              value='Describe'
            >
              <div>Describe</div>
            </Tabs.Trigger>
            <Tabs.Trigger
              className='inline-flex items-center  bg-primary-800 px-4 py-2 data-[state=active]:bg-primary-700 data-[state=active]:text-gray-200'
              value='YAML'
            >
              <div>YAML</div>
            </Tabs.Trigger>
            <Tabs.Trigger
              className='inline-flex items-center  bg-primary-800 px-4 py-2 data-[state=active]:bg-primary-700 data-[state=active]:text-gray-200'
              value='Logs'
            >
              <div>Logs</div>
            </Tabs.Trigger>
          </Tabs.List>
        </div>
        <Tabs.Content className='flex-1' value='Describe'>
          <div className='flex h-full flex-col'>
            <div className='flex-1'>
              <ErrorBoundary>
                <Editor
                  height='100%'
                  language='yaml'
                  theme='vs-dark'
                  options={{
                    readOnly: true,
                  }}
                  value={describeData ?? 'Loading...'}
                />
              </ErrorBoundary>
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content className='flex-1' value='YAML'>
          <div className='flex h-full flex-col'>
            <div className='flex-1'>
              <ErrorBoundary>
                <Editor
                  height='100%'
                  language='yaml'
                  theme='vs-dark'
                  options={{
                    readOnly: true,
                  }}
                  value={yamlData ?? 'Loading...'}
                />
              </ErrorBoundary>
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content className='flex-1' value='Logs'>
          <div className='flex h-full flex-col'>
            <div className='flex-1'>
              <ErrorBoundary>
                <Editor
                  height='100%'
                  language='json'
                  theme='vs-dark'
                  options={{
                    readOnly: true,
                  }}
                  value={logsData ?? 'Loading...'}
                />
              </ErrorBoundary>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

export default PodPage
