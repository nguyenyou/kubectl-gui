import { Pod } from '@/types'
import PodItems from './PodItems'

type Props = {
  pods: Pod[]
}

const PodsTab = ({ pods }: Props) => {
  if (!Array.isArray(pods) || pods.length === 0) return

  const podHeaders = pods[0]
  const podRows = pods.slice(1)

  return (
    <table className='w-full'>
      <thead>
        <tr>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>{podHeaders.name}</th>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>{podHeaders.ready}</th>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>{podHeaders.status}</th>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>{podHeaders.restarts}</th>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>{podHeaders.age}</th>
        </tr>
      </thead>
      <PodItems pods={podRows} />
    </table>
  )
}

export default PodsTab
