// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    preset: "netlify-edge",
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@formkit/nuxt",
    "@pinia/nuxt",
  ],

  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true,
  },

  googleFonts: {
    families: {
      Inter: true,
      "Libre+Franklin": true,
    },
  },

  runtimeConfig: {
    openaiApiKey: "",
    elevenLabsKey: "",
    public: {
      r2BucketBaseUrl: "",
      baseApiUrl: "",
    },
  },
});
