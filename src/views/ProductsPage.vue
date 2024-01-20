<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col v-for="product in products" :key="product.id" cols="auto">
          <v-card class="mx-auto" max-width="400">
            <v-img
              class="align-end text-white"
              height="430"
              width="300"
              :src="product.imageUrl"
              cover
            >
            </v-img>

            <v-card-title
              ><div class="text-center">{{ product.name }}</div></v-card-title
            >

            <v-card-text>
              <div class="text-center">${{ product.price }}</div>
            </v-card-text>

            <v-card-actions>
              <router-link class="bg-black mx-auto pa-1 mb-2" :to="'/products/' + product.id"
                ><v-btn class="radius-"> View Details </v-btn></router-link
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { products } from '../assets/fake-data';
</script>
<style scoped></style>
