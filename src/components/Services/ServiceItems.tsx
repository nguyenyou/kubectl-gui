import { filterNameAtom } from '@/atoms'
import { Service } from '@/types'
import { useAtomValue } from 'jotai'
import ServiceItem from './ServiceItem'

type Props = {
  services: Service[]
}

const ServiceItems = ({ services }: Props) => {
  const filterName = useAtomValue(filterNameAtom)

  const filteredServices = services.filter((pod) => {
    return pod.name.includes(filterName)
  })

  return (
    <tbody>
      {filteredServices.map((service) => (
        <ServiceItem key={service.name} service={service} />
      ))}
    </tbody>
  )
}

export default ServiceItems
