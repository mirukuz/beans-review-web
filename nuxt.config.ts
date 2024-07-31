// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      Auth0ClientId: process.env.AUTH0_CLIENT_ID,
      Auth0Domain: process.env.AUTH0_DOMAIN,
      Auth0RedirectUri: process.env.AUTH0_REDIRECT_URI,
    }
  },
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
