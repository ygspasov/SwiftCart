<template>
  <v-list
    v-for="item in cartItems"
    :key="item.id"
    class="d-flex flex-wrap flex-column flex-md-row justify-space-between mx-5 my-2"
  >
    <ProductListItem :item="item" />
    <v-divider class="mt-5"></v-divider>
  </v-list>
</template>
<script setup>
import ProductListItem from '@/components/ProductListItem.vue';
defineProps(['cartItems']);
</script>
<style scoped></style>
