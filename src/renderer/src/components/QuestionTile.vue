<template>
  <div class="c">
    <h1 class="n">{{ number }}</h1>
    <h1>{{ question }}</h1>
  </div>
</template>

<script setup lang="ts">


defineProps({
  number: Number,
  question: String
})
</script>

<style scoped>
.n {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: #171b42;
  border-radius: 0.25rem;
  border: #9ca2de 1px solid;

}

.c {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}

h1 {
  font-size: 1.5rem;
  color: #9ca2de;
}
</style>
