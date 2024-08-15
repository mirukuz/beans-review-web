<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';
const { $graphql } = useNuxtApp();
// import { useAuth0 } from '@auth0/auth0-vue'
const query = gql`
query planets {
  allRoasters {
    id
    name
    address
    beans {
      name
      process
      review {
        content
        author {
          id
          name
        }
      }
    }
  }
}
`;
// const id = ref(1)
// const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0()
// const { data: product, pending, error } = await useFetch(() => `https://dummyjson.com/products/${id.value}`)
const { data } = await useAsyncData('planets', async () => {
  const data = await $graphql.default.request(query);
  return data;
});
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
    <pre>
      <code>DATA: {{ data }}</code>
    </pre>
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
    <NuxtLink class="underline" to="/">Back to Home</NuxtLink>
  </div>
</template>
