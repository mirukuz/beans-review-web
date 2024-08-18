<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import { NuxtLink } from '#components'
// Composition API
const auth0 = import.meta.client ? useAuth0() : undefined

const isAuthenticated = computed(() => {
  return auth0?.isAuthenticated.value
})

const login = () => {
  auth0?.checkSession()
  if (!auth0?.isAuthenticated.value) {
    auth0?.loginWithRedirect({
      appState: {
        target: useRoute().path,
      },
    })
  }
}

const logout = () => {
  navigateTo('/')
  auth0?.logout()
}
const navLeft = [
  {
    label: 'Bean',
    to: '/beans',
  },
  {
    label: 'Roaster',
    to: '/roasters',
  }
]
</script>

<template>
  <div>
    <!-- Header Section -->
    <UContainer class="py-4">
      <nav class="flex justify-between items-center">
        <div class="flex space-x-4">
          <div v-for="item in navLeft" :key="item.label">
            <UButton :to="item.to">{{ item.label }}</UButton>
          </div>
        </div>
        <div class="absolute left-1/2 transform -translate-x-1/2">
          <a href="/" class="text-xl font-bold">Bean Reviews</a>
        </div>
        <div class="flex space-x-4">
          <UButton>
            <a v-if="!isAuthenticated" @click="login">
              <slot>Log In</slot>
            </a>
            <a v-else @click="logout">
              <slot>Log Out</slot>
            </a>
          </UButton>
        </div>
      </nav>
    </UContainer>
    <!-- <div>
      <ColorScheme>
        <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
      </ColorScheme>
    </div> -->

    <!-- Main Section -->
    <UContainer class="my-10 text-center">
      <NuxtPage />
    </UContainer>
  </div>
</template>