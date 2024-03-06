import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  const loadProducts = ref(false);
  function loadCart() {
    loadProducts.value = true;
    console.log('loadProducts.value', loadProducts.value);
  }
  return { loadCart, loadProducts };
});
