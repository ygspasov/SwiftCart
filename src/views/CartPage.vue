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
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
const cartItems = ref([]);
import ProductList from '@/components/ProductList.vue';
const totalPrice = ref(0);

const getCartItems = async () => {
  try {
    const result = await axios.get('/api/users/1/cart');
    cartItems.value = result.data;
    console.log(result.data);
    totalPrice.value = computed(() =>
      cartItems.value.reduce((sum, item) => sum + Number(item.price), 0)
    );
  } catch (err) {
    console.log('err', err);
  }
};

onMounted(() => {
  getCartItems();
});
</script>
<style scoped></style>
