import StdoutView from '@/components/StdoutView'
import { memo } from 'react'

type Props = {
  logsStream: string
}

const LogsStream = ({ logsStream }: Props) => {
  return (
    <StdoutView mode='vscode' codetext={logsStream ?? ''} />
  )
}

export default memo(LogsStream)
