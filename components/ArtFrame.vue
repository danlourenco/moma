<script setup lang="ts">
export interface Props {
  src: string;
}
const defaultSrc = "https://placehold.co/600x420";
const props = withDefaults(defineProps<Props>(), {
  src: defaultSrc,
});
</script>
<template>
  <div class="frame">
    <div class="mat">
      <div class="art overflow-hidden">
        <img
          :src="props.src ? props.src : defaultSrc"
          alt=""
          class="object-cover"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.frame {
  aspect-ratio: 4 / 3;
  position: relative;
  width: 100%;
  background: black;
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.3),
    1px 1px 2px rgba(0, 0, 0, 0.2), 40px 35px 70px -10px rgba(0, 0, 0, 0.5),
    -20px -20px 100px -10px rgba(255, 255, 255, 0.8);
}
.mat {
  position: absolute;
  background: white;
  top: 3.0303%;
  bottom: 3.0303%;
  left: 2.5%;
  right: 2.5%;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset;
}

.art {
  position: absolute;
  top: 16.129%;
  bottom: 16.129%;
  left: 13.158%;
  right: 13.158%;
}

.art img {
  width: 100%;
}

.art:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset;
}
</style>
