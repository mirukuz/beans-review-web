<template>
  <UHeader :links="filteredLinks">
    <template #logo>
      <a href="/" class="text-xl font-bold">☕️</a>
    </template>

    <template #right>
      <UDropdown v-if="isAuthenticated" :items="dropdownItems" :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }">
        <UAvatar :src="user?.picture" alt="Avatar" />
        <template #account="{ item }">
          <div class="text-left">
            <p>Signed in as</p>
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
import { ref, computed, watchEffect, reactive, watch } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

// Reactive variables for user ID and admin status
const isAdmin = ref(false);
const userIdVariable = ref(authStore.userId)
const { isAuthenticated, user, email, login, logout } = useAuth();

// Reactive variables for all links and dropdown items
const allLinks = ref([]);
const dropdownItems = ref(getDropdownItems(email, logout));

const { data, error, refresh, execute } = await useAsyncGql('userById', { id: userIdVariable });

watch(() => authStore.userId, async (newUserId) => {
  if (newUserId) {
    userIdVariable.value = newUserId
    await refresh()
  }
})
// Watch for changes in user data to update isAdmin
watch(
  () => data.value?.userById?.isAdmin,
  (newIsAdmin) => {
    if (newIsAdmin !== undefined) {
      isAdmin.value = newIsAdmin;
    }
  }
);

// WatchEffect to update all links
watchEffect(() => {
  updateAllLinks(data, allLinks, login);
});

const filteredLinks = computed(() => filterLinks(allLinks.value, isAuthenticated));

function getDropdownItems(email, logout) {
  return [
    [
      {
        label: email,
        slot: 'account',
        disabled: true,
      },
    ],
    [
      {
        label: 'Settings',
        icon: 'i-heroicons-cog-8-tooth',
        to: '/settings',
      },
    ],
    [
      {
        label: 'Log out',
        icon: 'i-heroicons-arrow-left-on-rectangle',
        click: logout,
      },
    ],
  ];
}

function updateAllLinks(data, allLinks, login) {
  if (isAdmin.value) {
    allLinks.value = [
      { label: 'Beans', to: '/beans' },
      { label: 'Roasters', to: '/roasters' },
      { label: 'Submit new beans', to: '/bean/new' },
      { label: 'Submit new roaster', to: '/roaster/new' },
      { label: 'Edit Beans', to: '/admin/beans' },
      { label: 'Edit Roasters', to: '/admin/roasters' },
      { label: 'Log in', click: login, requiresAuth: true },
    ];
  } else {
    allLinks.value = [
      { label: 'Beans', to: '/beans' },
      { label: 'Roasters', to: '/roasters' },
      { label: 'Submit new beans', to: '/bean/new' },
      { label: 'Log in', click: () => {
        console.log("auth", user)
        login()
      }, requiresAuth: true },
    ];
  }
}

function filterLinks(links, isAuthenticated) {
  return links.filter(link => !link.requiresAuth || !isAuthenticated.value);
}

</script>
