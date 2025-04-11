<script setup lang="ts">
import { ref, nextTick, onMounted, computed, watch, watchEffect } from 'vue'
import { VueFlow, useVueFlow, Panel } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import { Background } from '@vue-flow/background'
import SpecialNode from '../../components/SpecialNode.vue'
import SpecialEdge from '../../components/SpecialEdge.vue'
import Title from '../../components/Title.vue'
import Toolbar from '../../components/Toolbar.vue'
import { MiniMap } from '@vue-flow/minimap'
import '@vue-flow/minimap/dist/style.css'
import TaskInput from '../../components/TaskInput.vue'
import type { Node } from '../../types/Node'
import type { Edge } from '../../types/Edge'
import type { Task } from '../../types/Task'
import type { XYPosition } from '@vue-flow/core'
import tasks from '../../assets/tasks'
import { useRoute, useRouter } from 'vue-router'
const { fitView } = useVueFlow()
import { useLayout } from '../../composables/useLayout'
import Inspector from '../../components/Inspector.vue'
const { layout } = useLayout()

const route = useRoute();
const router = useRouter();
const taskInput = ref<boolean>(false)
const currentTaskID = ref<string>("")
const loading = ref<boolean>(true)
const nodes = ref<Node[]>([])
const edges = ref<Edge[]>([])




const currentTask = computed<Task | undefined>(() => {
    return tasks.value.find((task: Task) => task.id === currentTaskID.value)
})

const toggleTaskInput = (): void => {
    taskInput.value = !taskInput.value
}


const selectTask = (task: Task): void => {
    nodes.value = task.nodes || []
    edges.value = task.edges || []
    currentTaskID.value = task.id
    taskInput.value = false

    if (route.params.id !== task.id) {
        router.push({ name: 'TaskBoard', params: { id: task.id } })
    }

    loading.value = false

}

const selectTaskByID = (taskID: string): void => {
    const task = tasks.value.find((task: Task) => task.id === taskID)
    if (task) {
        selectTask(task)
    } else {
        loading.value = false
        router.push('/')
    }
}

watch(() => route.params.id as string | undefined, (newId: string | undefined) => {
    if (newId) {
        selectTaskByID(newId)
        setTimeout(() => {
            layoutGraph('LR')
        }, 100)
    }
}, { immediate: true })

onMounted(() => {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            taskInput.value = false
        }
    })

    const taskId = route.params.id as string
    if (taskId) {
        selectTaskByID(taskId)
    } else {
        router.push('/')
    }


    layoutGraph('LR');
})

async function layoutGraph(direction: string) {
    nodes.value = layout(nodes.value, edges.value, direction)

    nextTick(() => {
        fitView()
    })
}
</script>

<template>
    <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading task...</p>
    </div>

    <div v-else-if="currentTask" class="task-container">

        <template v-if="!taskInput">
            <Title v-model="currentTask.name" />
        </template>

        <Toolbar v-if="!taskInput" @autolayout="layoutGraph('LR')" />
        <Inspector v-if="!taskInput" :task="currentTask" />

        <div class="vue-flow-wrapper">
            <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init>
                <Background />
                <Panel position="top-right" class="panel">

                </Panel>
                <!-- <MiniMap pannable zoomable /> -->

                <template #node-special="nodeProps">
                    <SpecialNode v-bind="nodeProps" />
                </template>

                <template #edge-special="edgeProps">
                    <SpecialEdge v-bind="edgeProps" />
                </template>
            </VueFlow>
        </div>
    </div>

    <div v-else class="error-container">
        <p>Task not found</p>
        <button @click="$router.push('/dashboard')" class="nav-button">
            Return to Dashboard
        </button>
    </div>
</template>

<style scoped>
.task-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.vue-flow-wrapper {
    flex: 1;
    width: 100%;
    height: calc(100vh - 60px);
    /* Adjust based on your header height */
}

.panel button {
    padding: 5px 10px;
    cursor: pointer;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.loading-container,
.error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: var(--vf-text-color);
}

.loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid var(--vf-node-color);
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.nav-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: var(--vf-handle);
    color: var(--vf-node-bg);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
}
</style>