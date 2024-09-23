<script setup lang="ts">
import { z } from 'zod'
import { TastingNote, Process, Origin } from '#gql/default';
import type { FormError, FormSubmitEvent } from '#ui/types'
import { useAuth } from '~/composables/useAuth'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

const config = useRuntimeConfig();

const { isAuthenticated } = useAuth()
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
    id: undefined,
    name: undefined,
    description: undefined,
    website: undefined,
    image: undefined,
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

const schema = z.object({
    id: z.string({ message: 'Required' }),
    name: z.string({ message: 'Required' }),
    image: z.string().url('Invalid URL'),
    description: z.string({ message: 'Required' }),
    website: z.string({ message: 'Required' }).url('Invalid URL'),
    tastingNotes: z.array(z.nativeEnum(TastingNote)).min(1, { message: 'Required' }),
    origin: z.nativeEnum(Origin, { errorMap: () => ({ message: 'Required' }) }),
    process: z.nativeEnum(Process, { errorMap: () => ({ message: 'Required' }) }),
    roasterId: z.string({ message: 'Required' })
})

type Schema = z.infer<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const userId = authStore.userId
    const validationResult = schema.safeParse(state);

    if (!validationResult.success) {
        console.log('Validation Error:', validationResult.error);
        return; // Prevent form submission
    }

    const validatedData = validationResult.data;
    if (userId) {
        const { createBean } = await GqlCreateBean({
            data: {
                id: validatedData.id,
                name: validatedData.name,
                description: validatedData.description,
                website: validatedData.website,
                image: validatedData.image,
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

import { ref } from 'vue'
const form = ref()

const file = ref(null)
const uploading = ref(false)

const handleFileChange = (files: FileList) => {
    console.log("files", files)
    if (files) {
        file.value = files[0]
        console.log("file.value", file.value)
    }
}

const handleFileUpload = async () => {
    if (!file.value) {
        alert('Please select a file to upload.')
        return
    }

    uploading.value = true

    try {
        const response = await fetch(
            config.public.imageServerUrl + '/api/upload',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename: file.value.name, contentType: file.value.type }),
            }
        )

        if (response.ok) {
            const { url, fields, folderName } = await response.json()
            state.id = folderName

            const formData = new FormData()
            Object.entries(fields).forEach(([key, value]) => {
                formData.append(key, value)
            })
            formData.append('file', file.value)

            const uploadResponse = await fetch(url, {
                method: 'POST',
                body: formData,
            })

            if (uploadResponse.ok) {
                alert('Upload successful!')
                const imageUrl = `${url}${fields.key}`
                state.image = imageUrl
                form.value.validate('image')
                console.log("uploadResponse", imageUrl)
            } else {
                console.error('S3 Upload Error:', uploadResponse)
                alert('Upload failed.')
            }
        } else {
            alert('Failed to get pre-signed URL.')
        }
    } catch (error) {
        console.error('Upload error:', error)
        alert('An error occurred during upload.')
    } finally {
        uploading.value = false
    }
}
</script>

<template>
    <div v-if="result">
        Request Submitted
    </div>
    <UForm ref="form" :schema="schema" :state="state" v-else class="space-y-4 mx-auto w-full lg:w-1/2"
        @submit="onSubmit">
        <UFormGroup label="Image" name="image">
            <div class="flex flex-wrap gap-x-4 gap-y-2">
                <UInput class="flex-1" id="file" type="file" @change="handleFileChange"
                    accept="image/png, image/jpeg" />
                <UButton @click="handleFileUpload" :disabled="uploading || !isAuthenticated">
                    Upload
                </UButton>
            </div>
        </UFormGroup>
        <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="Description" name="description">
            <UTextarea resize v-model="state.description" type="content" />
        </UFormGroup>

        <UFormGroup label="Website" name="website">
            <UInput v-model="state.website" />
        </UFormGroup>
        <UFormGroup label="Tasting Notes" name="tastingNotes">
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
                <USelect v-model="state.roasterId" :options="roasters" placeholder="Select Roaster" />
            </UFormGroup>
        </div>

        <div class="flex justify-end">
            <UButton :disabled="!isAuthenticated" type="submit">
                Submit
            </UButton>
        </div>
    </UForm>
</template>
