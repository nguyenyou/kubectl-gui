import * as apis from '@/apis'
import { currentContextLocalAtom } from '@/atoms'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useAtom } from 'jotai'

const SwitchContextFeature = () => {
  const [currContext, setCurrContext] = useAtom(currentContextLocalAtom)

  const { isError, isLoading, data } = useQuery({
    queryKey: ['contexts'],
    queryFn: () => apis.getContexts(),
  })

  if (isLoading) return <span />
  if (isError) return <span />

  const handleSwitchContext = async (context: string) => {
    try {
      setCurrContext(context)
      await apis.switchContext(context)
    } catch {
      // do nothing
    }
  }

  return (
    <div className='flex h-full flex-col border-r border-primary-800'>
      {data.slice(1).map((context, idx) => (
        <div
          key={idx}
          className={clsx(
            currContext === context.name && 'bg-primary-700',
            'flex flex-1 rotate-180 cursor-pointer select-none items-center justify-center truncate whitespace-nowrap py-2 hover:bg-primary-600'
          )}
          style={{ writingMode: 'vertical-rl' }}
          onClick={() => handleSwitchContext(context.name)}
        >
          {context.name}
        </div>
      ))}
    </div>
  )
}

export default SwitchContextFeature
