import React from 'react'
import * as commands from '@/commands'
import { currentContextLocalAtom } from '@/atoms'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { useAtom, useAtomValue } from 'jotai'
import { Context } from '@/types'

const SwitchContextFeature = () => {
  const [currContext, setCurrContext] = useAtom(currentContextLocalAtom)

  const queryContexts = useQuery({
    queryKey: ['contexts'],
    queryFn: () => commands.kubeGetContexts(),
  })

  if (queryContexts.isLoading) return <span />
  if (queryContexts.isError) return <span />

  const contexts: Context[] = []
  const contextLines = queryContexts?.data?.split('\n')
  contextLines?.forEach((line) => {
    const columns = line.split(/\s+/)
    if (columns.length === 5) {
      const context: Context = {
        current: columns[0],
        name: columns[1],
        cluster: columns[2],
        authInfo: columns[3],
        namespace: columns[4],
      }
      contexts.push(context)
    }
  })

  const handleSwitchContext = async (context: string) => {
    try {
      setCurrContext(context)
      await commands.kubeSwitchContext(context)
    } catch {
      // do nothing
    }
  }

  return (
    <div className='flex h-full flex-col border-r border-primary-800'>
      {contexts.slice(1).map((context) => (
        <div
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
