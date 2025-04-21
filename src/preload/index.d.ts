import type { Task } from '../renderer/src/types/Task'
import type { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI & {
      saveTask: (task: Task) => Promise<{ success: boolean; error?: string }>
      getTasks: () => Promise<Task[]>
      updateTask: (task: Task) => Promise<{ success: boolean; error?: string }>
      deleteTask: (taskId: string) => Promise<{ success: boolean; error?: string }>
    }
    api: unknown
  }
}

export {}
