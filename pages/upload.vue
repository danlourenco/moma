<script setup lang="ts">
import { Howl } from "howler";
import ExhibitDetailsForm from "~/components/ExhibitDetailsForm.vue";

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
          <ArtistInfoForm />
          <ExhibitDetailsForm />
          <ArtistStatementForm />
        </FormKit>
      </FormKit>
    </main>
    <aside class="flex-1">
      <div class="flex flex-col gap-8">
        <ArtFrame :src="imageUrl" />
        <ArtLabel
          v-show="artistName"
          :artist="artistName"
          :artistBirthYear="artistBirthYear"
          :title="title"
          :audio="audioSrc"
          :medium="medium"
          :details="details"
          :statement="artistStatement"
        />
      </div>
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
