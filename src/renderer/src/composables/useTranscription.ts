import { ref } from 'vue'

export const useTranscription = () => {
  const transcribedText = ref<string>('')
  const isTranscribing = ref<boolean>(false)
  const error = ref<string | null>(null)

  const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    isTranscribing.value = true
    error.value = null
    transcribedText.value = ''

    try {
      const formData = new FormData()
      formData.append('file', audioBlob, 'recording.webm')
      formData.append('model', 'whisper-large-v3')
      formData.append('response_format', 'json')
      formData.append('language', 'en')
      formData.append('temperature', '0.0')

      const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_GROQ_API_KEY}`
        },
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || `API error: ${response.status}`)
      }

      const data = await response.json()
      transcribedText.value = data.text
      return data.text
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to transcribe audio'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      isTranscribing.value = false
    }
  }

  return {
    transcribeAudio,
    transcribedText,
    isTranscribing,
    error
  }
}
