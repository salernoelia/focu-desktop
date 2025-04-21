<template>
  <div class="toolbar-container">

    <button @click="$emit('autolayout')">
      <span class="material-symbols-outlined">
        automation
      </span>
    </button>
    <button @click="$emit('autolayout')">
      <span class="material-symbols-outlined">
        edit
      </span>
    </button>
    <button>
      <span class="material-icons">add</span>
    </button>

  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['addNode', 'addTask', 'autolayout'])
</script>

<style scoped>
.toolbar-container {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--vf-node-bg);
  border-radius: 1rem;
  z-index: 1000;
  padding: 0.5rem 1rem;
  border: var(--vf-node-color) 1px solid;
  gap: 1rem;

}

button {
  border: none;
  color: var(--vf-text-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  border-radius: 50%;
  transition: all 0.2s;
}

button:hover {
  background-color: var(--vf-node-bg-dark);
  box-shadow: inset 0 0 0 1px var(--vf-node-bg-light);
}
</style>
