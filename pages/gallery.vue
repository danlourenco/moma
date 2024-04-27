<script setup lang="ts">
import type { ExhibitsApiResponse } from "~/types/index";
const { data, pending, error } = useFetch<ExhibitsApiResponse>("/api/exhibit");
</script>
<template>
  <h1>Gallery</h1>
  <div v-if="pending">Loading</div>
  <section v-else>
    <ArtExhibit
      v-for="exhibit in data.results"
      :exhibitData="exhibit"
      :key="exhibit.id"
    />
  </section>
</template>
