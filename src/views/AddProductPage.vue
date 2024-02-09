<template>
  <v-sheet width="300" class="mx-auto mt-5">
    <v-form @submit.prevent>
      <v-text-field v-model="name" :rules="rules" label="Product name"></v-text-field>
      <v-btn type="submit" block class="mt-2" @click="postProduct">Add product</v-btn>
    </v-form>
  </v-sheet>
</template>
<script setup>
import axios from 'axios';
let name = '';
const rules = [
  (value) => {
    if (value) return true;

    return 'You must enter a product name.';
  },
];

const postProduct = async () => {
  try {
    axios.post('/api/products/123', {
      name,
    });
  } catch (err) {
    console.log('err', err);
  }
};
</script>
<style scoped></style>
