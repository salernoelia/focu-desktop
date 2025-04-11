<template>
  <router-view></router-view>
  <TaskInput v-if="taskInputVisible" :tasks="tasks" @select-task="handleTaskSelection" @close="hideTaskInput" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import TaskInput from "./components/TaskInput.vue";
import tasks from "./assets/tasks";
import type { Task } from "./types/Task";
import { useTaskInputStore } from "./store/taskInput";

const router = useRouter();
const taskInputStore = useTaskInputStore();

const taskInputVisible = ref(false);

const handleKeyDown = (event: KeyboardEvent): void => {
  if (event.key === "p" && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    toggleTaskInput();
  } else if (event.key === "Escape") {
    if (taskInputVisible.value) {
      hideTaskInput();
    } else {
      router.back();
    }
  } else if (event.key === "n" && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    router.push("/task/create");
  }
};

const toggleTaskInput = (): void => {
  taskInputVisible.value = !taskInputVisible.value;
  taskInputStore.setVisible(taskInputVisible.value);
};

const hideTaskInput = (): void => {
  taskInputVisible.value = false;
  taskInputStore.setVisible(false);
};

const handleTaskSelection = (task: Task): void => {
  hideTaskInput();
  router.push({ name: "TaskBoard", params: { id: task.id } });
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
