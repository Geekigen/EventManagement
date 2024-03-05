// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/cloudinary",
    ["@pinia/nuxt",{
      autoImports: ['defineStore', 'acceptHMRUpdate']
    }],
    '@pinia-plugin-persistedstate/nuxt',

  ],
  cloudinary: {
    cloudName: 'di2a8gjsq',
  },
})