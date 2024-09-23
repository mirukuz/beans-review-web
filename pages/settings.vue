<script setup lang="ts">
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

const { data: user, error: gqlError } = await useAsyncGql(
    'userById', { id: authStore.userId }
)

</script>
<template>
    <div>
        <p v-if="user">Welcome, {{ JSON.stringify(user) }}</p>
        <p v-else>Loading...</p>
    </div>
</template>
