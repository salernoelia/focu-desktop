<template>
    <div class="task-card" @click="$emit('select', task)">
        <div class="task-header">
            <h3 class="task-title">{{ task.name }}</h3>
            <span class="task-status" :class="`status-${task.status.toLowerCase()}`">
                {{ task.status }}
            </span>
        </div>

        <p class="task-description">{{ truncatedDescription }}</p>

        <div class="task-footer">
            <div class="task-stats">
                <span class="task-stat">
                    <span class="material-icons">deployed_code</span>
                    {{ task.nodes.length }}
                </span>

            </div>
            <div class="task-date">
                <span class="material-icons">edit_calendar</span>
                {{ formatDate(task.last_edited) }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '../types/Task'

const props = defineProps<{
    task: Task
}>()

defineEmits(['select'])

const truncatedDescription = computed(() => {
    if (props.task.description.length > 80) {
        return props.task.description.substring(0, 80) + '...'
    }
    return props.task.description
})

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(date)
}
</script>

<style scoped>
.task-card {
    background-color: var(--vf-node-bg);
    border: 1px solid var(--vf-node-color);
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.task-card:hover {
    transform: scale(1.01);
    box-shadow: 0 6px 12px var(--vf-box-shadow);
}

.task-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
}

.task-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--vf-on-node);
    text-align: left;
}

.task-status {
    font-size: 0.75rem;
    padding: 0.15rem 0.5rem;
    border-radius: 10px;
    text-transform: uppercase;
    font-weight: 600;
}

.status-completed {
    background-color: #22543d;
    color: #c6f6d5;
}

.status-in-progress {
    background-color: #2a4365;
    color: #bee3f8;
}

.status-todo {
    background-color: #744210;
    color: #fefcbf;
}

.task-description {
    color: var(--vf-node-text);
    opacity: 0.8;
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 1rem;
    text-align: left;
    flex-grow: 1;
}

.task-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    opacity: 0.7;
    margin-top: auto;
}

.task-stats {
    display: flex;
    gap: 0.75rem;
}

.task-stat {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.task-date {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.material-icons {
    font-size: 1rem;
}
</style>