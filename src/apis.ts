import * as commands from './commands'
import { Deployment, Pod, Service } from './types'

export async function getPods() {
  const raw = await commands.kubeGetPods()

  const pods: Pod[] = []
  const podLines = raw.split('\n')

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

  return pods
}

export async function getServices() {
  const raw = await commands.kubeGetServices()

  const services: Service[] = []
  const serviceLines = raw.split('\n')

  serviceLines?.forEach((line) => {
    const columns = line.split(/\s+/)
    if (columns.length === 6) {
      const service: Service = {
        name: columns[0],
        type: columns[1],
        clusterIP: columns[2],
        externalIP: columns[3],
        ports: columns[4],
        age: columns[5],
      }
      services.push(service)
    }
  })

  return services
}

export async function getDeployments() {
  const raw = await commands.kubeGetDeployments()

  const deployments: Deployment[] = []
  const deploymentLines = raw.split('\n')

  deploymentLines?.forEach((line) => {
    const columns = line.split(/\s+/)
    if (columns.length === 5) {
      const deployment: Deployment = {
        name: columns[0],
        ready: columns[1],
        upToDate: columns[2],
        available: columns[3],
        age: columns[4],
      }
      deployments.push(deployment)
    }
  })

  return deployments
}