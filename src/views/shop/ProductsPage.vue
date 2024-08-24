<template>
  <div>
    <v-container>
      <ShopAlerts :alert="alertsStore.alert" />
      <CategorySection @category-selected="fetchProductsByCategory" />
      <v-row align="baseline" justify="center">
        <ProductsGrid :products="products" />
      </v-row>
    </v-container>
    <v-container>
      <v-row justify="center" align="baseline">
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
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAlertsStore } from '@/stores/alerts';
import ShopAlerts from '@/components/ShopAlerts.vue';
import axios from 'axios';
import ProductsGrid from '@/components/ProductsGrid.vue';
import CategorySection from '@/components/CategorySection.vue';

const alertsStore = useAlertsStore();
const router = useRouter();

const products = ref([]);
const page = ref(
  router.currentRoute.value.query.page ? parseInt(router.currentRoute.value.query.page) : 1
);
const totalPages = ref(1);
const fetchProductsByCategory = (categoryId) => {
  // Fetching products by the selected category
  getProducts(1, categoryId);
};
const getProducts = async (page, categoryId = null) => {
  try {
    //Set how many products should load on a single page
    const limitPerPage = 6;
    // Constructing the query string with page, limit, and an optional categoryId
    let query = `/api/products?page=${page}&limit=${limitPerPage}`;
    if (categoryId) {
      query += `&categoryId=${categoryId}`;
    }
    console.log('query', query);
    const result = await axios.get(query);
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
  },
  { immediate: true }
);

const handlePageChange = (newPage) => {
  router.push({ query: { ...router.currentRoute.value.query, page: newPage } });
};

onMounted(() => {
  getProducts(page.value);
});
</script>
