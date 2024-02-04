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
import { onMounted, ref } from 'vue';
import axios from 'axios';
// import { products } from '../assets/fake-data';
import ProductsGrid from '@/components/ProductsGrid.vue';
let products = ref([]);
onMounted(async () => {
  const result = await axios.get('/api/products');
  products.value = result.data;
});
</script>
<style scoped></style>
