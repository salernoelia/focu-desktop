<template>
    <div class="title-container">
        <button id="dashboard-button" @click="$router.push({ path: '/' })">
            <span class="material-symbols-outlined">
                team_dashboard
            </span>
        </button>
        |
        <input ref="taskInput" type="text" id="task-name" placeholder="Task Name" :value="modelValue"
            @input="updateValue($event)" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})



const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}
</script>

<style scoped>
.title-container {
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--vf-node-bg);
    border-radius: 1rem;
    z-index: 2;
    padding: 0.6rem 1.25rem;
    border: var(--vf-node-color) 1px solid;

}

h3 {
    color: var(--vf-text-color);
    font-size: 1rem;
    margin: 0;
    font-weight: 700;
}

input {
    border: none;
    height: 2rem;
    padding: 0.5rem;
    font-size: 1rem;
    margin: 0;
    font-weight: 700;
    background-color: var(--vf-node-bg);
    color: var(--vf-text-color);
}

input:focus {
    outline: none;
    border: none;
}

.warning {
    color: var(--vf-node-color);
    font-size: 0.8rem;
    margin-top: 0.5rem;
    border: var(--vr-warning-color) 1px solid;
}
</style>