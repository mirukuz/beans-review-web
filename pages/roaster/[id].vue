<template>
  <div class="flex flex-col md:flex-row mb-12">
    <div class="md:w-1/2">
      <img :src="data.roasterById.images?.[0]" :alt="`Roaster image ${data.roasterById.name}`" class="w-full h-auto" />
    </div>
    <div class="md:w-1/2 md:pl-4 mt-4 md:mt-0 flex flex-col text-left">
      <h1 class="text-center text-2xl"> {{ data.roasterById.name }} </h1>
      <div>
        <b>Description:</b> {{ data.roasterById.description }}
      </div>
      <div>
        <b>Country:</b> {{ data.roasterById.country }}
      </div>
    </div>
  </div>
  <div class="m-4">Beans by {{ data.roasterById.name }}</div>
  <div class="flex flex-col gap-2">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <NuxtLink v-for="item in data.roasterById.beans" :key="item.id" :to="`/bean/${item.id}/details`">
        <UCard>
          <img :src="item.images?.[0]" :alt="`Bean image ${item.name}`"
            class="h-32 w-full object-cover rounded-t-lg rounded-b-none" />
          <template #footer>
            <div>{{ item.name }}</div>
          </template>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute();
const { data, error } = await useAsyncGql('roasterById', { id: route.params.id })
</script>
