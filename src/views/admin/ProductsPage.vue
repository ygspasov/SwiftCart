<template>
  <div>
    <v-container>
      <ShopAlerts :alert="alertsStore.alert" class="mb-2" />
      <CategorySection
        @category-selected="fetchProductsByCategory"
        v-if="!productsStore.searchFilter"
      />
      <v-row align="baseline" justify="center">
        <ProductsGrid :products="products" />
      </v-row>
    </v-container>
    <v-container v-if="products.length">
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
const alertsStore = useAlertsStore();
import { useProductsStore } from '@/stores/products';
const productsStore = useProductsStore();
import ShopAlerts from '@/components/ShopAlerts.vue';
import ProductsGrid from '@/components/ProductsGrid.vue';
import CategorySection from '@/components/CategorySection.vue';

const router = useRouter();
provide(/* key */ 'admin', /* value */ true);
const products = ref([]);
let page = ref(
  router.currentRoute.value.query.page
    ? parseInt(router.currentRoute.value.query.page)
    : 1
); // Initialize with page 1 or from query parameter
const totalPages = ref(1);
const fetchProductsByCategory = (categoryId) => {
  // Fetching products by the selected category
  getProducts(1, categoryId);
};
const getProducts = async (page, categoryId = null) => {
  try {
    const limitPerPage = 6;
    let query = `/api/admin/admin-products?page=${page}&limit=${limitPerPage}`;
    if (categoryId) {
      query += `&categoryId=${categoryId}`;
    }
    if (productsStore.searchFilter) {
      query = `/api/admin/admin-products?search=${productsStore.searchFilter}`;
    }
    const result = await axios.get(query);
    products.value = result.data.products;
    totalPages.value = result.data.totalPages;
    productsStore.setProducts(result.data.products);
  } catch (err) {
    console.log('Error fetching products:', err);
  }
};

// Watching for changes in the search filter and fetching products
watch(
  () => productsStore.searchFilter,
  (newFilter) => {
    if (newFilter) {
      // Fetch all products that match the search filter, bypassing pagination
      getProducts(1);
    } else {
      // If no search filter, load products with pagination
      getProducts(page.value);
    }
  },
  { immediate: true }
);

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
