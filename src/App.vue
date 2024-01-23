<script setup>
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <div class="bg-surface px-2">
    <v-app>
      <NavBar />

      <RouterView
    /></v-app>
  </div>
</template>

<style scoped></style>
