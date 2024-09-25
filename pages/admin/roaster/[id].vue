<template>
    <div class="flex flex-col md:flex-row mb-12">
        <div class="md:w-1/2">
            <img :src="data.roasterById.images?.[0]" :alt="`Roaster image ${data.roasterById.name}`" class="w-full h-auto" />
        </div>
        <div class="md:w-1/2 md:pl-4 mt-4 md:mt-0 flex flex-col text-left">
            <h1 class="text-center text-2xl"> {{ data.roasterById.name }} </h1>
            <div>
                <b>description:</b> {{ data.roasterById.description }}
            </div>
            <div>
                <b>origin:</b> {{ data.roasterById.country }}
            </div>
            <div class="flex gap-4">
            <UButton @click="togglePublish" class="self-center mt-4">{{ data.roasterById.published ? 'Undo Publishing' :
                'Approve Publishing' }}
            </UButton>
            <UButton @click="deleteRoaster" class="self-center mt-4">Delete Roaster
            </UButton>
            <UButton class="self-center mt-4" :to="`/roaster/${data.roasterById.id}`">Preview</UButton>
        </div>
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
