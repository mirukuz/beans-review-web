<template>
    <div class="flex flex-col md:flex-row mb-12">
        <div class="md:w-1/2">
            <img :src="data.beanById.images?.[0]" :alt="`Bean image ${data.beanById.name}`" class="w-full h-auto" />
        </div>
        <div class="md:w-1/2 md:pl-4 mt-4 md:mt-0 flex flex-col text-left">
            <div>
                <template v-if="editMode">
                    <UFormGroup label="Name" name="name">
                        <UInput v-model="state.name" />
                    </UFormGroup>
                </template>
                <template v-else>
                    <b>Name:</b> {{ data.beanById.name }}
                </template>
            </div>

            <div>
                <template v-if="editMode">
                    <UFormGroup label="Description" name="description">
                        <UTextarea resize v-model="state.description" type="content" />
                    </UFormGroup>
                </template>
                <template v-else>
                    <b>Description:</b> {{ data.beanById.description }}
                </template>
            </div>

            <div>
                <template v-if="editMode">
                    <UFormGroup class="flex-1" label="Origin" name="origin">
                        <USelect v-model="state.origin" :options="origins" placeholder="Select Origin" />
                    </UFormGroup>
                </template>
                <template v-else>
                    <b>Origin:</b>
                    {{ data.beanById.origin }}
                </template>
            </div>

            <div>
                <template v-if="editMode">
                    <UFormGroup class="flex-1" label="Process" name="process">
                        <USelect v-model="state.process" :options="processes" placeholder="Select Process" />
                    </UFormGroup>
                </template>
                <template v-else>
                    <b>Process:</b>
                    {{ data.beanById.process }}
                </template>
            </div>

            <div>
                <template v-if="editMode">
                    <UFormGroup label="Tasting Notes" name="tastingNotes">
                        <div v-if="editMode" class="flex flex-wrap gap-x-4 gap-y-2">
                            <UCheckbox v-model="state.tastingNotes" v-for="tastingNote in tastingNotes"
                                :key="tastingNote" :label="tastingNote" :value="tastingNote" />
                        </div>
                    </UFormGroup>
                </template>
                <template v-else>
                    <b>Tasting Notes:</b>
                    {{ data.beanById.tastingNotes }}
                </template>
            </div>

            <div>
                <template v-if="editMode">
                    <UFormGroup label="Roaster" name="roasterId">
                        <USelect v-model="state.roasterId" :options="roasters" placeholder="Select Roaster" />
                    </UFormGroup>
                </template>
                <template v-else>
                    <b>Roaster:</b>
                    {{ data.beanById.roaster?.name }}
                </template>
            </div>

            <div>
                <template v-if="editMode">
                    <UFormGroup label="Website" name="website">
                        <UInput v-model="state.website" />
                    </UFormGroup>
                </template>
                <template v-else>
                    <b>Website:</b>
                    {{ data.beanById.website }}
                </template>
            </div>

            <div class="flex gap-4">
                <UButton v-if="!editMode" @click="togglePublish" class="self-center mt-4">{{ data.beanById.published ? 'Undo Publishing'
                    : 'ApprovePublishing' }}</UButton>

                <UButton v-if="!editMode" @click="enterEditMode" class="self-center mt-4">Edit Bean</UButton>
                <UButton v-if="editMode" @click="saveChanges" class="self-center mt-4">Save</UButton>
                <UButton v-if="editMode" @click="exitEditMode" class="self-center mt-4">Cancel</UButton>

                <UButton v-if="!editMode" @click="deleteBean" class="self-center mt-4">Delete Bean</UButton>

                <UButton v-if="!editMode" class="self-center mt-4" :to="`/bean/${data.beanById.id}/details`">Preview</UButton>
            </div>
        </div>
    </div>

    <div class="flex flex-col text-left gap-4">
        <h2>Reviews:</h2>
        <ULandingTestimonial class="p-4" v-for="item in data.beanById.reviews" :key="item.id" :quote="item.content"
            :author="{ name: item.author.name, target: '_blank', avatar: { src: item.author.avatar, loading: 'lazy' } }"
            card />
    </div>
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { z } from 'zod';
import { TastingNote, Process, Origin } from '#gql/default';
import { useAuthStore } from '@/store/auth';

const route = useRoute();
const { data, error, refresh } = await useAsyncGql('beanById', { id: route.params.id as string });

const authStore = useAuthStore();

const state = reactive({
    id: undefined,
    name: undefined,
    description: undefined,
    website: undefined,
    images: [],
    roasterId: undefined,
    tastingNotes: [],
    cannotFindRoaster: false,
    process: undefined,
    origin: undefined,
});

const schema = z.object({
    id: z.string({ message: 'Required' }),
    name: z.string({ message: 'Required' }),
    images: z.array(z.string().url('Invalid URL')),
    description: z.string({ message: 'Required' }),
    website: z.string(),
    tastingNotes: z.array(z.nativeEnum(TastingNote)).min(1, { message: 'Required' }),
    origin: z.nativeEnum(Origin, { errorMap: () => ({ message: 'Required' }) }),
    process: z.nativeEnum(Process, { errorMap: () => ({ message: 'Required' }) }),
    roasterId: z.string({ message: 'Required' }),
});

const editMode = ref(false);
const result = ref(null);
const origins = Object.values(Origin);
const processes = Object.values(Process);
const tastingNotes = Object.values(TastingNote);

const enterEditMode = () => {
    editMode.value = true;
    state.id = data.value.beanById?.id;
    state.name = data.value.beanById?.name;
    state.description = data.value.beanById?.description;
    state.website = data.value.beanById?.website;
    state.images = data.value.beanById?.images;
    state.roasterId = data.value.beanById?.roaster?.id;
    state.tastingNotes = data.value.beanById?.tastingNotes;
    state.process = data.value.beanById?.process;
    state.origin = data.value.beanById?.origin;
};

const { data: roasters, error: errorFetchingRoasters } = await useAsyncGql({
    operation: 'allPublishedRoasters',
    options: {
        transform: (data) => data.allPublishedRoasters?.map(ar => ({
            label: ar.name,
            value: ar.id
        })),
    }
})

const exitEditMode = () => {
    editMode.value = false;
}

const saveChanges = async () => {
    const validationResult = schema.safeParse(state);

    if (!validationResult.success) {
        console.log('Validation Error:', validationResult.error);
        return;
    }

    const validatedData = validationResult.data;

    if (route.params.id) {
        const { updateBean } = await GqlUdpateBean({
            id: route.params.id as string,
            data: validatedData,
        });
        result.value = updateBean;
        editMode.value = false;
    }

    await refresh()
};

const deleteBean = async () => {
    await GqlDeleteBean({
        id: route.params.id,
    });
    // TODO: delete s3 bucket
    await navigateTo('/admin/beans');
};

const togglePublish = async () => {
    await GqlTogglePublishBean({
        id: route.params.id,
    });
    await navigateTo('/admin/beans');
};
</script>