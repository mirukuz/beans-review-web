// composables/useAuth.ts

import { useAuth0 } from '@auth0/auth0-vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, watch } from 'vue'
import { useAuthStore } from '@/store/auth'

export function useAuth() {
  const auth0 = import.meta.client ? useAuth0() : undefined
  const route = useRoute()
  const router = useRouter()
  const authStore = useAuthStore()

  const isAuthenticated = computed(() => {
    return !!auth0?.isAuthenticated.value
  })

  const user = computed(() => {
    return auth0?.user.value
  })

  const email = computed(() => {
    return auth0?.user.value?.email
  })

  const login = () => {
    auth0?.checkSession()
    if (!auth0?.isAuthenticated.value) {
      auth0?.loginWithRedirect({
        appState: {
          target: route.path,
        },
      })
    }
  }

  const logout = () => {
    router.push('/')
    authStore.setUserId(null)
    auth0?.logout({ logoutParams: { returnTo: window.location.origin } })
  }

  watch([isAuthenticated, user], async ([newIsAuthenticated, newUser]) => {
    if (!authStore.userId && newIsAuthenticated && newUser?.email && newUser?.name) {
      const response = await GqlSignupUser({
        data: {
          email: newUser?.email,
          name: newUser?.name,
          avatar: newUser?.picture,
        },
      })
      const userIdVal = response?.signupUser?.id
      userIdVal && authStore.setUserId(userIdVal)
    }
  })

  return {
    isAuthenticated,
    user,
    email,
    login,
    logout,
  }
}
