<script setup lang="ts">
const formStore = useFormStore();
</script>
<template>
  <FormKit type="step" name="artistInfo">
    <div class="mb-12">
      <FormKit
        type="text"
        v-model="formStore.artistName"
        name="artistName"
        label="Artist name"
        validation="required"
      />
      <!-- <FormKit
        type="number"
        v-model="formStore.artistBirthYear"
        name="artistBirthYear"
        label="Artist Birth Year"
        min="1900"
        max="2024"
      /> -->
    </div>
  </FormKit>
</template>
