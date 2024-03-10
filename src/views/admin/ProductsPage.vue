<template>
  <div>
    <v-container>
      <h3 class="text-center mb-2">Admin products</h3>
      <v-row align="center" justify="center">
        <ProductsGrid :products="products" />
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { onMounted, ref, provide, watch, computed } from 'vue';
import axios from 'axios';
import ProductsGrid from '@/components/ProductsGrid.vue';
import { useCartStore } from '@/stores/cart';
const store = useCartStore();
let products = ref([]);
provide(/* key */ 'admin', /* value */ true);
const getProducts = async () => {
  try {
    const result = await axios.get('http://localhost:8000/api/products');
    products.value = result.data;
    console.log(result.data);
  } catch (err) {
    console.log('err', err);
  }
};
const loadProducts = computed(() => store.loadProducts);
watch(loadProducts, (newVal) => {
  if (newVal) {
    getProducts();
    store.loadProducts = false;
  }
});
onMounted(() => {
  getProducts();
});
</script>
<style scoped></style>
