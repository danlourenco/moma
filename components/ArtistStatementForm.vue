<script setup lang="ts"></script>

<template>
  <FormKit type="step" name="Artist Statement">
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
    <!-- using step slot for submit button-->
    <template #stepNext>
      <FormKit type="submit" />
    </template>
  </FormKit>
</template>
