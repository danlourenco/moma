<script setup lang="ts">
import ExhibitDetailsForm from "~/components/ExhibitDetailsForm.vue";
const formStore = useFormStore();
const imageObjectUrl = computed(() => {
  return formStore.selectedImage
    ? URL.createObjectURL(formStore.selectedImage)
    : undefined;
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
        <ArtFrame :src="imageObjectUrl" />
        <ArtLabel
          v-show="formStore.artistName"
          :artist="formStore.artistName"
          :artistBirthYear="formStore.artistBirthYear"
          :title="formStore.title"
          :audio="formStore.audio"
          :medium="formStore.medium"
          :details="formStore.details"
          :statement="formStore.artistStatement"
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
