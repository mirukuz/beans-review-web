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
    <div v-if="data?.allRoasters?.length == 0">No Roaster Found</div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <NuxtLink v-for="item in data.allRoasters" :key="item.id" :to="`/admin/roaster/${item.id}`">
        <UCard>
          <img :src="item.images?.[0]" alt="Roaster image" class="h-32 w-full object-cover rounded-t-lg rounded-b-none" />
          <template #footer>
            <div>{{ item.name }} ({{ item.published ? 'Published' : 'Unpublished'}})</div>
          </template>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
