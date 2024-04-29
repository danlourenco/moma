<script setup lang="ts">
import { Howl } from "howler";

var sound = new Howl({
  src: ["jeopardy.mp3"],
  html5: true,
  loop: true,
});

const selectedImage = ref<null | File>(null);
const selectedImageDataUrl = ref<null | string>(null);
const imageUrl = computed(() => {
  return selectedImage.value ? URL.createObjectURL(selectedImage.value) : null;
});

const artistStatementRequestInFlight = ref(false);
const audioRequestInFlight = ref(false);

const artistStatement = ref<undefined | string>(undefined);
const title = ref<undefined | string>(undefined);
const audioSrc = ref("");

const generateArtistStatement = async () => {
  artistStatementRequestInFlight.value = true;
  const res = await $fetch("/api/artist-statement", {
    method: "POST",
    body: JSON.stringify({ image: selectedImageDataUrl.value }),
  });
  artistStatementRequestInFlight.value = false;
  const responseText = res.response.choices[0].message.content as string;

  const sentences = responseText.split(/\.\s/);
  title.value = sentences[0].replace(/\.$/, "");
  artistStatement.value = sentences.slice(1).join(". ");
};

const generateAudio = async () => {
  sound.play();
  audioRequestInFlight.value = true;
  const res = await $fetch("/api/audio", {
    method: "POST",
    body: JSON.stringify({ text: artistStatement.value }),
  });

  audioRequestInFlight.value = false;
  sound.fade(1, 0, 2000);
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
            <div class="mb-12">
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
            </div>
          </FormKit>
          <FormKit type="step" name="exhibitInfo">
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
              <Transition v-if="selectedImage">
                <button
                  type="button"
                  :disabled="!selectedImage || artistStatementRequestInFlight"
                  @click="generateArtistStatement"
                  class="btn btn-primary mb-2"
                >
                  {{
                    artistStatementRequestInFlight
                      ? "Generating, please wait..."
                      : "Generate Artist Statement"
                  }}
                </button>
              </Transition>

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

              <Transition v-if="artistStatement">
                <button
                  type="button"
                  :disabled="!artistStatement || audioRequestInFlight"
                  @click="generateAudio"
                  class="btn btn-primary mb-2"
                >
                  {{
                    audioRequestInFlight
                      ? "Generating Audio, please wait..."
                      : "Generate Audio"
                  }}
                </button>
              </Transition>
            </div>
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
      <audio
        name="audio"
        v-show="audioSrc"
        ref="audioEl"
        controls
        :src="audioSrc"
        class="mt-20"
      ></audio>
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
