// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: true,
  modules: ["@nuxt/image", "@vueuse/nuxt", "@nuxt/icon"],
  css: ["bootstrap/dist/css/bootstrap.min.css"],
});
