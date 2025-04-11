import { ref } from "vue";

// Simple reactive store for task input visibility
const isVisible = ref(false);

export const useTaskInputStore = () => {
  const setVisible = (value: boolean) => {
    isVisible.value = value;
  };

  const getVisible = () => isVisible.value;

  return {
    isVisible,
    setVisible,
    getVisible,
  };
};
