<template>
  <div class="inspector-container">
    <h2>Inspector</h2>
    <div class="inspector-content">
      <p>{{ task.description }}</p>
      <h4>Status</h4>
      <p>{{ task.status }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '../types/Task';

const props = defineProps<{
  task: Task
}>();
</script>

<style scoped>
.inspector-container {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 20%;
  min-width: 300px;



  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  align-items: start/;
  gap: 0.5rem;
  background-color: var(--vf-node-bg);
  border-radius: 1rem;
  z-index: 2;
  padding: 0.6rem 1.25rem;
  border: var(--vf-node-color) 1px solid;
  overflow-y: auto;
  /* Add scrolling if content exceeds height */
}
</style>
