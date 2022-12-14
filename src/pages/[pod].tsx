import * as apis from '@/apis'
import ErrorBoundary from '@/components/ErrorBoundary'
import { Spinner } from '@/components/Spinner'
import StdoutView from '@/components/StdoutView'
import { toastStyle } from '@/config'
import LogStream from '@/modules/LogStream'
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import * as Tabs from '@radix-ui/react-tabs'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'

type TabValue = 'Describe' | 'YAML' | 'Logs'

const PodPage = () => {
  const [currentTab, setCurrentTab] = useState<TabValue>('Describe')
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const { pod } = router.query
  const { data: describeData } = useQuery({
    queryKey: ['describe', pod],
    queryFn: () => apis.describePod(pod as string),
    refetchInterval: 2000,
  })
  const { data: yamlData } = useQuery({
    queryKey: ['yaml', pod],
    queryFn: () => apis.getPodYaml(pod as string),
    refetchInterval: 2000,
  })

  const handleChangeTab = (tab: string) => {
    setCurrentTab(tab as TabValue)
  }

  const handleDeletePod = async () => {
    try {
      setIsDeleting(true)
      const res = await apis.deletePod(pod as string)
      toast.success(res, {
        style: toastStyle,
      })
      router.push('/')
    } catch (error) {
      toast.error('Something went wrong', {
        style: toastStyle,
      })
    }
  }

  return (
    <div className='text-sm'>
      <div className='px-3 pt-3'>
        <Link href='/'>
          <button className='inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-primary-700 active:bg-primary-800 active:text-primary-700'>
            <ArrowLeftIcon className='h-6 w-6' />
          </button>
        </Link>
      </div>
      <Tabs.Root className='flex h-screen w-screen flex-col' value={currentTab} onValueChange={handleChangeTab}>
        <div className='flex items-center justify-between p-3'>
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
          <div>
            <button
              disabled={isDeleting}
              onClick={handleDeletePod}
              className='inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-primary-700 active:bg-primary-800 active:text-primary-700 disabled:cursor-not-allowed'
            >
              {isDeleting ? <Spinner /> : <TrashIcon className='h-6 w-6' />}
            </button>
          </div>
        </div>
        <Tabs.Content className='flex-1' value='Describe'>
          <div className='flex h-full flex-col'>
            <div className='flex-1'>
              <ErrorBoundary>
                <StdoutView mode='vscode' codetext={describeData ?? 'Loading...'} />
              </ErrorBoundary>
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content className='flex-1' value='YAML'>
          <div className='flex h-full flex-col'>
            <div className='flex-1'>
              <ErrorBoundary>
                <StdoutView mode='vscode' codetext={yamlData ?? 'Loading...'} />
              </ErrorBoundary>
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content className='flex-1' value='Logs'>
          <div className='flex h-full flex-col'>
            <div className='flex-1'>
              <ErrorBoundary>
                <LogStream pod={pod as string}/>
              </ErrorBoundary>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

PodPage.getLayout = (page) => <>{page}</>

export default PodPage
