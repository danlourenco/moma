// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    preset: "cloudflare-pages",
  },

  modules: [
    "nitro-cloudflare-dev",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
  ],

  googleFonts: {
    families: {
      Inter: true,
      "Libre+Franklin": true,
    },
  },
  runtimeConfig: {
    public: {
      R2_BUCKET_BASE_URL: "https://pub-57cd0c122ab049be96d085705d7eddd5.r2.dev",
    },
  },
});
