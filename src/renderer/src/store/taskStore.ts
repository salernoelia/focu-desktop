import { ref, onMounted, type Ref } from 'vue'
import type { Task } from '../types/Task'

// Mock data for development when Electron APIs aren't available
const MOCK_TASKS: Task[] = []

export const useTaskStore = (): {
  tasks: Ref<Task[]>
  isLoading: Ref<boolean>
  error: Ref<Error | null>
  fetchTasks: () => Promise<void>
  createTask: (task: Task) => Promise<Task | null>
  updateTask: (task: Task) => Promise<Task | null>
  deleteTask: (taskId: string) => Promise<boolean>
} => {
  const tasks = ref<Task[]>([])
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const fetchTasks = async () => {
    isLoading.value = true
    error.value = null
    console.log('fetching tasks..')

    try {
      // Check if we're in Electron environment or if the API is available
      if (window.electron && typeof window.electron.getTasks === 'function') {
        const result = await window.electron.getTasks()
        if (Array.isArray(result)) {
          tasks.value = result
        } else {
          throw new Error('Failed to fetch tasks')
        }
      } else {
        console.warn('Running in development mode without Electron APIs. Using mock data.')
        tasks.value = MOCK_TASKS
      }
    } catch (err) {
      console.error('Error fetching tasks:', err)
      error.value = err instanceof Error ? err : new Error(String(err))

      // Fallback to mock data in development
      if (import.meta.env.DEV) {
        console.warn('Using mock data due to error')
        tasks.value = MOCK_TASKS
      }
    } finally {
      isLoading.value = false
    }
    console.log(tasks.value)
  }

  // Create a new task
  const createTask = async (task: Task): Promise<Task | null> => {
    try {
      if (window.electron && typeof window.electron.saveTask === 'function') {
        const result = await window.electron.saveTask(task)

        if (result.success) {
          tasks.value.push(task)
          return task
        } else {
          throw new Error(result.error || 'Failed to save task')
        }
      } else {
        // Mock implementation for development
        console.warn('Running in development mode. Task will not persist between sessions.')
        MOCK_TASKS.push(task)
        tasks.value.push(task)
        return task
      }
    } catch (err) {
      console.error('Error creating task:', err)
      error.value = err instanceof Error ? err : new Error(String(err))
      return null
    }
  }

  // Update an existing task with similar pattern
  const updateTask = async (task: Task): Promise<Task | null> => {
    try {
      if (window.electron && typeof window.electron.updateTask === 'function') {
        const result = await window.electron.updateTask(task)

        if (result.success) {
          const index = tasks.value.findIndex(t => t.id === task.id)
          if (index !== -1) {
            tasks.value[index] = task
          }
          return task
        } else {
          throw new Error(result.error || 'Failed to update task')
        }
      } else {
        // Mock implementation
        const index = tasks.value.findIndex(t => t.id === task.id)
        if (index !== -1) {
          tasks.value[index] = task
          const mockIndex = MOCK_TASKS.findIndex(t => t.id === task.id)
          if (mockIndex !== -1) {
            MOCK_TASKS[mockIndex] = task
          }
        }
        return task
      }
    } catch (err) {
      console.error('Error updating task:', err)
      error.value = err instanceof Error ? err : new Error(String(err))
      return null
    }
  }

  // Delete a task with similar pattern
  const deleteTask = async (taskId: string): Promise<boolean> => {
    try {
      if (window.electron && typeof window.electron.deleteTask === 'function') {
        const result = await window.electron.deleteTask(taskId)

        if (result.success) {
          tasks.value = tasks.value.filter(task => task.id !== taskId)
          return true
        } else {
          throw new Error(result.error || 'Failed to delete task')
        }
      } else {
        // Mock implementation
        tasks.value = tasks.value.filter(task => task.id !== taskId)
        const mockIndex = MOCK_TASKS.findIndex(t => t.id === taskId)
        if (mockIndex !== -1) {
          MOCK_TASKS.splice(mockIndex, 1)
        }
        return true
      }
    } catch (err) {
      console.error('Error deleting task:', err)
      error.value = err instanceof Error ? err : new Error(String(err))
      return false
    }
  }

  onMounted(() => {
    fetchTasks()
  })

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  }
}
