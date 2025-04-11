import { ref, Ref } from 'vue'

export const useAudioRecorder = (): {
  isRecording: Ref<boolean>
  startRecording: () => Promise<void>
  stopRecording: () => Promise<Blob>
  cleanup: () => void
  error: Ref<string | null>
} => {
  const isRecording = ref<boolean>(false)
  const mediaRecorder = ref<MediaRecorder | null>(null)
  const audioChunks = ref<Blob[]>([])
  const error = ref<string | null>(null)

  const startRecording = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder.value = new MediaRecorder(stream)
      audioChunks.value = []

      mediaRecorder.value.addEventListener('dataavailable', event => {
        if (event.data.size > 0) {
          audioChunks.value.push(event.data)
        }
      })

      mediaRecorder.value.start()
      isRecording.value = true
      console.log('Recording started')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start recording'
      error.value = errorMessage
      console.error('Error starting recording:', errorMessage)
    }
  }

  const stopRecording = (): Promise<Blob> => {
    return new Promise<Blob>((resolve, reject) => {
      if (!mediaRecorder.value || mediaRecorder.value.state === 'inactive') {
        const errorMessage = 'No active recording to stop'
        error.value = errorMessage
        reject(new Error(errorMessage))
        return
      }

      mediaRecorder.value.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks.value, { type: 'audio/webm' })
        resolve(audioBlob)
      })

      mediaRecorder.value.stop()
      isRecording.value = false

      if (mediaRecorder.value.stream) {
        mediaRecorder.value.stream.getTracks().forEach(track => track.stop())
      }

      console.log('Recording stopped')
    })
  }

  const cleanup = (): void => {
    if (isRecording.value && mediaRecorder.value) {
      mediaRecorder.value.stop()
      if (mediaRecorder.value.stream) {
        mediaRecorder.value.stream.getTracks().forEach(track => track.stop())
      }
    }
    isRecording.value = false
  }

  return {
    isRecording,
    startRecording,
    stopRecording,
    cleanup,
    error
  }
}
