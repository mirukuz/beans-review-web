import { createAuth0 } from '@auth0/auth0-vue'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const auth0 = createAuth0({
    domain: `${config.public.Auth0Domain}`,
    clientId: `${config.public.Auth0ClientId}`,
    authorizationParams: { redirect_uri: `${config.public.Auth0RedirectUri}`, }
  })

  if (import.meta.client) {
    nuxtApp.vueApp.use(auth0)
  }

  addRouteMiddleware('auth', () => {
    if (import.meta.client) {
      auth0.checkSession()
      if (!auth0.isAuthenticated.value) {
        auth0.loginWithRedirect({
          appState: {
            target: useRoute().path,
          },
        })
      }
    }
  })
})