<script setup lang="ts">
const formStore = useFormStore();

const handleGenerateAudio = async () => {
  // sound.play();
  await formStore.generateAudio();
  // sound.fade(1, 0, 2000);
};
</script>

<template>
  <FormKit type="step" name="Artist Statement">
    <div class="mb-12">
      <Transition v-if="formStore.selectedImage">
        <button
          type="button"
          :disabled="
            !formStore.selectedImage || formStore.artistStatementRequestInFlight
          "
          @click="formStore.generateArtistStatement"
          class="btn btn-primary mb-2"
        >
          {{
            formStore.artistStatementRequestInFlight
              ? "Generating, please wait..."
              : "Generate Artist Statement"
          }}
        </button>
      </Transition>

      <FormKit
        type="text"
        name="Title"
        label="Title"
        v-model="formStore.title"
        validation="required"
      />
      <FormKit
        type="textarea"
        v-model="formStore.artistStatement"
        name="artistStatement"
        label="Artist Statement"
        validation="required"
      />

      <Transition v-if="formStore.artistStatement">
        <button
          type="button"
          :disabled="
            !formStore.artistStatement || formStore.audioRequestInFlight
          "
          @click="handleGenerateAudio"
          class="btn btn-primary mb-2"
        >
          {{
            formStore.audioRequestInFlight
              ? "Generating Audio, please wait..."
              : "Generate Audio"
          }}
        </button>
      </Transition>
    </div>

    <!-- using step slot for submit button-->
    <template #stepNext>
      <FormKit type="submit" />
    </template>
  </FormKit>
</template>
