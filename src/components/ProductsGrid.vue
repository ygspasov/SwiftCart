<template>
  <v-col v-for="product in products" :key="product.id" cols="auto">
    <ProductsGridItem :product="product" />
  </v-col>
</template>
<script setup>
import ProductsGridItem from '@/components/ProductsGridItem.vue';
const props = defineProps(['products']);
const products = props.products;
</script>
<style scoped></style>
