<template>
  <div class="dashboard-container" :class="{ 'blur-background': taskInputVisible }">
    <SearchBar @search="handleSearch" @filter="handleFilter" />

    <div v-if="filteredTasks.length > 0" class="task-grid">
      <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" @select="navigateToTask" />
    </div>

    <div v-else class="no-results">
      <span class="material-icons">search</span>
      <p>No tasks found</p>
      <button class="reset-button" @click="resetFilters">Reset filters</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TaskCard from '../components/TaskCard.vue'
import SearchBar from '../components/SearchBar.vue'
import type { Task } from '../types/Task'
import { useTaskInputStore } from '../store/taskInput'
import { useTaskStore } from '../store/taskStore'
const { tasks } = useTaskStore()



const router = useRouter()
const searchQuery = ref('')
const currentFilter = ref('all')
const taskInputStore = useTaskInputStore()



const taskInputVisible = computed(() => taskInputStore.isVisible.value)

const filteredTasks = computed(() => {
  let result = tasks.value

  // Apply status filter
  if (currentFilter.value !== 'all') {
    result = result.filter((task: Task) => task.status.toLowerCase() === currentFilter.value)
  }

  // Apply search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(
      (task: Task) =>
        task.name.toLowerCase().includes(query) || task.description.toLowerCase().includes(query)
    )
  }

  return result
})

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleFilter = (filter: string) => {
  currentFilter.value = filter
}

const resetFilters = () => {
  searchQuery.value = ''
  currentFilter.value = 'all'
}

const navigateToTask = (task: Task) => {
  router.push({
    name: 'TaskBoard',
    params: { id: task.id }
  })
}
</script>

<style scoped>
.dashboard-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  transition: filter 0.3s ease;
}

.blur-background {
  filter: blur(3px);
  pointer-events: none;
}

.dashboard-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: left;
  color: var(--vf-on-node);
}

.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: var(--vf-connection-path);
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.reset-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--vf-handle);
  color: var(--vf-node-bg);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.reset-button:hover {
  background-color: var(--vf-on-node);
}
</style>
