<script setup lang="ts">
import { BaseEdge, EdgeLabelRenderer, getBezierPath, Handle, type EdgeProps } from '@vue-flow/core'
import { computed } from 'vue'

const props = defineProps<EdgeProps>()

const path = computed(() => getBezierPath(props))
</script>



<template>

    <BaseEdge :path="path[0]" />

    <EdgeLabelRenderer>
        <div :style="{
            pointerEvents: 'all',
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
        }" class="nodrag nopan">
            {{ data.hello }}
        </div>
    </EdgeLabelRenderer>
</template>