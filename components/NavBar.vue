<template>
  <UHeader :links="filteredLinks">
    <template #logo>
      <a href="/" class="text-xl font-bold">{{ logoIcon }}</a>
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
import { ref, computed, watchEffect } from 'vue';
import { useAuth } from '~/composables/useAuth';

const userId = ref(getStoredUserId());
const { data, error: gqlError } = await fetchUserData(userId);

const { isAuthenticated, user, email, login, logout } = useAuth();
const allLinks = ref([]);
const dropdownItems = ref(getDropdownItems(email, logout));

watchEffect(() => {
  updateAllLinks(data, allLinks, login);
});

const filteredLinks = computed(() => {
  return filterLinks(allLinks, isAuthenticated);
});

const logoIcon = computed(() => {
  return data.value?.userById?.isAdmin ? '🔧' : '☕️';
});

// Helper Functions

function getStoredUserId() {
  if (import.meta.client) {
    return localStorage.getItem('userId');
  }
  return null;
}

async function fetchUserData(userId) {
  return await useAsyncGql('userById', { id: userId });
}

function getDropdownItems(email, logout) {
  return [
    [{
      label: email,
      slot: 'account',
      disabled: true
    }], 
    [{
      label: 'Settings',
      icon: 'i-heroicons-cog-8-tooth',
      to: '/settings'
    }], 
    [{
      label: 'Log out',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: logout
    }]
  ];
}

function updateAllLinks(data, allLinks, login) {
  if (data.value?.userById?.isAdmin) {
    allLinks.value = [
      { label: 'Beans', to: '/admin/beans' },
      { label: 'Roasters', to: '/admin/roasters' },
      { label: 'Submit new beans', to: '/bean/new' }
    ];
  } else {
    allLinks.value = [
      { label: 'Beans', to: '/beans' },
      { label: 'Roasters', to: '/roasters' },
      { label: 'Submit new beans', to: '/bean/new' },
      { label: 'Log in', click: login, requiresAuth: true }
    ];
  }
}

function filterLinks(linksRef, isAuthenticated) {
  return linksRef.value.filter(link => !link.requiresAuth || isAuthenticated.value);
}
</script>
