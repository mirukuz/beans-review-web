<template>
    <div class="flex flex-col md:flex-row mb-12">
        <div class="md:w-1/2">
            <img :src="data.beanById.photo" :alt="`Bean photo ${data.beanById.name}`" class="w-full h-auto" />
        </div>
        <div class="md:w-1/2 md:pl-4 mt-4 md:mt-0 flex flex-col">
            <h1> {{ data.beanById.name }} </h1>
            <div>
                {{ data.beanById.description }}
            </div>
            <UButton class="self-center mt-4" :to="`/bean/${$route.params.id}/add-review`">Have your say</UButton>
        </div>
    </div>
    <div class="flex flex-col text-left">
        <div>Reviews:</div>
        <div v-for="item in data.beanById.review" :key="item.id">
            <strong>{{ item.author.name }}</strong> said: "{{ item.content }}"
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
//   import Profile from '~/components/Profile.vue';
//   import Dimension from '~/components/Dimension.vue';
//   import Reviews from '~/components/Reviews.vue';

const route = useRoute();
const { data, error } = await useAsyncGql('beanById', { id: route.params.id })
</script>
