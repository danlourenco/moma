<script setup lang="ts">
import type { ExhibitsApiResponse } from "~/types/index";
import { ArrowRightIcon } from "@heroicons/vue/24/solid";
import { Howl } from "howler";

const { data, pending, error } = useFetch<ExhibitsApiResponse>("/exhibits", {
  baseURL: useRuntimeConfig().public.baseApiUrl,
});
</script>
<template>
  <div v-if="pending">Loading</div>
  <div v-else-if="error">{{ error.message }}</div>
  <div
    v-else
    class="scroll-smooth overflow-x-scroll snap-x snap-mandatory flex h-full"
  >
    <section
      class="flex flex-col justify-center items-center gap-8 min-w-full snap-start overflow-y-hidden lg:px-32"
    >
      <div class="flex flex-row gap-4 justify-center items-center">
        <template v-if="data.data?.length">
          <div>
            <h1 class="text-3xl">Welcome to the MoMA Gallery</h1>
            <p>Scroll right to view our exhibits.</p>
          </div>
          <ArrowRightIcon class="size-8 text-slate-600 animate-pulse" />
        </template>
        <template v-else>
          <h1 class="text-3xl">No Exhibits Available</h1>
          <p>Please return after images have been uploaded</p>
        </template>
      </div>
    </section>
    <template v-if="data?.data?.length">
      <ArtExhibit
        v-for="exhibit in data.data"
        :exhibitData="exhibit"
        :key="exhibit.id"
      />
    </template>
  </div>
</template>
