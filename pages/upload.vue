<script setup lang="ts">
const selectedImage = ref<null | File>(null);
const selectedImageDataUrl = ref<null | string>(null);
const imageUrl = computed(() => {
  return selectedImage.value ? URL.createObjectURL(selectedImage.value) : null;
});

const artistStatement = ref<undefined | string>(undefined);

const generateArtistStatement = async () => {
  const res = await $fetch("/api/artist-statement", {
    method: "POST",
    body: JSON.stringify({ image: selectedImageDataUrl.value }),
  });
  artistStatement.value = res.response.choices[0].message.content as string;
};

onMounted(() => {
  const imageUploadNode = getNode("imageUpload");
  if (!imageUploadNode) return;
  imageUploadNode.on("commit", ({ payload }) => {
    const file = payload[0].file;
    selectedImage.value = file;
    toBase64(file).then((res) => (selectedImageDataUrl.value = res));
  });
});
</script>

<template>
  <div class="flex gap-4 w-full">
    <main class="flex-1">
      <FormKit type="form" :actions="false">
        <FormKit type="multi-step" tab-style="progress">
          <FormKit type="step" name="artistInfo">
            <FormKit
              type="text"
              name="artistName"
              label="Artist name"
              validation="required"
            />
            <FormKit
              type="number"
              name="artistBirthYear"
              label="Artist Birth Year"
              min="1900"
              max="2024"
            />
          </FormKit>
          <FormKit type="step" name="exhibitInfo">
            <FormKit
              id="imageUpload"
              type="file"
              label="Select an image"
              name="image"
              multiple="false"
              accept=".jpg,.jpeg,.png"
              validation="required"
            />
            <button
              type="button"
              @click="generateArtistStatement"
              class="btn btn-secondary mb-2"
            >
              Generate Artist Statement
            </button>
            <FormKit
              type="textarea"
              v-model="artistStatement"
              name="artistStatement"
              label="Artist Statement"
              validation="required"
            />
          </FormKit>

          <FormKit type="step" name="review">
            <StepThree />

            <!-- using step slot for submit button-->
            <template #stepNext>
              <FormKit type="submit" />
            </template>
          </FormKit>
        </FormKit>
      </FormKit>
    </main>
    <aside class="flex-1">
      <ArtFrame :src="imageUrl" />
    </aside>
  </div>
</template>
