<script setup lang="ts">
// import { useAuth0 } from '@auth0/auth0-vue'
// const id = ref(1)
// const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0()
// const { data: product, pending, error } = await useFetch(() => `https://dummyjson.com/products/${id.value}`)
const { data, error, pending, refresh } = await useAsyncGql({
  operation: 'allBeans',
  // variables: { limit: 15 },
  options: {
    transform: (data) => data,
  }
})

if (error.value) {
  // eslint-disable-next-line no-console
  console.error(error.value)
}
/* Same as:
const { data: product, pending, error } = await useAsyncData(() => {
  return $fetch(`https://dummyjson.com/products/${id.value}`)
}, {
  watch: [id]
})
*/
// const login = async () => {
//   try {
//     await loginWithRedirect()
//   } catch (error) {
//     console.error('Login failed:', error)
//   }
// }
// https://stackoverflow.com/questions/74477187/how-to-implement-auth0-with-nuxt3

// const canDecrease = computed(() => id.value > 1)
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <NuxtLink v-for="item in data.allBeans" :key="item.id" :to="`/bean/${item.id}/details`">
        <UCard>
          <Placeholder class="h-32" />
          <template #footer>
            <div>{{ item.name }}</div>
          </template>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
