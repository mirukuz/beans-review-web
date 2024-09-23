<script setup lang="ts">
import NavBar from '~/components/NavBar.vue'
import Footer from '~/components/Footer.vue'

</script>

<template>
    <NavBar/>
    <UContainer class="my-10 text-center">
      <NuxtPage />
    </UContainer>
    <Footer />
</template>
