<script setup lang="ts">
const formStore = useFormStore();

onMounted(() => {
  const imageUploadNode = getNode("imageUpload");
  if (!imageUploadNode) return;

  imageUploadNode.on("commit", ({ payload }) => {
    formStore.selectedImage = payload[0].file;
  });
});
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
      <FormKit
        type="text"
        name="medium"
        label="Medium"
        v-model="formStore.medium"
      />
      <FormKit
        type="text"
        name="details"
        label="Details"
        v-model="formStore.details"
      />
    </div>
  </FormKit>
</template>
