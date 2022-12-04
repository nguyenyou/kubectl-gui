export type Pod = {
  name: string
  ready: string
  status: string
  restarts: string
  age: string
}

export type Service = {
  name: string
  type: string
  clusterIP: string
  externalIP: string
  ports: string
  age: string
}

export type Deployment = {
  name: string
  ready: string
  upToDate: string
  available: string
  age: string
}
