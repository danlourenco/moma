<script setup lang="ts">
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
    <div class="min-w-fit w-[70%] lg:w-2/3 lg:order-2">
      <ArtFrame :src="srcUrls.image" />
    </div>
    <div class="lg:order-1 lg:w-1/3">
      <ArtLabel
        class="mt-4"
        :audio="srcUrls.audio"
        :statement="props.exhibitData.artist_statement"
        :artist="props.exhibitData.artist"
        :artist-birth-year="2021"
        :medium="props.exhibitData.medium"
        :title="props.exhibitData.title"
        :year="props.exhibitData.year"
        :details="props.exhibitData.details"
      />
    </div>
  </section>
</template>
