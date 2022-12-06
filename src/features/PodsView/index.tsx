import { currentContextLocalAtom } from '@/atoms'
import * as commands from '@/commands'
import HashLoader from '@/components/Loaders/HashLoader'
import PodsTab from '@/components/Pods'
import { Pod } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

const PodsViewFeature = () => {
  const currContext = useAtomValue(currentContextLocalAtom)

  const query = useQuery({
    queryKey: ['pods', currContext],
    queryFn: commands.kubeGetPods,
    refetchInterval: 2000,
  })

  if (query.isLoading)
    return (
      <div className='flex h-full items-center justify-center'>
        <HashLoader />
      </div>
    )
  if (query.isError) return <span>Error...</span>

  const pods: Pod[] = []
  const podLines = query.data.split('\n')
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
