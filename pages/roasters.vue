<script setup lang="ts">
const { data, error, pending, refresh } = await useAsyncGql({
  operation: 'allRoasters',
  // variables: { limit: 15 },
  options: {
    transform: (data) => data,
  }
})

if (error.value) {
  // eslint-disable-next-line no-console
  console.error(error.value)
}

</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <NuxtLink v-for="item in data.allRoasters" :key="item.id" :to="`/roaster/${item.id}`">
        <UCard>
          <Placeholder class="h-32" />

          <template #footer>
            <div>{{ item.name }}</div>
          </template>
        </UCard>
      </NuxtLink>
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
