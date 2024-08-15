<script setup lang="ts">
const navLeft = [
  {
    label: 'Bean',
    to: '/bean',
  },
  {
    label: 'Roaster',
    to: '/roaster',
  }
]
const navRight = [
  {
    label: 'Login',
    to: '/login',
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
        <div class="flex space-x-4">
          <div v-for="item in navRight" :key="item.label">
            <UButton :to="item.to">{{ item.label }}</UButton>
          </div>
        </div>
        <!-- <div>
          <ColorScheme>
            <USelect v-model="$colorMode.preference" :options="['system', 'light', 'dark']" />
          </ColorScheme>
        </div> -->
      </nav>
    </UContainer>

    <!-- Main Section -->
    <UContainer class="my-10 text-center">
      <NuxtPage />
    </UContainer>
  </div>
</template>