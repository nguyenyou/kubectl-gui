import { Deployment } from '@/types'
import DeploymentItems from './DeploymentItems'

type Props = {
  deployments: Deployment[]
}

const DeploymentsTab = ({ deployments }: Props) => {
  if (!Array.isArray(deployments) || deployments.length === 0) return

  const deploymentHeaders = deployments[0]
  const deploymentRows = deployments.slice(1)
  return (
    <table className='w-full'>
      <thead>
        <tr>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
            {deploymentHeaders.name}
          </th>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
            {deploymentHeaders.ready}
          </th>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
            {deploymentHeaders.upToDate}
          </th>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>
            {deploymentHeaders.available}
          </th>
          <th className='whitespace-nowrap border-b border-primary-500 px-2 py-1 text-left'>{deploymentHeaders.age}</th>
        </tr>
      </thead>
      <DeploymentItems deployments={deploymentRows} />
    </table>
  )
}

export default DeploymentsTab
