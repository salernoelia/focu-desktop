<script setup lang="ts">
import { computed } from 'vue'
import { Position, Handle } from '@vue-flow/core'
import type { NodeProps } from '@vue-flow/core'

const props = defineProps<NodeProps>()

const x = computed(() => `${Math.round(props.position.x)}px`)
const y = computed(() => `${Math.round(props.position.y)}px`)
</script>

<template>
    <div class="vue-flow__node-default">
        <div>{{ data.label }}</div>



        <Handle type="target" :position="Position.Left" />
        <Handle type="source" :position="Position.Right" />
    </div>
</template>

<style scoped>
.vue-flow__node-default {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}

.vue-flow__handle {
    width: 8px;
    height: 8px;
    border-radius: 2px;
}
</style>