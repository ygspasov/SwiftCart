import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useProductsStore = defineStore('products', () => {
  const searchFilter = ref('');
  const products = ref([]);
  function setSearchFilter(filter) {
    searchFilter.value = filter;
  }
  function setProducts(products) {
    products.value = products;
  }
  return { setSearchFilter, setProducts, products, searchFilter };
});
