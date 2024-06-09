<template>
  <div>
    <v-container>
      <h3 class="text-center mb-2">Admin products</h3>
      <ShopAlerts :alert="alertsStore.alert" />
      <v-row align="center" justify="center">
        <ProductsGrid :products="products" />
      </v-row>
    </v-container>
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              :length="totalPages"
              @click="handlePageChange"
              class="my-4"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { onMounted, ref, provide, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAlertsStore } from '@/stores/alerts';
import ShopAlerts from '@/components/ShopAlerts.vue';
import ProductsGrid from '@/components/ProductsGrid.vue';
const alertsStore = useAlertsStore();
const router = useRouter();
let products = ref([]);
provide(/* key */ 'admin', /* value */ true);
let page = router.currentRoute.value.query.page
  ? parseInt(router.currentRoute.value.query.page)
  : 1; // Initialize with page 1 or from query parameter
const totalPages = ref(1);

const getProducts = async (page) => {
  try {
    //Set how many products should load on a single page
    const limitPerPage = 3;
    const result = await axios.get(`/api/admin/admin-products?page=${page}&limit=${limitPerPage}`);
    console.log('page', page);
    console.log('result', result);
    products.value = result.data.products;
    totalPages.value = result.data.totalPages;
  } catch (err) {
    console.log('Error fetching products:', err);
  }
};

// Watch for changes to the route's query parameter and update products
watch(
  () => router.currentRoute.value.query.page,
  (newPage) => {
    console.log('newPage', newPage);
    if (!isNaN(parseInt(newPage))) {
      page = parseInt(newPage);
      getProducts(page);
    }
  }
);

// Handle pagination change
const handlePageChange = (event) => {
  // Extracting the page value from the event
  const newPage = event.target.innerText;

  console.log('handlePageChange newPage', newPage);

  // Updating the router's query parameter with the new page value
  router.push({ query: { ...router.currentRoute.value.query, page: newPage } });
};

onMounted(() => {
  getProducts(page);
});
</script>
<style scoped></style>
