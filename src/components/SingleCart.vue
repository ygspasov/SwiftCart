<template>
  <v-card
    :subtitle="'Description: ' + description"
    :text="'$' + price"
    :title="'Product: ' + name"
    class="w-100 roboto-regular"
    variant="outlined"
  ></v-card>
</template>
<script setup>
defineProps(['description', 'name', 'price']);
</script>
<style></style>
