import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { Task } from '../renderer/src/types/Task'

// Custom APIs for renderer
const api = {}

// Define our electron exposed API
const electronExposedAPI = {
  ...electronAPI,
  saveTask: (task: Task) => ipcRenderer.invoke('save-task', task),
  getTasks: () => ipcRenderer.invoke('get-tasks'),
  updateTask: (task: Task) => ipcRenderer.invoke('update-task', task),
  deleteTask: (taskId: string) => ipcRenderer.invoke('delete-task', taskId)
}

// Use context isolation if available
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronExposedAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronExposedAPI
  // @ts-ignore (define in dts)
  window.api = api
}
