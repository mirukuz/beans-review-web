// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  extends: ["@nuxt/examples-ui"],

  modules: ["nuxt-graphql-request", "nuxt-graphql-request"],
  build: {
    transpile: ["nuxt-graphql-request"],
  },

  graphql: {
    clients: {
      default: {
        endpoint: "http://127.0.0.1:4000",
        options: {},
      },
    },
  },
});
