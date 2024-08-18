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
      <UCard v-for="item in data.allBeans" :key="item.id">
        <Placeholder class="h-32" />

        <template #footer>
          <div>{{ item.name }}</div>
        </template>
      </UCard>
    </div>
  </div>
  <!-- <pre v-if="isAuthenticated">
      <code>USER: {{ user }}</code>
    </pre>
    <button @click="login">login</button> -->
  <!-- <p class="flex items-center gap-2">
      Result of <code>https://dummyjson.com/products/</code>
      <UInput type="number" v-model="id" />
    </p>
    <p>
      <UButton :disabled="!canDecrease" @click="canDecrease ? id-- : null">Previous</UButton>
      -
      <UButton @click="id++">Next</UButton>
    </p>
    <p v-if="pending">Fetching...</p>
    <pre v-else-if="error">{{ error }}</pre>
    <pre v-else>{{ product }}</pre> -->
</template>
