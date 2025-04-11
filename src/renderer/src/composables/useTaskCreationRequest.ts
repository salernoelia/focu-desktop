import tasks from '../assets/tasks'
import { ref, type Ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Task } from '../types/Task'
import CreateTaskPrompt from '../assets/prompts/CreateTask.md?raw'

export function useTaskCreationRequest(): {
  createTask: (userPrompt: string) => Promise<Task | null>
  isLoading: Ref<boolean>
  error: Ref<Error | null>
} {
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  /**
   * Creates a new task via the Groq API using the v1 CreateTaskPrompt
   * @param userPrompt The user's task description
   * @returns The newly created task
   */
  const createTask = async (userPrompt: string): Promise<Task | null> => {
    isLoading.value = true
    error.value = null

    try {
      const apiKey = import.meta.env.VITE_APP_GROQ_API_KEY

      if (!apiKey) {
        throw new Error('GROQ_API_KEY is not defined in environment variables')
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: CreateTaskPrompt
            },
            {
              role: 'user',
              content: userPrompt
            }
          ],
          model: 'deepseek-r1-distill-llama-70b',
          temperature: 0.6,
          max_completion_tokens: 4096,
          top_p: 0.95,
          stream: false,
          response_format: {
            type: 'json_object'
          },
          stop: null
        })
      })

      if (!response.ok) {
        throw new Error(
          `API request failed with status ${response.status}: ${await response.text()}`
        )
      }

      const responseData = await response.json()

      let taskObject: Task

      try {
        const content = responseData.choices[0].message.content
        taskObject = JSON.parse(content)

        const currentTimestamp = new Date().toISOString()
        taskObject.id = uuidv4()
        taskObject.created = currentTimestamp
        taskObject.last_edited = currentTimestamp

        taskObject.status = 'todo'

        tasks.value.push(taskObject)

        return taskObject
      } catch (parseError) {
        console.error('Failed to parse API response:', parseError)
        throw new Error('Failed to parse task data from API response')
      }
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    createTask,
    isLoading,
    error
  }
}
