<template>
  <div>
    <div>
      <h1>Products page</h1>
      <div v-for="product in products" :key="product.id">
        {{ product }}
        <!-- <img :src="product.imageUrl" alt="" /> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { products } from '../assets/fake-data';
</script>
<style scoped></style>
