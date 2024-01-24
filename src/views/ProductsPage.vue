<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <ProductsGrid :products="products" />
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { products } from '../assets/fake-data';
import ProductsGrid from '@/components/ProductsGrid.vue';
</script>
<style scoped></style>
