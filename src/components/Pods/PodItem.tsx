import { Pod } from '@/types'
import clsx from 'clsx'
import Link from 'next/link'

type Props = {
  pod: Pod
}

const PodItem = ({ pod }: Props) => {
  const status = pod.status.toLowerCase()
  let statusColor = 'text-rose-600'
  if (status === 'running') statusColor = 'text-emerald-500'
  if (status === 'completed') statusColor = 'text-gray-600'
  if (status === 'terminating') statusColor = 'text-yellow-600'

  return (
    <tr key={pod.name}>
      <td className='border-b border-primary-500 px-2 py-1 text-left'>
        <Link href={`/${pod.name}`}>
          <a className='text-sky-600 hover:text-sky-400'>{pod.name}</a>
        </Link>
      </td>
      <td className={clsx('border-b border-primary-500 px-2 py-1 text-left')}>{pod.ready}</td>
      <td className={clsx('border-b border-primary-500 px-2 py-1 text-left', statusColor)}>{pod.status}</td>
      <td className='border-b border-primary-500 px-2 py-1 text-left'>{pod.restarts}</td>
      <td className='border-b border-primary-500 px-2 py-1 text-left'>{pod.age}</td>
    </tr>
  )
}

export default PodItem
