// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      Auth0ClientId: process.env.AUTH0_CLIENT_ID,
      Auth0Domain: process.env.AUTH0_DOMAIN,
      Auth0RedirectUri: process.env.AUTH0_REDIRECT_URI,
      imageServerUrl: process.env.IMAGE_SERVER_URL
    }
  },
  'graphql-client': {
    clients: {
      default: {
        host: process.env.GQL_HOST || 'https://beans-review-service.vercel.app/api',
      },
    },
  },
  extends: ['@nuxt/ui-pro'],
  modules: ["nuxt-graphql-client", "@nuxt/ui"],
});