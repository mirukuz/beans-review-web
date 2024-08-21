<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
    rating: undefined,
    content: undefined
})

const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.rating) errors.push({ path: 'rating', message: 'Required' })
    if (!state.content) errors.push({ path: 'content', message: 'Required' })
    return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
    // Do something with data
    console.log(event.data)
}
</script>

<template>
    <UForm :validate="validate" :state="state" 
           class="space-y-4 mx-auto w-full lg:w-1/2" 
           @submit="onSubmit">
        
      <UFormGroup label="Rating" name="rating">
        <URange :step="0.5" :min="0" :max="5" v-model="state.rating" />
      </UFormGroup>
  
      <UFormGroup label="Content" name="content">
        <UTextarea resize v-model="state.content" type="content" />
      </UFormGroup>
  
      <div class="flex justify-end">
        <UButton type="submit">
          Submit
        </UButton>
      </div>
    </UForm>
  </template>
