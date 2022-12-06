import { atom } from 'jotai'

export const filterNameAtom = atom('')
export const currentContextAtom = atom('')

export type Workload = 'pods' | 'deployments' | 'services'

export const currentWorkloadAtom = atom<Workload>('pods')

export const currentContextLocalAtom = atom('')

export const totalCountAtom = atom('')