import * as commands from './commands'
import { Deployment, Pod, Service, Context } from './types'

export async function getPods() {
  const raw = await commands.kubectl(['get', 'pods'])

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

    if (columns.length === 7) {
      const pod: Pod = {
        name: columns[0],
        ready: columns[1],
        status: columns[2],
        restarts: `${columns[3]} ${columns[4]} ${columns[5]}`,
        age: columns[6],
      }
      pods.push(pod)
    }
  })

  return pods
}

export async function getServices() {
  const raw = await commands.kubectl(['get', 'services'])

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
  const raw = await commands.kubectl(['get', 'deployments'])

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

export async function getContexts() {
  const raw = await commands.kubectl(['config', 'get-contexts'])

  const contexts: Context[] = []
  const contextLines = raw.split('\n')
  contextLines?.forEach((line) => {
    const columns = line.split(/\s+/)
    if (columns.length === 5) {
      const context: Context = {
        current: columns[0],
        name: columns[1],
        cluster: columns[2],
        authInfo: columns[3],
        namespace: columns[4],
      }
      contexts.push(context)
    }
  })

  return contexts
}

export async function getCurrentContext() {
  const raw = await commands.kubectl(['config', 'current-context'])
  return raw
}

export async function switchContext(name: string) {
  const raw = await commands.kubectl(['config', 'use-context', name])
  return raw
}

export async function getPodYaml(name: string) {
  const raw = await commands.kubectl(['get', 'pods', name, '-o', 'yaml'])
  return raw
}

export async function deletePod(name: string) {
  const raw = await commands.kubectl(['delete', 'pods', name])
  return raw
}

export async function describePod(name: string) {
  const raw = await commands.kubectl(['describe', 'pods', name])
  return raw
}
