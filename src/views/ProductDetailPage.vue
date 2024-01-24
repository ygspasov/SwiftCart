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
    <v-row class="d-flex justify-center">
      <v-col class="" md="3"
        ><div class="text-left text-h6">{{ product.name }}</div></v-col
      ><v-col class="" md="3"
        ><div class="text-right font-weight-bold">${{ product.price }}</div></v-col
      >
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col md="6"
        ><p class="text-left">Average rating: {{ product.averageRating }}</p></v-col
      >
    </v-row>
    <v-row class="d-flex justify-center"
      ><v-col class="" md="6"><v-btn class="w-100">Add to Cart</v-btn></v-col></v-row
    >
    <v-row class="d-flex justify-center">
      <v-col md="6"
        ><p class="text-left font-weight-bold mb-2 text-subtitle-1">Description</p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nostrum voluptates
          cupiditate at nemo omnis. Deleniti dicta illo facere? Veniam nihil reiciendis soluta
          quibusdam at facilis sed asperiores animi quisquam in perferendis repellendus, porro
          ducimus qui laboriosam. Quam aspernatur necessitatibus architecto omnis veritatis,
          facilis, fugit excepturi quas voluptate odio ducimus!
        </p>
      </v-col>
    </v-row>
  </v-container>
  <NotFoundPage v-else />
</template>
<script setup>
import NotFoundPage from '@/views/NotFoundPage.vue';
import { useRoute } from 'vue-router';
// const router = useRouter();
const route = useRoute();
import { products } from '../assets/fake-data';
const product = products.find((p) => p.id === route.params.id);
console.log('product', product);
</script>
<style scoped></style>
