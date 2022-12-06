import { currentContextLocalAtom } from '@/atoms'
import * as commands from '@/commands'
import PodsTab from '@/components/Pods'
import { Pod } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

const PodsViewFeature = () => {
  const currContext = useAtomValue(currentContextLocalAtom)

  const queryPods = useQuery({
    queryKey: ['pods', currContext],
    queryFn: commands.kubeGetPods,
    refetchInterval: 2000,
  })

  if (queryPods.isLoading) return <span>Loading...</span>
  if (queryPods.isError) return <span>Error...</span>

  const pods: Pod[] = []
  const podLines = queryPods.data.split('\n')
  podLines.forEach((line) => {
    const columns = line.split(/\s+/)
    if (columns.length === 5) {
      const pod: Pod = {
        name: columns[0],
        ready: columns[1],
        status: columns[2],
        restarts: columns[3],
        age: columns[4],
      }
      pods.push(pod)
    }
  })

  return <PodsTab pods={pods} />
}

export default PodsViewFeature
