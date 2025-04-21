import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import Store from 'electron-store'
import type { Task } from '../renderer/src/types/Task'

const schema = {
  tasks: {
    type: 'array' as const,
    default: []
  }
}

const store = new Store({ schema })

const getTasks = (): Task[] => store.get('tasks') as Task[]

const setTasks = (tasks: Task[]): void => store.set('tasks', tasks)

const addTask = (task: Task): void => {
  const tasks = getTasks()
  tasks.push(task)
  setTasks(tasks)
}

const updateTask = (updatedTask: Task): void => {
  const tasks = getTasks()
  const index = tasks.findIndex(task => task.id === updatedTask.id)
  if (index !== -1) {
    tasks[index] = updatedTask
    setTasks(tasks)
  }
}

const deleteTask = (taskId: string): void => {
  const tasks = getTasks()
  const filteredTasks = tasks.filter(task => task.id !== taskId)
  setTasks(filteredTasks)
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.handle('save-task', (_event, task: Task) => {
    try {
      addTask(task)
      return { success: true }
    } catch (error: unknown) {
      console.error('Failed to save task:', error)
      return { success: false, error: (error as Error).message }
    }
  })

  ipcMain.handle('get-tasks', () => {
    try {
      const tasks = getTasks()
      return tasks
    } catch (error: unknown) {
      console.error('Failed to get tasks:', error)
      throw error
    }
  })

  ipcMain.handle('update-task', (_event, task: Task) => {
    try {
      updateTask(task)
      return { success: true }
    } catch (error: unknown) {
      console.error('Failed to update task:', error)
      return { success: false, error: (error as Error).message }
    }
  })

  ipcMain.handle('delete-task', (_event, taskId: string) => {
    try {
      deleteTask(taskId)
      return { success: true }
    } catch (error: unknown) {
      console.error('Failed to delete task:', error)
      return { success: false, error: (error as Error).message }
    }
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
