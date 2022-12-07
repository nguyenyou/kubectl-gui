import create from 'zustand'

interface BearState {
  logs: string[]
  appendLog: (log: string) => void
  clearLogs: () => void
}

export const useLogsStore = create<BearState>()(
  (set) => ({
    logs: [],
    appendLog: (log: string) => set((state) => ({ logs: [log, ...state.logs] })),
    clearLogs: () => set({ logs: [] }),
  })
)