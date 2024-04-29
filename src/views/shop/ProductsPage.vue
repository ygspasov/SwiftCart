<template>
  <div>
    <v-container>
      <ShopAlerts :alert="alertsStore.alert" />
      <v-row align="center" justify="center">
        <ProductsGrid :products="products" />
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useAlertsStore } from '@/stores/alerts';
import ShopAlerts from '@/components/ShopAlerts.vue';
import axios from 'axios';
import ProductsGrid from '@/components/ProductsGrid.vue';
const alertsStore = useAlertsStore();
let products = ref([]);
const getProducts = async () => {
  try {
    const result = await axios.get('/api/products');
    products.value = result.data;
    console.log(result.data);
  } catch (err) {
    console.log('err', err);
  }
};

onMounted(async () => {
  await getProducts();
});
</script>
<style scoped></style>
