// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],

  css: [
    "weather-icons/css/weather-icons.css",
    // "weather-icons/css/weather-icons-wind.css",
  ],

  runtimeConfig: {
    public: {
      weatherApiKey: process.env.WEATHER_API_KEY,
    },
  },
});
