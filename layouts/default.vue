<template>
  <!-- Container -->
  <div class="flex flex-col h-lvh">
    <!-- Nav -->
    <nav class="navbar">
      <div class="flex-1">
        <NuxtLink to="/" class="btn btn-ghost text-xl"
          >MoMA |
          <span class="text-gray-500 text-xs">Museum of Munchkin Art</span>
        </NuxtLink>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/upload">Upload</NuxtLink></li>
          <li><NuxtLink to="/gallery">Gallery</NuxtLink></li>
        </ul>
      </div>
    </nav>
    <!-- Main container -->
    <main class="grow p-6 bg-slate-300">
      <slot />
    </main>
  </div>
</template>
