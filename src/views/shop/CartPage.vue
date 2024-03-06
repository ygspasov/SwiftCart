<template>
  <v-container>
    <v-row>
      <v-card class="mx-auto">
        <v-card-title class="text-h5 my-1 text-center text-md-start">Shopping Cart</v-card-title>
        <v-divider class="mx-4 mb-1"></v-divider>
        <ProductList :cartItems="cartItems" />
        <p class="text-center text-md-right mx-4 text-h5">Total: ${{ totalPrice }}</p>
        <v-btn class="mx-4 my-3 w-100" elevation="4" color="black">Proceed to Checkout</v-btn>
      </v-card>
    </v-row>
  </v-container>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { useCartStore } from '@/stores/cart';
import ProductList from '@/components/ProductList.vue';
const store = useCartStore();
const cartItems = ref([]);
const totalPrice = ref(0);

const getCartItems = async () => {
  try {
    cartItems.value = [];
    const result = await axios.get('/api/cart');
    cartItems.value = result.data;
    console.log('cartItems value', cartItems.value);
    totalPrice.value = computed(() =>
      cartItems.value.reduce((sum, item) => sum + Number(item.productData.price * item.qty), 0)
    );
  } catch (err) {
    console.log('err', err);
  }
};

const loadProducts = computed(() => store.loadProducts);
console.log('store.loadProducts', store.loadProducts);
watch(loadProducts, (newVal) => {
  if (newVal) {
    console.log('Before getCartItems - cartItems:', cartItems.value);
    getCartItems();
    console.log('After getCartItems - cartItems:', cartItems.value);
    store.loadProducts = false;
  }
});

onMounted(() => {
  getCartItems();
});
</script>
