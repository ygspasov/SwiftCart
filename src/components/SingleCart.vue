<template>
  <v-card
    :subtitle="'Description: ' + description"
    :text="price"
    :title="'Product: ' + name"
    class="w-100"
  ></v-card>
</template>
<script setup>
defineProps(["description", "name", "price"]);
</script>
<style></style>
