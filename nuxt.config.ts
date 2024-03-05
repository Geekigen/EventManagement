// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public:{
      apiUrl: process.env.NUXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000",
      altImgUrl: process.env.ALT_IMG_URL
    }
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    ["@pinia/nuxt",{
      autoImports: ['defineStore', 'acceptHMRUpdate']
    }],
    '@pinia-plugin-persistedstate/nuxt',
  ],
})