import { filterNameAtom } from '@/atoms'
import { Deployment } from '@/types'
import { useAtomValue } from 'jotai'
import DeploymentItem from './DeploymentItem'

type Props = {
  deployments: Deployment[]
}

const DeploymentItems = ({ deployments }: Props) => {
  const filterName = useAtomValue(filterNameAtom)

  const filteredDeployments = deployments.filter((pod) => {
    return pod.name.includes(filterName)
  })

  return (
    <tbody>
      {filteredDeployments.map((deployment) => (
        <DeploymentItem key={deployment.name} deployment={deployment} />
      ))}
    </tbody>
  )
}

export default DeploymentItems
