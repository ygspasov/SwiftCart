<template>
  <v-card
    :subtitle="'Description: ' + description"
    :text="'$' + price"
    :title="'Product: ' + name"
    class="w-100 open-sans-regular"
    variant="outlined"
  ></v-card>
</template>
<script setup>
defineProps(['description', 'name', 'price']);
</script>
<style></style>
