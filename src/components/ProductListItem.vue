<template>
  <div class="">
    <v-img :width="200" cover :src="item.productData.imageUrl" class="mx-auto"></v-img>
  </div>

  <div class="d-flex flex-column text-h6 mx-2 my-2 my-md-0 flex-grow-1 text-center text-md-left">
    <span class="flex-grow-1 text-h5">{{ item.productData.name }}</span>
    <span class="flex-grow-1 text-h5"> Quantity: {{ item.qty }}</span>
    <span class="flex-grow-1 text-h5">Price: ${{ item.productData.price }}</span>
  </div>
  <div class="d-flex align-start mx-auto mx-md-0">
    <v-btn class="" color="black">Remove From Cart</v-btn>
  </div>
</template>
<script setup>
const props = defineProps(['item']);
const item = props.item;
</script>
<style scoped></style>
