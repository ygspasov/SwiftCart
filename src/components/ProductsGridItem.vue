<template>
  <v-card class="mx-auto" min-width="280">
    <v-img class="align-end text-white" height="450" :src="product.imageUrl" cover>
    </v-img>

    <v-card-title
      ><div class="text-center text-h5">{{ product.name }}</div></v-card-title
    >

    <v-card-text>
      <div class="text-center text-h6">${{ product.price }}</div>
    </v-card-text>

    <v-card-actions class="d-flex flex-wrap justify-center px-0">
      <router-link
        v-if="admin"
        class="bg-black pa-1 mb-2 mx-1 rounded"
        :to="'/admin/edit-product/' + product.id"
      >
        <v-btn class="radius-"> Edit </v-btn>
      </router-link>
      <router-link v-if="admin" class="bg-black pa-1 mb-2 mx-1 rounded" :to="''">
        <v-btn class="radius-"> Delete </v-btn>
      </router-link>
      <router-link
        class="bg-black pa-1 mb-2 mx-1 rounded"
        :to="'/products/' + product.id"
      >
        <v-btn class="radius-"> View Details </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { inject } from "vue";
const admin = inject("admin");

const props = defineProps(["product"]);
const product = props.product;
console.log("product", product);
</script>
<style scoped></style>
