<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const route = useRoute()
const state = reactive({
    rating: 5,
    content: ""
})
const beanId: string = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
const result = ref(null)
const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.rating) errors.push({ path: 'rating', message: 'Required' })
    if (!state.content) errors.push({ path: 'content', message: 'Required' })
    return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
    if (beanId && authStore.userId) {
        console.log(event.data)
        const { createReview } = await GqlCreateReview({
            data: {
                rating: Number(state.rating),
                content: state.content
            },
            beanId,
            authorId: authStore.userId
        })
       result.value = createReview
    }
}
</script>

<template>
    <div v-if="result">
        Request Submitted
    </div>
    <UForm :validate="validate" :state="state"  v-else class="space-y-4 mx-auto w-full lg:w-1/2" @submit="onSubmit">

        <UFormGroup label="Rating" name="rating">
            <URange :step="1" :min="0" :max="5" v-model="state.rating" />
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
