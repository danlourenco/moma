<script setup lang="ts">
import { SpeakerWaveIcon } from "@heroicons/vue/24/solid";
import type { Exhibit } from "~/types";

interface Props {
  exhibitData: Exhibit;
}
const props = defineProps<Props>();

const audioPlayer = ref(null);
const isPlaying = ref(false);

const srcUrls = {
  image: `${useRuntimeConfig().public.R2_BUCKET_BASE_URL}/${
    props.exhibitData.image_key
  }`,
  audio: props.exhibitData.audio_key
    ? `${useRuntimeConfig().public.R2_BUCKET_BASE_URL}/${
        props.exhibitData.audio_key
      }`
    : null,
};

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
  <section
    class="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:justify-center gap-8 min-w-full snap-start overflow-y-hidden lg:px-32"
  >
    <!-- Frame Container-->
    <div class="min-w-fit w-[70%] lg:w-1/2 lg:order-2">
      <ArtFrame :src="srcUrls.image" />
      <ArtLabel
        class="mt-4"
        :artist="props.exhibitData.artist"
        :artist-birth-year="2021"
        :medium="props.exhibitData.medium"
        :title="props.exhibitData.title"
        :year="props.exhibitData.year"
        :details="props.exhibitData.details"
      />
    </div>
    <div class="lg:order-1 lg:w-1/2">
      <div>
        <h2 class="font-serif text-2xl text-gray-800">
          {{ props.exhibitData.title }}
          <button @click="toggleAudio">
            <SpeakerWaveIcon class="size-4 text-slate-700" />
          </button>
        </h2>
        <p>{{ props.exhibitData.artist_statement }}</p>
        <audio
          v-if="srcUrls.audio"
          :src="srcUrls.audio"
          ref="audioPlayer"
        ></audio>
      </div>
    </div>
  </section>
</template>
