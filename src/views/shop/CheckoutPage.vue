<template>
  <h1>Checkout</h1>
  <div v-for="order in orders" :key="order._id">
    <p>
      Order # {{ order._id }} -
      <a :href="`/api/orders/${order._id}`" @click="downloadInvoice(order._id)" download>Invoice</a>
    </p>
    <v-list lines="one">
      <v-list-item v-for="item in order.products" :key="item._id">
        <SingleCart
          :description="item.product.description"
          :price="item.price"
          :name="item.product.name"
        />
      </v-list-item>
      <v-list-item>
        <p>Оrder price: {{ order.totalPrice }}</p>
      </v-list-item>
    </v-list>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import SingleCart from '../../components/SingleCart.vue';

const orders = ref([]);

const getOrders = async () => {
  try {
    let result = await axios.get('/api/orders');
    orders.value = result.data;
  } catch (err) {
    console.log('Error removing item:', err);
  }
};

const downloadInvoice = async (orderId) => {
  try {
    await axios.get(`/api/orders/${orderId}`, {
      responseType: 'blob',
    });
  } catch (error) {
    console.log('Error downloading the file', error);
  }
};

onMounted(() => {
  getOrders();
});
</script>
