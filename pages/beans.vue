<script setup lang="ts">
const { data, error } = await useAsyncGql('allPublishedBeans')

if (error.value) {
  console.error(error.value)
}

</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-if="data?.allPublishedBeans?.length === 0">No Bean Found</div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <NuxtLink v-for="item in data.allPublishedBeans" :key="item.id" :to="`/bean/${item.id}/details`">
        <UCard>
          <img :src="item.images?.[0]" :alt="`Bean image ${item.name}`" class="h-32 w-full object-cover rounded-t-lg rounded-b-none" />
          <template #footer>
            <div>{{ item.name }}</div>
          </template>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
