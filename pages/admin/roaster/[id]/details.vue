<template>
    <div class="flex flex-col md:flex-row mb-12">
        <div class="md:w-1/2">
            <img :src="data.roasterById.image" :alt="`Roaster image ${data.roasterById.name}`" class="w-full h-auto" />
        </div>
        <div class="md:w-1/2 md:pl-4 mt-4 md:mt-0 flex flex-col">
            <h1> {{ data.roasterById.name }} </h1>
            <div>
                {{ data.roasterById.description }}
            </div>
            <UButton @click="togglePublish" class="self-center mt-4">{{ data.roasterById.published ? 'Undo Publishing' :
                'Approve Publishing' }}
            </UButton>
            <UButton @click="deleteRoaster" class="self-center mt-4">Delete Roaster
            </UButton>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute();

const { data, error } = await useAsyncGql('roasterById', { id: route.params.id })

const togglePublish = async () => {
    await GqlTogglePublishRoaster({
        id: route.params.id,
    })
    await navigateTo('/admin/roasters')
}

const deleteRoaster = async () => {
    await GqlDeleteRoaster({
        id: route.params.id,
    })
    // TODO: delete s3 bucket
    await navigateTo('/admin/roasters')

}

</script>
