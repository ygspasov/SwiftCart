<template>
  <v-container>
    <v-row>
      <v-card v-if="showProducts" class="mx-auto">
        <v-card-title class="text-h5 my-1 text-center text-md-start">Shopping Cart</v-card-title>
        <v-divider class="mx-4 mb-1"></v-divider>
        <ProductList :cartItems="cartItems" />
        <p class="text-center text-md-right mx-4 text-h5">Total: ${{ totalPrice }}</p>
        <v-btn class="mx-4 my-3 w-100" elevation="4" color="black" @click="postOrder">Order</v-btn>
      </v-card>
      <p v-else class="mx-auto text-h5 text-red">No products in cart.</p>
    </v-row>
  </v-container>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { useCartStore } from '@/stores/cart';
import ProductList from '@/components/ProductList.vue';
const store = useCartStore();
const { loadCart } = store;
const cartItems = ref([]);
const totalPrice = ref(0);

const getCartItems = async () => {
  try {
    cartItems.value = [];
    const result = await axios.get('/api/cart');
    console.log('result', result);
    cartItems.value = result.data.cartItems;
    totalPrice.value = result.data.totalPrice;
  } catch (err) {
    console.log('err', err);
  }
};

const postOrder = async () => {
  try {
    await axios.post('/api/create-order');
    setTimeout(() => {
      loadCart();
    }, 100);
  } catch (err) {
    console.log('err', err);
  }
};

const showProducts = computed(() => cartItems.value.length);

const loadProducts = computed(() => store.loadProducts);
console.log('store.loadProducts', store.loadProducts);
watch(loadProducts, (newVal) => {
  if (newVal) {
    getCartItems();
    store.loadProducts = false;
  }
});

onMounted(() => {
  getCartItems();
});
</script>
