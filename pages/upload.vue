<script setup lang="ts">
const selectedImage = ref<null | File>(null);
const selectedImageDataUrl = ref<null | string>(null);
const imageUrl = computed(() => {
  return selectedImage.value ? URL.createObjectURL(selectedImage.value) : null;
});

const artistStatement = ref<undefined | string>(undefined);
const title = ref<undefined | string>(undefined);
const audioSrc = ref("");

const generateArtistStatement = async () => {
  const res = await $fetch("/api/artist-statement", {
    method: "POST",
    body: JSON.stringify({ image: selectedImageDataUrl.value }),
  });

  const responseText = res.response.choices[0].message.content as string;

  const sentences = responseText.split(/\.\s/);
  title.value = sentences[0].replace(/\.$/, "");
  artistStatement.value = sentences.slice(1).join(". ");
};

const generateAudio = async () => {
  const res = await $fetch("/api/audio", {
    method: "POST",
    body: JSON.stringify({ text: artistStatement.value }),
  });
  audioSrc.value = URL.createObjectURL(res);
};

onMounted(() => {
  const imageUploadNode = getNode("imageUpload");
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
              :disabled="!selectedImage"
              @click="generateArtistStatement"
              class="btn btn-primary mb-2"
            >
              Generate Artist Statement
            </button>
            <TransitionGroup v-if="artistStatement">
              <FormKit
                type="text"
                name="Title"
                label="Title"
                v-model="title"
                validation="required"
              />
              <FormKit
                type="textarea"
                v-model="artistStatement"
                name="artistStatement"
                label="Artist Statement"
                validation="required"
              />
            </TransitionGroup>

            <button
              type="button"
              :disabled="!artistStatement"
              @click="generateAudio"
              class="btn btn-primary mb-2"
            >
              Generate Audio
            </button>
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
      <p>{{ title }}</p>
    </aside>
  </div>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
