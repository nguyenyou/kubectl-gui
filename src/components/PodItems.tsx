import { filterNameAtom } from '@/atoms'
import { Pod } from '@/types'
import { useAtomValue } from 'jotai'
import PodItem from './PodItem'

type Props = {
  pods: Pod[]
}

const PodItems = ({ pods }: Props) => {
  const filterName = useAtomValue(filterNameAtom)

  const filteredPods = pods.filter((pod) => {
    return pod.name.includes(filterName)
  })

  return (
    <tbody>
      {filteredPods.map((pod) => (
        <PodItem pod={pod} />
      ))}
    </tbody>
  )
}

export default PodItems
