import { Deployment } from '@/types'
import clsx from 'clsx'

type Props = {
  deployment: Deployment
}

const DeploymentItem = ({ deployment }: Props) => {
  return (
    <tr key={deployment.name}>
      <td className='border-b border-primary-500 px-2 py-1 text-left'>
        <a className='cursor-not-allowed text-sky-600 hover:text-sky-400'>{deployment.name}</a>
      </td>
      <td className={clsx('border-b border-primary-500 px-2 py-1 text-left')}>{deployment.ready}</td>
      <td className={clsx('border-b border-primary-500 px-2 py-1 text-left')}>{deployment.upToDate}</td>
      <td className='border-b border-primary-500 px-2 py-1 text-left'>{deployment.available}</td>
      <td className='border-b border-primary-500 px-2 py-1 text-left'>{deployment.age}</td>
    </tr>
  )
}

export default DeploymentItem
