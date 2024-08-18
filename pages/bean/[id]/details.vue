<template>
    <div>
        <h1>Bean Details for ID: {{ $route.params.id }}</h1>
        <UButton :to="`/bean/${$route.params.id}/add-review`">Add Review</UButton>
    </div>
</template>