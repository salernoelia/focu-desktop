<template>
    <div class="search-bar-container">
        <div class="search-input-wrapper">
            <span class="material-icons search-icon">search</span>
            <input v-model="searchQuery" type="text" placeholder="Search tasks..." class="search-input"
                @input="onSearch" />
            <button v-if="searchQuery" class="clear-button" @click="clearSearch">
                <span class="material-icons">close</span>
            </button>
        </div>

        <div class="filter-buttons">
            <button v-for="filter in filters" :key="filter.value"
                :class="['filter-button', { active: currentFilter === filter.value }]"
                @click="selectFilter(filter.value)">
                {{ filter.label }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
const currentFilter = ref('all')
const emit = defineEmits(['search', 'filter'])

const filters = [
    { label: 'All', value: 'all' },
    { label: 'To Do', value: 'todo' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' }
]

const onSearch = (): void => {
    emit('search', searchQuery.value)
}

const clearSearch = (): void => {
    searchQuery.value = ''
    emit('search', '')
}

const selectFilter = (filter: string): void => {
    currentFilter.value = filter
    emit('filter', filter)
}
</script>

<style scoped>
.search-bar-container {
    width: 100%;
    margin-bottom: 1.5rem;
}

.search-input-wrapper {
    position: relative;
    margin-bottom: 1rem;
}

.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--vf-handle);
}

.search-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 3rem;
    background-color: var(--vf-node-bg);
    color: var(--vf-on-node);
    border: 1px solid var(--vf-node-color);
    border-radius: 8px;
    font-size: 1rem;
}

.search-input:focus {
    outline: none;
    border-color: var(--vf-handle);
}

.search-input::placeholder {
    color: var(--vf-connection-path);
}

.clear-button {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--vf-handle);
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.clear-button:hover {
    color: var(--vf-on-node);
}

.filter-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.filter-button {
    padding: 0.5rem 1rem;
    background-color: var(--vf-node-bg);
    color: var(--vf-on-node);
    border: 1px solid var(--vf-node-color);
    border-radius: 20px;
    font-size: 0.85rem;
    transition: all 0.2s;
}

.filter-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.filter-button.active {
    background-color: var(--vf-handle);
    color: var(--vf-node-bg);
}
</style>
