<template>
    <div class="flex flex-col md:flex-row mb-12">
        <div class="md:w-1/2">
            <img :src="data.beanById.image" :alt="`Bean image ${data.beanById.name}`" class="w-full h-auto" />
        </div>
        <div class="md:w-1/2 md:pl-4 mt-4 md:mt-0 flex flex-col">
            <h1> {{ data.beanById.name }} </h1>
            <div>
                {{ data.beanById.description }}
            </div>
            <UButton @click="togglePublish" class="self-center mt-4">{{ data.beanById.published ? 'Undo Publishing' :
                'Approve Publishing' }}
            </UButton>
            <UButton @click="deleteBean" class="self-center mt-4">Delete Bean
            </UButton>
        </div>
    </div>
    <div class="flex flex-col text-left">
        <div>Reviews:</div>
        <div v-for="item in data.beanById.reviews" :key="item.id">
            <strong>{{ item.author.name }}</strong> said: "{{ item.content }}"
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute();

const { data, error } = await useAsyncGql('beanById', { id: route.params.id })

const togglePublish = async () => {
    await GqlTogglePublishBean({
        id: route.params.id,
    })
    await navigateTo('/admin/beans')
}

const deleteBean = async () => {
    await GqlDeleteBean({
        id: route.params.id,
    })
    // TODO: delete s3 bucket
    await navigateTo('/admin/beans')

}

</script>
