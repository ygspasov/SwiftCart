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

const getProducts = async () => {
  try {
    const result = await axios.get('http://localhost:8000/api/products');
    products.value = result.data;
    console.log(result.data);
  } catch (err) {
    console.log('err', err);
  }
};

onMounted(() => {
  getProducts();
});
</script>
<style scoped></style>
