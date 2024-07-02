<template>
  <v-container>
    <ShopAlerts :alert="alertsStore.alert" />
    <v-row>
      <v-card v-if="showProducts" class="mx-auto" max-width="600">
        <v-card-title class="text-h5 my-1 mx-2 text-center text-md-start open-sans-regular"
          >Shopping Cart</v-card-title
        >
        <v-divider class="mx-4 mb-1"></v-divider>
        <ProductList :cartItems="cartItems" />
        <v-container>
          <p class="text-center text-md-right mx-4 text-h5 roboto-regular">
            Total: ${{ totalPrice }}
          </p>
        </v-container>
        <v-btn
          class="mx-4 my-3 w-100 open-sans-regular"
          elevation="4"
          color="black"
          @click="postOrder"
          >Order</v-btn
        >
      </v-card>
      <p v-else class="mx-auto text-h5 text-red open-sans-regular">No products in cart.</p>
    </v-row>
  </v-container>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { useCartStore } from '@/stores/cart';
import ProductList from '@/components/ProductList.vue';
import { useAlertsStore } from '@/stores/alerts';
import ShopAlerts from '@/components/ShopAlerts.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const alertsStore = useAlertsStore();
const store = useCartStore();
const { loadCart } = store;
const cartItems = ref([]);
const totalPrice = ref(0);

const getCartItems = async () => {
  try {
    cartItems.value = [];
    axios.get('/api/cart').then((result) => {
      cartItems.value = result.data.cart.items;
      totalPrice.value = result.data.cart.totalPrice;
    });
  } catch (err) {
    console.log('err', err);
  }
};

const postOrder = async () => {
  try {
    await axios
      .post('/api/create-order')
      .then((res) => {
        alertsStore.setAlert('success', res.data.message);
        loadCart();
      })
      .then(() => {
        setTimeout(() => {
          alertsStore.clearAlert();
          router.push('/orders');
        }, 3000);
      });
  } catch (err) {
    console.log('err', err);
  }
};

const showProducts = computed(() => cartItems.value.length);

const loadProducts = computed(() => store.loadProducts);
watch(loadProducts, (newVal) => {
  if (newVal) {
    getCartItems();
    store.loadProducts = false;
  }
});

onMounted(() => {
  getCartItems();
});
</script>
