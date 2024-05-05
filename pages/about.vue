<template>
  <div>
    <h1>About</h1>
    <main class="flex flex-row gap-4">
      <NuxtImg
        src="/images/Rui.jpg"
        alt="RA Lourenço demonstrating holding up his artwork and smiling"
        sizes="30vw sm:50vw md:400px"
        :modifiers="{ rotate: 90 }"
        class="-rotate-1 drop-shadow-2xl"
        preload
      />
      <p>
        The Museum of Munchkin Art is a collection of art created by this kiddo.
        More info coming soon.
      </p>
    </main>
  </div>
</template>
