<template>
  <v-container>
    <v-row>
      <v-card class="mx-auto">
        <v-card-title class="text-h5 my-1 text-center text-md-start">Shopping Cart</v-card-title>
        <v-divider class="mx-4 mb-1"></v-divider>

        <v-list
          v-for="item in cartItems"
          :key="item.id"
          class="d-flex flex-wrap flex-column flex-md-row justify-space-between mx-5 my-2"
        >
          <div class="">
            <v-img :width="200" cover :src="item.imageUrl" class="mx-auto"></v-img>
          </div>

          <div
            class="d-flex flex-column text-h6 mx-2 my-2 my-md-0 flex-grow-1 text-center text-md-left"
          >
            <span class="flex-grow-1 text-h5">{{ item.name }}</span>
            <span class="flex-grow-1 text-h5">${{ item.price }}</span>
          </div>
          <div class="d-flex align-start mx-auto mx-md-0">
            <v-btn class="" color="black">Remove From Cart</v-btn>
          </div>
          <v-divider class="mt-5"></v-divider>
        </v-list>
        <p class="text-center text-md-right mx-4 text-h5">Total: ${{ totalPrice }}</p>
        <v-btn class="mx-4 my-3 w-100" elevation="4" color="black">Proceed to Checkout</v-btn>
      </v-card>
    </v-row>
  </v-container>
</template>
<script setup>
import { computed } from 'vue';
import { cartItems } from '../assets/fake-data';
console.log('cartItems', cartItems);
const totalPrice = computed(() => cartItems.reduce((sum, item) => sum + Number(item.price), 0));
console.log('totalPrice', totalPrice);
</script>
<style scoped></style>
