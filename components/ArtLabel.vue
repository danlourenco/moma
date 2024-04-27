<script setup lang="ts">
interface Props {
  artist: string;
  title: string;
  year?: string;
  medium?: string;
  details?: string;
}

const props = defineProps<Props>();
</script>
<template>
  <div
    class="p-4 font-sans border border-gray-300 shadow-2xl my-shadow bg-white"
  >
    <p class="text-lg mb-1">
      <span class="font-bold">{{ props.artist }}</span>
    </p>
    <p class="text-lg mb-1">
      <span class="font-bold italic">{{ props.title }}</span
      ><span v-if="props.year">, </span>
      <span v-if="props.year">{{ props.year }}</span>
    </p>
    <p v-if="props.medium" class="text-sm mb-2">{{ props.medium }}</p>
    <p v-if="props.details" class="text-xs">{{ props.details }}</p>
  </div>
</template>
