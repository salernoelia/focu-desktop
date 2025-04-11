<template>
    <div class="parent" v-if="!loadingCreation">
        <RecordAudio ref="recordAudioRef" :isRecording="isRecording" />

        <div class="questions">
            <QuestionTile v-for="(q, index) in taskCreationQuestions" :key="q.id" :number="q.id" :question="q.question"
                :ref="el => questionRefs[index] = el" class="question-tile" />
        </div>

        <h2 ref="pressEnterRef" class="note">Recording... Press Enter to stop and create task.</h2>
    </div>
    <div class="parent" v-if="loadingCreation">
        <CreatingTask />
        <div v-if="transciption" class="prompt">
            <h2 class="note">Prompt</h2>
            <h3>
                {{ transciption }}
            </h3>
        </div>
        <h2 ref="pressEnterRef" class="note">{{ statusMessage }}</h2>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { animate, stagger } from 'motion';
import taskCreationQuestions from '../../assets/questions';
import QuestionTile from '../../components/QuestionTile.vue';
import RecordAudio from '../../components/Icons/RecordAudio.vue';
import CreatingTask from '../../components/Icons/CreatingTask.vue';
import { useRouter } from 'vue-router';
import { useAudioRecorder } from '../../composables/useAudioRecorder';
import { useTranscription } from '../../composables/useTranscription';
import { useTaskCreationRequest } from '../../composables/useTaskCreationRequest';

const loadingCreation = ref(false);
const statusMessage = ref("Chunking your task...");
const router = useRouter();

const { isRecording, startRecording, stopRecording, cleanup } = useAudioRecorder();
const { transcribeAudio, isTranscribing, transcribedText, error: transcriptionError } = useTranscription();
const { createTask, isLoading: isTaskCreating, error: taskCreationError } = useTaskCreationRequest();

const questionRefs = ref<any[]>([]);
const recordAudioRef = ref<InstanceType<typeof RecordAudio> | null>(null);
const pressEnterRef = ref(null);
const transciption = ref("");

const processRecording = async (audioBlob: Blob) => {
    try {
        statusMessage.value = "Transcribing your recording...";
        const text = await transcribeAudio(audioBlob);
        console.log('Transcribed text:', text);
        transciption.value = text;

        statusMessage.value = "Creating your task...";
        const task = await createTask(text);

        if (task) {
            console.log('Task created:', task);
            statusMessage.value = "Task created! Redirecting...";

            setTimeout(() => {
                router.push(`/task/${task.id}`);
            }, 1000);
        } else {
            throw new Error("Failed to create task");
        }
    } catch (err) {
        console.error('Error in workflow:', err);
        statusMessage.value = "An error occurred. Please try again.";
        setTimeout(() => {
            loadingCreation.value = false;
        }, 2000);
    }
};

const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !loadingCreation.value) {
        loadingCreation.value = true;
        const audioBlob = await stopRecording();
        processRecording(audioBlob);
    } else if (event.key === 'Escape' && !isTaskCreating.value) {
        router.push('/');
    }
};

onMounted(() => {
    const questionElements = questionRefs.value
        .filter(Boolean)
        .map(el => el.$el);

    animate(
        questionElements,
        {
            opacity: [0, 1],
            y: [20, 0],
        },
        {
            delay: stagger(0.1),
            duration: 0.6,
            stiffness: 100,
            damping: 15
        }
    );

    animate(
        recordAudioRef?.value?.$el,
        {
            opacity: [0, 1],
            y: [20, 0],
        },
        {
            duration: 0.6,
            delay: 0.2,
            stiffness: 100,
            damping: 15
        }
    );

    animate(
        pressEnterRef.value,
        {
            opacity: [0, 1],
            y: [20, 0],
        },
        {
            duration: 0.6,
            delay: 0.4,
            stiffness: 100,
            damping: 15
        }
    );

    window.addEventListener('keydown', handleKeyDown);
    startRecording();
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
    stopRecording();
    cleanup();
});
</script>

<style scoped>
.parent {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: absolute;
    inset: 0;
    justify-content: center;
    align-items: center;

    background-image: radial-gradient(rgba(150, 150, 150, 0.2) 1px, transparent 0);
    background-size: 18px 18px;
    background-position: -19px -19px;
}


.questions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.question-tile {
    will-change: opacity, transform;
    opacity: 0;

}

.note {
    opacity: 0.3 !important;
}

.prompt {
    padding: 1rem;
    text-align: left;
    background-color: #171b42;
    border-radius: 0.25rem;
    border: #9ca2de 1px solid;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: clamp(400px, 50%, 1000px);

    h3 {
        color: #9ca2de;
    }
}
</style>