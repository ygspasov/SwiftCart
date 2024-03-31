<template>
  <h1>Orders</h1>

  <div v-for="order in orders" :key="order._id">
    <p>Order # {{ order._id }}</p>
    <v-list lines="one">
      <v-list-item v-for="product in order.items.cartItems" :key="product._id">
        <SingeCart
          :description="product.description"
          :price="product.price"
          :name="product.name"
        />
      </v-list-item>
      <v-list-item>
        <p>Оrder price: {{ order.items.totalPrice }}</p></v-list-item
      >
    </v-list>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import SingeCart from "../../components/SingleCart.vue";

const orders = ref([]);

const getOrders = async () => {
  try {
    let result = await axios.get("/api/orders");
    orders.value = result.data;
    console.log("orders.value", orders.value);
  } catch (err) {
    console.log("Error removing item:", err);
  }
};
onMounted(() => {
  getOrders();
});
</script>
<style scoped></style>
