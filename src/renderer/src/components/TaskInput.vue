<template>
  <div class="task-input-container">
    <div class="search-container">
      <input ref="inputRef" v-model="taskName" type="text" placeholder="Task Name" class="task-input"
        @input="filterTasks" />
      <div v-if="displayedTasks.length" class="suggestions-container">
        <div v-for="task in displayedTasks" :key="task.id" class="suggestion-item" @click="selectTask(task)">
          <p>
            {{ task.name }}
          </p>
        </div>
      </div>
    </div>
    <div class="backdrop" @click="close"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'

import type { Task } from '../types/Task'

import { useTaskStore } from '../store/taskStore'
const taskStore = useTaskStore()

const tasks = taskStore.tasks

// const props = defineProps({
//   tasks: {
//     type: Array,
//     required: true
//   }
// })

const taskName = ref('')
const emit = defineEmits(['close', 'selectTask'])
const inputRef = ref<HTMLInputElement | null>(null)

// Fuzzy search function
const fuzzySearch = (query: string, text: string) => {
  const queryLower = query.toLowerCase()
  const textLower = text.toLowerCase()

  if (queryLower === '') return true

  let queryIndex = 0

  for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      queryIndex++
    }
  }

  return queryIndex === queryLower.length
}

const displayedTasks = computed(() => {
  const query = taskName.value.trim()

  if (!query) {
    return [...tasks.value]
      .sort((a, b) => new Date(b.last_edited).getTime() - new Date(a.last_edited).getTime())
      .slice(0, 5)
  }

  const matchedTasks = tasks.value.filter(task => fuzzySearch(query, task.name))

  return matchedTasks
    .sort((a: Task, b: Task) => {
      const aExact = a.name.toLowerCase().includes(query.toLowerCase())
      const bExact = b.name.toLowerCase().includes(query.toLowerCase())

      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1

      return new Date(b.last_edited).getTime() - new Date(a.last_edited).getTime()
    })
    .slice(0, 5)
})

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && displayedTasks.value.length > 0) {
    selectTask(displayedTasks.value[0])
  }
}

onMounted(() => {
  inputRef.value?.focus()
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const filterTasks = () => { }

const selectTask = (task: Task) => {
  emit('selectTask', task)
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.task-input-container {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: -1;
}

.search-container {
  position: relative;
  width: 80%;
  max-width: 500px;
  transform: translateY(-20vh);
  z-index: 1001;
  /* Above backdrop */
}

.task-input {
  width: 100%;
  height: 3rem;
  padding: 1.5rem 1rem;
  border-radius: 1rem 1rem 0 0;
  font-size: 1rem;
  background-color: var(--vf-node-bg);

  color: var(--vf-text-color);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 7;
  border: var(--vf-node-color) 1px solid;
}

.task-input::placeholder {
  color: var(--vf-node-color);
  opacity: 0.8;
}

.task-input:focus {
  outline: none;
}

.suggestions-container {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: var(--vf-node-bg);
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  max-height: 40vh;
  overflow-y: auto;
  z-index: 6;
  border: var(--vf-node-color) 1px solid;
  border-top: none;
}

.suggestion-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  color: var(--vf-text-color);
  transition: background-color 0.2s ease;
}

.suggestion-item:hover {
  background-color: rgba(190, 190, 190, 0.1);
}

.suggestion-item:last-child {
  border-bottom: none;
}
</style>
