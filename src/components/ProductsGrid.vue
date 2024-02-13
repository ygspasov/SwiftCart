<template>
  <v-col v-for="product in products" :key="product.id" cols="auto">
    <ProductsGridItem :product="product" />
  </v-col>
</template>

<script setup>
import ProductsGridItem from "@/components/ProductsGridItem.vue";
defineProps(["products"]);
</script>
