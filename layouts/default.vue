<template>
  <!-- Container -->
  <div class="flex flex-col h-lvh">
    <!-- Nav -->
    <!-- <nav class="navbar">
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
    </nav> -->
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
          >
            <li><NuxtLink to="/about">About</NuxtLink></li>
            <li><NuxtLink to="/gallery">Gallery</NuxtLink></li>
          </ul>
        </div>
        <NuxtLink to="/" class="btn btn-ghost text-xl"
          >MoMA
          <span class="text-gray-500 text-xs hidden lg:flex"
            >| Museum of Munchkin Art</span
          >
        </NuxtLink>
      </div>
      <div class="navbar-end hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/gallery">Gallery</NuxtLink></li>
        </ul>
      </div>
    </div>
    <!-- Main container -->
    <main class="grow p-6">
      <slot />
    </main>
  </div>
</template>

<style scoped>
ul .router-link-active {
  text-decoration: underline;
  text-underline-offset: 0.5rem;
}
</style>
