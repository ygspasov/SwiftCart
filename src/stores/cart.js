import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', () => {
  const loadProducts = ref(false);
  function loadCart() {
    loadProducts.value = true;
  }
  return { loadCart, loadProducts };
});
