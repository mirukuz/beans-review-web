<template>
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
          <template v-if="isAuthenticated === null || isAuthenticated === undefined">
            <div>loading...</div>
          </template>
          <template v-else-if="isAuthenticated === false">
            <UButton @click="login">Log In</UButton>
          </template>
          <template v-else>
            <UButton :to="`/bean/new`">Submit new bean!</UButton>
            <UButton @click="logout">Log Out</UButton>
            <nuxt-link v-if="user" to="/profile">
              <UAvatar :src="user?.picture" alt="Avatar" />
            </nuxt-link>
          </template>
        </div>
      </nav>
    </UContainer>
  </template>
  
  <script setup lang="ts">
  import { useAuth } from '~/composables/useAuth'
  
  const { isAuthenticated, user, login, logout } = useAuth()
  
  const navLeft = [
    {
      label: 'Beans',
      to: '/beans',
    },
    {
      label: 'Roasters',
      to: '/roasters',
    },
  ]
  </script>