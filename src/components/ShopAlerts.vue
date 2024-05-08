<template>
  <v-row align="center" justify="center" class="text-center">
    <v-alert
      :text="alert.message"
      v-if="alert"
      :type="alert.type === 'success' ? 'success' : 'error'"
      class="mt-16"
    ></v-alert
  ></v-row>
</template>
<script setup>
defineProps(['alert']);
</script>
<style scoped></style>
