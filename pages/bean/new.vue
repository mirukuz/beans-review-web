<script setup lang="ts">
import { z } from 'zod'
import { TastingNote, Process, Origin } from '#gql/default';
import type { FormError, FormSubmitEvent } from '#ui/types'
import { useAuth } from '~/composables/useAuth'

const { email, isAuthenticated } = useAuth()
const { data: roasters, error, refresh } = await useAsyncGql({
    operation: 'allRoasters',
    options: {
        transform: (data) => data.allRoasters?.map(ar => ({
            label: ar.name,
            value: ar.id
        })),
    }
})

if (error.value) {
    console.error(error.value)
}

const state = reactive({
    name: "",
    description: "",
    website: "",
    roasterId: undefined,
    tastingNotes: [],
    cannotFindRoaster: false,
    process: undefined,
    origin: undefined,
})

const result = ref(null)
const origins = Object.values(Origin);
const processes = Object.values(Process);
const tastingNotes = Object.values(TastingNote);

const isRoasterRequired = computed(() => !state.cannotFindRoaster)

const schema = z.object({
    name: z.string().nonempty({ message: 'Required' }),
    description: z.string().nonempty({ message: 'Required' }),
    website: z.string().nonempty({ message: 'Required' }).url('Invalid URL'),
    tastingNotes: z.array(z.nativeEnum(TastingNote)).min(1, { message: 'Required' }),
    origin: z.nativeEnum(Origin, { errorMap: () => ({ message: 'Required' }) }),
    process: z.nativeEnum(Process, { errorMap: () => ({ message: 'Required' }) }),
    roasterId: z.string().optional().refine(value => !isRoasterRequired.value || (value && value !== ""), {
        message: 'Required'
    })
})

type Schema = z.infer<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const userId = localStorage.getItem('userId')
    const validationResult = schema.safeParse(state);

    if (!validationResult.success) {
        console.log('Validation Error:', validationResult.error);
        return; // Prevent form submission
    }

    const validatedData = validationResult.data;
    if (userId) {
        const { createBean } = await GqlCreateBean({
            data: {
                name: validatedData.name,
                description: validatedData.description,
                website: validatedData.website,
                roasterId: validatedData.roasterId ?? "",
                tastingNotes: validatedData.tastingNotes,
                origin: validatedData.origin,
                process: validatedData.process,
            },
            submitterId: userId
        })
        result.value = createBean
    }
}
</script>

<template>
    <div v-if="result">
        Request Submitted
    </div>
    <UForm ref="form" :schema="schema" :state="state" v-else class="space-y-4 mx-auto w-full lg:w-1/2"
        @submit="onSubmit">
        <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="Description" name="description">
            <UTextarea resize v-model="state.description" type="content" />
        </UFormGroup>

        <UFormGroup label="Website" name="website">
            <UInput v-model="state.website" />
        </UFormGroup>
        <UFormGroup label="Tasting Note" name="tastingNotes">
            <div class="flex flex-wrap gap-x-4 gap-y-2">
                <UCheckbox v-model="state.tastingNotes" v-for="tastingNote in tastingNotes" :key="tastingNote"
                    :label="tastingNote" :value="tastingNote" />
            </div>
        </UFormGroup>
        <div class="flex space-x-4">
            <UFormGroup class="flex-1" label="Process" name="process">
                <USelect v-model="state.process" :options="processes" placeholder="Select Process" />
            </UFormGroup>
            <UFormGroup class="flex-1" label="Origin" name="origin">
                <USelect v-model="state.origin" :options="origins" placeholder="Select Origin" />
            </UFormGroup>
        </div>
        <div class="space-y-2">
            <UFormGroup label="Roaster" name="roasterId">
                <USelect v-model="state.roasterId" :options="roasters" :disabled="state.cannotFindRoaster"
                    placeholder="Select Roaster" />
            </UFormGroup>
            <div class="flex items-center">
                <UCheckbox v-model="state.cannotFindRoaster" label="Cannot find the roaster" />
            </div>
        </div>

        <div class="flex justify-end">
            <UButton :disabled="!isAuthenticated" type="submit">
                Submit
            </UButton>
        </div>
    </UForm>
</template>
