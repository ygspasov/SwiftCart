<template>
  <v-container>
    <h2 class="open-sans-regular my-2">
      {{ orders.length > 0 ? 'Orders' : 'No orders found.' }}
    </h2>

    <ShopAlerts class="mb-2" :alert="alertsStore.alert" />

    <div v-for="order in orders" :key="order._id">
      <p class="open-sans-regular">
        Order # {{ order._id }} from
        <span class="font-italic">{{ moment(order.createdAt).format('MMM Do YYYY') }}</span>
        -
        <a :href="`/api/orders/${order._id}`" @click="downloadInvoice(order._id)" download
          >Invoice</a
        >
      </p>
      <v-row>
        <v-col
          cols="12"
          class="open-sans-regular mt-2"
          v-for="item in order.products"
          :key="item._id"
        >
          <SingleCart
            :description="item.product.description"
            :price="item.price"
            :name="item.product.name"
          />
        </v-col>
      </v-row>
      <p class="my-3" @click="cancelOrder(order._id)"><v-btn>Cancel Order</v-btn></p>
      <p class="my-2">Оrder price: ${{ order.totalPrice }}</p>
    </div>
  </v-container>
</template>
<script setup>
import moment from 'moment';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import SingleCart from '../../components/SingleCart.vue';
import ShopAlerts from '@/components/ShopAlerts.vue';
import { useAlertsStore } from '@/stores/alerts';
const alertsStore = useAlertsStore();

const orders = ref([]);

const getOrders = async () => {
  try {
    let result = await axios.get('/api/orders');
    orders.value = result.data;
  } catch (err) {
    console.log('Error removing item:', err);
  }
};

const cancelOrder = async (orderID) => {
  try {
    await axios.delete(`/api/delete-order/${orderID}`).then((res) => {
      alertsStore.setAlert('success', res.data.message);
      getOrders();
      setTimeout(() => {
        alertsStore.clearAlert();
      }, 3000);
    });
  } catch (err) {
    console.log('Cancelling the order failed.', err);
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
