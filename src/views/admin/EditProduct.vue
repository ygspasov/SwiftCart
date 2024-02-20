<template>
  <v-sheet width="400" class="mx-auto mt-5">
    <v-form @submit.prevent>
      <v-text-field v-model="name" label="Product Name"></v-text-field>
      <v-text-field
        v-model="imageUrl"
        :rules="rules"
        label="Image URL"
        id="imageUrl"
      ></v-text-field>
      <v-textarea v-model="description" label="Description"></v-textarea>
      <v-text-field v-model="price" label="Price"></v-text-field>
      <v-text-field v-model="averageRating" label="Averate Rating"></v-text-field>
      <v-btn type="submit" block class="mt-2" @click="postProduct">Edit product</v-btn>
    </v-form>
  </v-sheet>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
let name = ref('');
let imageUrl = ref('');
let description = ref('');
let price = ref(0);
let averageRating = ref(0);
const generateRandomId = () => Math.floor(Math.random() * 900) + 100;
const postProduct = async () => {
  const id = generateRandomId().toString();
  try {
    axios.post(`/api/products/${id}`, {
      id: id,
      name: name.value,
      imageUrl: imageUrl.value,
      description: description.value,
      price: price.value,
      averageRating: averageRating.value,
    });
    router.push('/');
  } catch (err) {
    console.log('err', err);
  }
};
</script>
<style scoped></style>
