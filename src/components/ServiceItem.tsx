import { Service } from '@/types'
import clsx from 'clsx'

type Props = {
  service: Service
}

const ServiceItem = ({ service }: Props) => {
  return (
    <tr key={service.name}>
      <td className='border-b border-primary-500 px-2 py-1 text-left'>
        <a className='cursor-not-allowed text-sky-600 hover:text-sky-400'>{service.name}</a>
      </td>
      <td className={clsx('border-b border-primary-500 px-2 py-1 text-left')}>{service.type}</td>
      <td className={clsx('border-b border-primary-500 px-2 py-1 text-left')}>{service.type}</td>
      <td className='border-b border-primary-500 px-2 py-1 text-left'>{service.externalIP}</td>
      <td className='border-b border-primary-500 px-2 py-1 text-left'>{service.ports}</td>
      <td className='border-b border-primary-500 px-2 py-1 text-left'>{service.age}</td>
    </tr>
  )
}

export default ServiceItem
