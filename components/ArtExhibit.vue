<script setup lang="ts">
export interface Props {
  exhibitData: {
    id: number;
    title: string;
    artist: string;
    artistBirthYear: string;
    year: string;
    medium: string;
    details: string;
    src: string;
  };
}

const props = defineProps<Props>();
</script>
<template>
  <section
    class="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:justify-center gap-8 min-w-full snap-start overflow-y-hidden lg:px-32"
  >
    <!-- Frame Container-->
    <div class="min-w-fit w-[70%] lg:w-1/2 lg:order-2">
      <ArtFrame :src="props.exhibitData.src" />
    </div>
    <div class="lg:order-1 lg:w-1/2">
      <div>
        <h2 class="font-serif text-2xl text-gray-800">Artist Statement</h2>
        <p>Testing</p>
      </div>

      <!-- <ArtLabel
        :artist="props.exhibitData.artist"
        :artist-birth-year="props.exhibitData.artistBirthYear"
        :medium="props.exhibitData.medium"
        :title="props.exhibitData.title"
        :year="props.exhibitData.year"
        :details="props.exhibitData.details"
      /> -->
    </div>
  </section>
</template>
