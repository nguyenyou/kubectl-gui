import { currentContextLocalAtom } from '@/atoms'
import * as apis from '@/apis'
import ActiveLink from '@/components/ActiveLink'
import SwitchContext from '@/features/SwitchContext'
import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

const Sidebar = () => {
  const setCurrContext = useSetAtom(currentContextLocalAtom)

  const queryCurrentContext = useQuery({
    queryKey: ['currentContext'],
    queryFn: () => apis.getCurrentContext(),
    refetchInterval: 5000,
  })

  let currentContext = queryCurrentContext?.data ?? ''

  useEffect(() => {
    setCurrContext(currentContext)
  }, [currentContext])

  return (
    <div className='fixed left-0 top-0 bottom-0 grid w-[160px] grid-cols-[30px_1fr] pr-2 text-[13px]'>
      <SwitchContext />
      <div className='py-2 pl-2'>
        <div>
          <div className='mb-1 text-xs text-primary-400'>Context</div>
          <div className='px-1'>{queryCurrentContext?.data}</div>
        </div>
        <div className='mt-4 flex flex-col items-start'>
          <div className='mb-1 text-xs text-primary-400'>Workloads</div>
          <ActiveLink
            activeClassName='bg-primary-700 text-gray-200'
            href='/'
            className='w-full flex-1 rounded py-1 px-1 text-left hover:bg-primary-700'
          >
            <div>Pods</div>
          </ActiveLink>
          <ActiveLink
            activeClassName='bg-primary-700 text-gray-200'
            href='/deployments'
            className='mt-1 w-full flex-1 rounded py-1 px-1 text-left hover:bg-primary-700'
          >
            <div>Deployments</div>
          </ActiveLink>
          <div className='mb-1 mt-4 text-xs text-primary-400'>Networking</div>
          <ActiveLink
            activeClassName='bg-primary-700 text-gray-200'
            href='/services'
            className='w-full flex-1 rounded py-1 px-1 text-left hover:bg-primary-700'
          >
            <div>Services</div>
          </ActiveLink>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
