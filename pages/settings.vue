<script setup lang="ts">

let userId = ref(null)
if (import.meta.client) {
    const storedUserId = localStorage.getItem('userId')
    userId.value = storedUserId
}

const { data: user, error: gqlError } = await useAsyncGql(
    'userById', { id: userId }
)

</script>
<template>
    <div>
        <p v-if="user">Welcome, {{ JSON.stringify(user) }}</p>
        <p v-else>Loading...</p>
    </div>
</template>
