import ErrorBoundary from '@/components/ErrorBoundary'
import { Command } from '@tauri-apps/api/shell'
import { useEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { useLogsStore } from './store'

type Props = {
  pod: string
}

let messages = []
let child = null

const append = useLogsStore.getState().appendLog

const onMessage = (value) => {
  // console.log('on message')
  const newMessage = typeof value === 'string' ? value : JSON.stringify(value)
  append(newMessage)
  messages.unshift(newMessage)
  // console.log(messages.length, 'messages.current length')
}

const spawn = (pod: string) => {
  // console.log('start stream');
  
  child = null
  const command = new Command('kubectl', ['logs', pod, '--follow', '--tail', '5'])
  command.on('close', (data) => {
    onMessage(`command finished with code ${data.code} and signal ${data.signal}`)
    child = null
  })
  command.on('error', (error) => onMessage(`${error}`))
  command.stdout.on('data', (line) => onMessage(`${line}`))
  command.stderr.on('data', (line) => onMessage(`${line}`))
  command
    .spawn()
    .then((c) => {
      child = c
    })
    .catch(onMessage)
}

const LogStreamModule = ({ pod }: Props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [showLines, setShowLines] = useState(false)
  const logs = useLogsStore((state) => state.logs)
  const clearLogs = useLogsStore(state => state.clearLogs)

  useEffect(() => {
    return () => {
      messages = []
      clearLogs()
      if (child) {
        try {
          child?.kill?.()
        } catch {
          // do nothing
        }
      }
    }
  }, [clearLogs])

  const kill = async () => {
    if (child) {
      try {
        await child?.kill?.()
      } catch {
        // do nothing
      }
    }
  }
  const handleStartStreaming = () => {
    spawn(pod)
  }
  const handleStopStreaming = async () => {
    await kill()
  }

  const handleClearLogs = () => {
    messages = []
    clearLogs()
  }

  let filteredLogs = logs.filter((log) => log.includes(filterTerm))

  if(showLines) {
    filteredLogs = filteredLogs.map((log, index) => {
      return `[${index + 1}]: ${log}`
    })
  }

  return (
    <>
      <div className='mb-3 flex justify-between gap-2 px-3 items-center'>
        <div className='flex gap-2'>
          <button
            className='rounded border border-primary-700 px-4 py-2 hover:border-primary-400 hover:text-primary-200 active:bg-primary-600'
            onClick={handleStartStreaming}
          >
            Start streaming logs
          </button>
          <button
            className='rounded border border-primary-700 px-4 py-2 hover:border-primary-400 hover:text-primary-200 active:bg-primary-600'
            onClick={handleStopStreaming}
          >
            Stop streaming
          </button>
          <button
            className='rounded border border-primary-700 px-4 py-2 hover:border-primary-400 hover:text-primary-200 active:bg-primary-600'
            onClick={handleClearLogs}
          >
            Clear logs
          </button>
          <button
            className='rounded border border-primary-700 px-4 py-2 hover:border-primary-400 hover:text-primary-200 active:bg-primary-600'
            onClick={() => setShowLines(!showLines)}
          >
            Line numbers
          </button>
          <input
            className='rounded bg-primary-800 px-2 focus:border-primary-400 focus:outline-none'
            placeholder='Search logs'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoCapitalize='off'
            autoComplete='off'
            autoCorrect='off'
          />
          <input
            className='rounded bg-primary-800 px-2 focus:border-primary-400 focus:outline-none'
            placeholder='Filter logs'
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            autoCapitalize='off'
            autoComplete='off'
            autoCorrect='off'
          />
        </div>
        <div>Total streamed lines: {logs.length}</div>
      </div>
      <ErrorBoundary>
        <div className='h-[616px] rounded overflow-auto px-3 py-1 border mx-3 border-primary-700'>
          <Highlighter
            className='whitespace-pre-wrap'
            highlightClassName='text-black bg-amber-400'
            searchWords={[searchTerm]}
            autoEscape={true}
            textToHighlight={filteredLogs.join('\n')}
          />
        </div>
      </ErrorBoundary>
    </>
  )
}

export default LogStreamModule
