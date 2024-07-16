<template>
  <v-container class="d-flex flex-column flex-md-row">
    <v-row class="">
      <v-img :width="250" cover :src="item.productId.imageUrl" class="mx-auto"></v-img>
    </v-row>
    <v-row
      class="d-flex flex-column text-h6 ml-0 ml-md-5 my-2 my-md-0 flex-grow-1 text-center text-md-left"
    >
      <v-col class="flex-grow-1 text-h5 open-sans-regular text-center text-md-right">{{
        item.productId.name
      }}</v-col>
      <v-col class="flex-grow-1 text-h5 roboto-regular text-center text-md-right"
        >Quantity: {{ item.quantity }}</v-col
      >
      <v-col class="flex-grow-1 text-h5 roboto-regular text-center text-md-right"
        >Price: ${{ (item.quantity * item.price).toFixed(2) }}</v-col
      >
    </v-row></v-container
  >
  <v-container class="open-sans-regular pa-0 mt-md-5" id="actions">
    <v-row no-gutters class="d-flex justify-center"
      ><v-col cols="12" md="8" class="flex-grow-1 text-center text-md-left"
        ><v-btn size="large" color="black" @click="RemoveCartItem">Remove</v-btn></v-col
      >
      <v-col cols="12" md="4" class="flex-grow-1 mt-3 mt-md-0">
        <v-number-input
          class="mx-auto"
          width="150"
          :max="20"
          :min="1"
          :model-value="item.quantity"
          control-variant="split"
          @update:model-value="(newQuantity) => setQuantity(newQuantity, item.productId._id)"
        ></v-number-input>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { VNumberInput } from 'vuetify/labs/VNumberInput';
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

const setQuantity = async (quantity, productId) => {
  item.quantity = quantity;
  try {
    await axios
      .put(`/api/cart/${productId}`, {
        quantity,
      })
      .then(() => loadCart());
  } catch (error) {
    console.log('Failed to update quantity:', error);
  }
};
</script>
<style>
#app #actions .v-input__control .v-field__field {
  height: 50px;
}
#app #actions .v-input {
  height: 50px;
}
</style>
