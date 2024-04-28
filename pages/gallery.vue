<script setup lang="ts">
import type { ExhibitsApiResponse } from "~/types/index";
const { data, pending, error } = useFetch<ExhibitsApiResponse>("/api/exhibit");
</script>
<template>
  <div v-if="pending">Loading</div>
  <div v-else-if="error">{{ error.message }}</div>
  <div v-else>
    <template v-if="data?.results.length">
      <ArtExhibit
        v-for="exhibit in data.results"
        :exhibitData="exhibit"
        :key="exhibit.id"
      />
    </template>
    <template v-else>
      <p>No exhibits found</p>
    </template>
  </div>
</template>
