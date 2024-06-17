<template>
  <div class="">
    <v-img :width="200" cover :src="item.productId.imageUrl" class="mx-auto"></v-img>
  </div>
  <div class="d-flex flex-column text-h6 mx-2 my-2 my-md-0 flex-grow-1 text-center text-md-left">
    <span class="flex-grow-1 text-h5 open-sans-regular">{{ item.productId.name }}</span>
    <span class="flex-grow-1 text-h5 roboto-regular"> Quantity: {{ item.quantity }}</span>
    <span class="flex-grow-1 text-h5 roboto-regular">Price: ${{ item.price }}</span>
  </div>
  <div class="d-flex align-start mx-auto mx-md-0 open-sans-regular">
    <v-btn class="" color="black" @click="RemoveCartItem">Remove</v-btn>
  </div>
</template>
<script setup>
import axios from 'axios';
import { useCartStore } from '@/stores/cart';
import { useAlertsStore } from '@/stores/alerts';
const alertsStore = useAlertsStore();
const store = useCartStore();
const { loadCart } = store;
const props = defineProps(['item']);
const item = props.item;

const RemoveCartItem = async () => {
  const productId = item._id;
  console.log('productId', productId);
  try {
    await axios
      .delete(`/api/cart/${productId}`, {
        productId,
      })
      .then((res) => {
        alertsStore.setAlert('success', res.data.message);
        loadCart();
      });
  } catch (err) {
    console.log('Error removing item:', err);
  }
};
</script>
<style scoped></style>
