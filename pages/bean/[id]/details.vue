<template>
    <div class="flex flex-col md:flex-row mb-12">
        <div class="md:w-1/2">
            <img :src="data.beanById.images?.[0]" :alt="`Bean image ${data.beanById.name}`" class="w-full h-auto" />
        </div>
        <div class="md:w-1/2 md:pl-4 mt-4 md:mt-0 flex flex-col text-left">
            <h1 class="text-center text-2xl"> {{ data.beanById.name }} </h1>
            <div>
                <b>Description:</b> {{ data.beanById.description }}
            </div>
            <div>
                <b>Origin:</b> {{ data.beanById.origin }}
            </div>
            <div>
                <b>Process:</b> {{ data.beanById.process }}
            </div>
            <div>
                <b>TastingNotes:</b> {{ data.beanById.tastingNotes }}
            </div>
            <div>
                <b>Roaster:</b> {{ data.beanById.roaster?.name }}
            </div>
            <div>
                <b>Website:</b> {{ data.beanById.website }}
            </div>
            <UButton class="self-center mt-4" :to="`/bean/${$route.params.id}/add-review`">Have your say</UButton>
        </div>
    </div>
    <div class="flex flex-col text-left gap-4">
        <h2>Reviews:</h2>
        <ULandingTestimonial
        class="p-4"
            v-for="item in data.beanById.reviews" :key="item.id"
            :quote="item.content"
            :author="{ name: item.author.name, target: '_blank', avatar: { src: item.author.avatar, loading: 'lazy' } }"
            card
        />
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
