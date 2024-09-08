<template>
  <UHeader :links="filteredLinks">
    <template #logo>
      <a href="/" class="text-xl font-bold">☕️</a>
    </template>

    <template #right>
        <UDropdown v-if="isAuthenticated" :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
          :popper="{ placement: 'bottom-start' }">
          <UAvatar :src="user?.picture" alt="Avatar" />
          <template #account="{ item }">
            <div class="text-left">
              <p>
                Signed in as
              </p>
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ item.label }}
              </p>
            </div>
          </template>

          <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
          </template>
        </UDropdown>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { isAuthenticated, user, email, login, logout } = useAuth()

const items = [
  [{
    label: email,
    slot: 'account',
    disabled: true
  }], [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    to: '/settings'
  }], [{
    label: 'Log out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: logout
  }]
]

const allLinks = ref([
  {
    label: 'Beans',
    to: '/beans',
  },
  {
    label: 'Roasters',
    to: '/roasters',
  },
  {
    label: 'Submit new beans',
    to: '/bean/new',
  },
  {
    label: 'Log in',
    click: login,
    requiresAuth: true
  }
])

const filteredLinks = computed(() => {
  return allLinks.value.filter(link => !link.requiresAuth || !isAuthenticated.value);
});

</script>
