<script setup lang="ts">
const { data, error } = await useAsyncGql('allBeans')

if (error.value) {
  console.error(error.value)
}

</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <NuxtLink v-for="item in data.allBeans" :key="item.id" :to="`/bean/${item.id}/details`">
        <UCard>
          <img :src="item.photo" :alt="`Bean photo ${item.name}`" class="h-32 w-full object-cover rounded-t-lg rounded-b-none" />
          <template #footer>
            <div>{{ item.name }}</div>
          </template>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
