<script setup lang="ts">
import { SpeakerWaveIcon } from "@heroicons/vue/24/solid";

interface Props {
  artist: string;
  artistBirthYear?: string | number;
  audio?: string;
  title: string;
  year?: Number | string;
  medium?: string;
  details?: string;
  statement?: string;
}
const props = defineProps<Props>();

const audioPlayer = ref(null);
const isPlaying = ref(false);

const toggleAudio = () => {
  if (!audioPlayer.value) return;
  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.play();
  }
  isPlaying.value = !isPlaying.value;
};
</script>
<template>
  <div class="p-4 font-sans border bg-white shadow-md">
    <p class="text-lg mb-1">
      <span class="font-bold">{{ props.artist }}</span>
      <span v-if="artistBirthYear" class=""
        >&nbsp; (b. {{ props.artistBirthYear }})</span
      >
    </p>
    <p class="text-lg mb-1">
      <span class="font-bold italic">{{ props.title }}</span
      ><span v-if="props.year">, </span>
      <span v-if="props.year">{{ props.year }}</span>
      <button @click="toggleAudio" v-if="props.audio">
        <SpeakerWaveIcon
          class="ml-2 size-4 text-slate-600"
          :class="isPlaying ? 'animate-pulse' : ''"
        />
      </button>
    </p>
    <p v-if="props.medium" class="text-sm mb-2">{{ props.medium }}</p>
    <p v-if="props.details" class="text-xs">{{ props.details }}</p>
    <p v-if="props.statement" class="mt-4 hidden lg:block text-sm">
      {{ props.statement }}
    </p>

    <audio :src="props.audio" ref="audioPlayer"></audio>
  </div>
</template>
