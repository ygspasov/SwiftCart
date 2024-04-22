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
      <v-btn type="submit" block class="mt-2" @click="editProduct">Edit product</v-btn>
    </v-form>
  </v-sheet>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const name = ref('');
const imageUrl = ref('');
const description = ref('');
const price = ref(0);

const getProduct = async () => {
  try {
    const product = await axios.get(`/api/products/${route.params.id}`);
    console.log('product', product);
    name.value = product.data.name;
    description.value = product.data.description;
    imageUrl.value = product.data.imageUrl;
    price.value = product.data.price;
  } catch (err) {
    console.log('err', err);
  }
};

const editProduct = async () => {
  try {
    await axios.patch(`/api/admin/products/edit-product/${route.params.id}`, {
      id: route.params.id,
      name: name.value,
      imageUrl: imageUrl.value,
      description: description.value,
      price: price.value,
    });
    router.push('/admin/admin-products');
  } catch (err) {
    console.log('Error editing product:', err);
  }
};
onMounted(() => {
  getProduct();
});
</script>
