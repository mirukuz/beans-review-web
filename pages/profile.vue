<template>
    <div>
      <p v-if="user">Welcome, {{ user?.name }}</p>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { inject } from 'vue';
  
  const user = inject('user');
  </script>