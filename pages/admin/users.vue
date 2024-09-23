<script setup lang="ts">
const { data, error } = await useAsyncGql('allUsers')

if (error.value) {
  console.error(error.value)
}

import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
  userId: undefined,
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.userId) errors.push({ path: 'userId', message: 'Required' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
    await GqlToggleUserAdmin({
      id: state.userId
    })
}

</script>

<template>
  <div class="flex flex-col gap-2">
    {{ JSON.stringify(data.allUsers, null, 2) }}
  </div>
  
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="UserId" name="userId">
      <UInput v-model="state.userId" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>

</template>
