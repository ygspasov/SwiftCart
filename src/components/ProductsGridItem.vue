<template>
  <v-card class="mx-auto" width="280">
    <v-img class="align-end text-white" height="450" :src="product.imageUrl" cover> </v-img>

    <v-card-title
      ><div class="text-center text-h5 text-wrap open-sans-regular">
        {{ product.name }}
      </div></v-card-title
    >

    <v-card-text>
      <div class="text-center text-h6 roboto-regular">${{ product.price }}</div>
    </v-card-text>

    <v-card-actions class="d-flex flex-wrap justify-center px-0">
      <router-link
        v-if="admin"
        class="bg-black pa-1 mb-2 mx-1 rounded"
        :to="'/admin/products/edit-product/' + product._id"
      >
        <v-btn class="radius-"> Edit </v-btn>
      </router-link>
      <router-link v-if="admin" class="bg-black pa-1 mb-2 mx-1 rounded" :to="''">
        <v-btn class="radius-" @click="deleteProduct"> Delete </v-btn>
      </router-link>
      <router-link class="bg-black pa-1 mb-2 mx-1 rounded" :to="'/products/' + product._id">
        <v-btn class="radius- roboto-regular"> View Details </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { inject } from 'vue';
import axios from 'axios';
import { useCartStore } from '@/stores/cart';
import { useAlertsStore } from '@/stores/alerts';
import { useRouter } from 'vue-router';
const router = useRouter();
const alertsStore = useAlertsStore();
const admin = inject('admin');
const store = useCartStore();
const props = defineProps(['product']);
const product = props.product;
const deleteProduct = async () => {
  try {
    await axios.delete(`/api/admin/products/delete-product/${product._id}`).then((res) => {
      router.push('/');
      alertsStore.setAlert('success', res.data.message);
      setTimeout(() => {
        alertsStore.clearAlert();
      }, 3000);
    });
    store.loadProducts = true;
  } catch (err) {
    console.log('err', err);
  }
};
</script>
<style scoped></style>
