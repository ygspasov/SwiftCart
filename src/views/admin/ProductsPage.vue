<template>
  <div>
    <v-container>
      <h3 class="text-center mb-2 open-sans-regular">Admin products</h3>
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
              @update:modelValue="handlePageChange"
              class="my-4"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, provide } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAlertsStore } from '@/stores/alerts';
import ShopAlerts from '@/components/ShopAlerts.vue';
import ProductsGrid from '@/components/ProductsGrid.vue';

const alertsStore = useAlertsStore();
const router = useRouter();
provide(/* key */ 'admin', /* value */ true);
const products = ref([]);
let page = ref(
  router.currentRoute.value.query.page ? parseInt(router.currentRoute.value.query.page) : 1
); // Initialize with page 1 or from query parameter
const totalPages = ref(1);

const getProducts = async (page) => {
  try {
    const limitPerPage = 3;
    const result = await axios.get(`/api/admin/admin-products?page=${page}&limit=${limitPerPage}`);
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
    if (!isNaN(parseInt(newPage))) {
      page.value = parseInt(newPage);
      getProducts(page.value);
    }
  }
);

// Handle pagination change
const handlePageChange = (newPage) => {
  router.push({ query: { ...router.currentRoute.value.query, page: newPage } });
};

onMounted(() => {
  getProducts(page.value);
});
</script>
