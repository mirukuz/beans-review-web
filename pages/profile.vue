<template>
    <div>
      <p v-if="user">Welcome, {{ JSON.stringify(user) }}</p>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { inject } from 'vue';
  
  const user = inject('user');
  </script>