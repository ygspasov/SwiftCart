<template>
  <v-sheet width="400" class="mx-auto mt-5">
    <v-form @submit.prevent>
      <v-text-field v-model="name" :rules="rules" label="Product Name"></v-text-field>
      <v-text-field
        v-model="imageUrl"
        :rules="rules"
        label="Image URL"
        id="imageUrl"
      ></v-text-field>
      <v-textarea v-model="description" :rules="rules" label="Description"></v-textarea>
      <v-text-field v-model="price" :rules="rules" label="Price"></v-text-field>
      <v-text-field
        v-model="averateRating"
        :rules="rules"
        label="Averate Rating"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2" @click="postProduct">Add product</v-btn>
    </v-form>
  </v-sheet>
</template>
<script setup>
import axios from "axios";
let name = "";
let description = "";
let price = "";
let averateRating = "";
const rules = [
  (value) => {
    if (value) return true;

    return "You must enter a product name.";
  },
];

const postProduct = async () => {
  try {
    axios.post("/api/products/123", {
      name,
    });
  } catch (err) {
    console.log("err", err);
  }
};
</script>
<style scoped></style>
