<script setup lang="ts">
import { TastingNote, Process, Origin } from '#gql/default';
import type { FormError, FormSubmitEvent } from '#ui/types'
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
  // eslint-disable-next-line no-console
  console.error(error.value)
}

const state = reactive({
    name: "",
    description: "",
    website: "",
    roasterId: "",
    tastingNote: TastingNote.Fruity,
    process: Process.Natural,
    origin: Origin.Ethiopia,
})
const result = ref(null)
const origins = Object.values(Origin);
const processes = Object.values(Process);
const tastingNotes = Object.values(TastingNote);

const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.name) errors.push({ path: 'rating', message: 'Required' })
    if (!state.description) errors.push({ path: 'description', message: 'Required' })
    if (!state.website) errors.push({ path: 'website', message: 'Required' })
    if (!state.tastingnote) errors.push({ path: 'tastingnote', message: 'Required' })
    if (!state.origin) errors.push({ path: 'origin', message: 'Required' })
    if (!state.process) errors.push({ path: 'process', message: 'Required' })
    if (!state.roasterId) errors.push({ path: 'roaster', message: 'Required' })
    return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {

        const { createBean } = await GqlCreateBean({
            data: {
                name: state.name,
                description: state.description,
                website: state.website,
                roasterId: state.roasterId,
                tastingnote: state.tastingNote,
                origin: state.origin,
                process: state.process
            }
        })
       result.value = createBean
    }
</script>
<template>
    <div v-if="result">
        Request Submitted
    </div>
    <UForm :validate="validate" :state="state"  v-else class="space-y-4 mx-auto w-full lg:w-1/2" @submit="onSubmit">

        <UFormGroup label="Name" name="name">
            <UTextarea resize v-model="state.name" type="text" />
        </UFormGroup>

        <UFormGroup label="Description" name="description">
            <UTextarea resize v-model="state.description" type="content" />
        </UFormGroup>

        <UFormGroup label="Website" name="website">
            <UTextarea resize v-model="state.website" type="website" />
        </UFormGroup>
        <UFormGroup label="Tasting Note" name="tastingNote">
            <USelect v-model="tastingNotes" :options="tastingNotes" />
        </UFormGroup>
        <UFormGroup label="Process" name="process">
            <USelect v-model="processes" :options="processes" />
        </UFormGroup>
        <UFormGroup label="Origin" name="origin">
            <USelect v-model="origins" :options="origins" />
        </UFormGroup>
        <UFormGroup label="Roaster" name="roasterId">
            <USelect v-model="roasters" :options="roasters" />
        </UFormGroup>

        <div class="flex justify-end">
            <UButton disabled type="submit">
                Submit
            </UButton>
        </div>
    </UForm>
</template>