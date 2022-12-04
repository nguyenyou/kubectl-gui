import { Command } from '@tauri-apps/api/shell'

export async function kubeDescribePods(name: string) {
  const { stdout } = await new Command('kubectl-describe-pod', ['describe', 'pods', name]).execute()
  return stdout
}

export async function kubeDeletePod(name: string) {
  const { stdout } = await new Command('kubectl-delete-pod', ['delete', 'pods', name]).execute()
  return stdout
}

export async function kubeGetPodYaml(name: string) {
  const { stdout } = await new Command('kubectl-get-pod-yaml', ['get', 'pods', name, '-o', 'yaml']).execute()
  return stdout
}

export async function kubeGetLogs(name: string) {
  const { stdout } = await new Command('kubectl-get-logs', ['logs', name, '--tail', '200']).execute()
  return stdout
}

export async function kubeGetPods() {
  const { stdout } = await new Command('kubectl-get-pods', ['get', 'pods']).execute()
  return stdout
}

export async function getCurrentContext() {
  const { stdout } = await new Command('kubectl-config-current-context', ['config', 'current-context']).execute()
  return stdout
}

export async function kubeGetServices() {
  const { stdout } = await new Command('kubectl-get-services', ['get', 'services']).execute()
  return stdout
}

export async function kubeGetDeployments() {
  const { stdout } = await new Command('kubectl-get-deployments', ['get', 'deployments']).execute()
  return stdout
}
