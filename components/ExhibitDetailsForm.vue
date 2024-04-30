<script setup lang="ts">
const medium = ref("");
const details = ref("");
</script>
<template>
  <FormKit type="step" name="exhibitDetails">
    <div class="mb-12">
      <FormKit
        id="imageUpload"
        type="file"
        label="Select an image"
        name="image"
        multiple="false"
        accept=".jpg,.jpeg,.png"
        validation="required"
      />
      <FormKit type="text" name="medium" label="Medium" v-model="medium" />
      <FormKit type="text" name="details" label="Details" v-model="details" />
    </div>
  </FormKit>
</template>
