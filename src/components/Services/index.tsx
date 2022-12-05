import { Service } from '@/types'
import ServiceItems from './ServiceItems'

type Props = {
  services: Service[]
}

const ServicesTab = ({ services }: Props) => {
  if (!Array.isArray(services) || services.length === 0) return

  const serviceHeaders = services[0]
  const serviceRows = services.slice(1)

  return (
    <table className='w-full'>
      <thead>
        <tr>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>{serviceHeaders.name}</th>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>{serviceHeaders.type}</th>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
            {serviceHeaders.clusterIP}
          </th>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
            {serviceHeaders.externalIP}
          </th>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>{serviceHeaders.ports}</th>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>{serviceHeaders.age}</th>
        </tr>
      </thead>
      <ServiceItems services={serviceRows} />
    </table>
  )
}

export default ServicesTab
