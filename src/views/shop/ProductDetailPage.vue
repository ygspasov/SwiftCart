<template>
  <v-container v-if="product" class="bg-surface">
    <v-row no-gutters>
      <v-col cols="12">
        <v-img
          class="mx-auto"
          :width="600"
          aspect-ratio="16/9"
          cover
          :src="product.imageUrl"
        ></v-img>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center my-3" no-gutters>
      <v-col class="" md="3"
        ><div class="text-left text-h6">{{ product.name }}</div></v-col
      ><v-col class="" md="3"
        ><div class="text-right font-weight-bold">${{ product.price }}</div></v-col
      >
    </v-row>
    <v-row class="d-flex justify-center my-3" no-gutters
      ><v-col class="" md="6"
        ><v-btn class="w-100" color="black" @click="addToCart">Add to Cart</v-btn></v-col
      ></v-row
    >
    <v-row class="d-flex justify-center my-3" no-gutters>
      <v-col md="6"
        ><p class="text-left font-weight-bold mb-2 text-subtitle-1">Description</p>
        <p>
          {{ product.description }}
        </p>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else><p class="text-center">No product found.</p></v-container>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useAlertsStore } from '@/stores/alerts';
const alertsStore = useAlertsStore();
const route = useRoute();
const router = useRouter();
const product = ref(null);
const cartItems = ref([]);
const getProduct = async () => {
  const result = await axios.get(`/api/products/${route.params.id}`);
  product.value = result.data;
};
const addToCart = async () => {
  const prodId = product.value._id;
  try {
    axios
      .post(`/api/cart/${prodId}`, {
        prodId,
      })
      .then((res) => {
        alertsStore.setAlert('success', res.data.message);
        console.log('alertsStore.alert', alertsStore.alert.message);
        updateCartItems();
        router.push('/cart');
      })
      .then(() => {
        setTimeout(() => {
          alertsStore.clearAlert();
        }, 3000);
      });
  } catch (err) {
    console.log('err', err);
  }
};

const updateCartItems = async () => {
  //Updates the cart products after a new product is added to the cart
  try {
    const result = await axios.get('/api/cart');
    cartItems.value = result.data;
  } catch (err) {
    console.log('err', err);
  }
};
onMounted(() => {
  getProduct();
});
</script>
<style scoped></style>
