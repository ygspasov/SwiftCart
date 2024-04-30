<template>
  <v-row align="center" justify="center" class="text-center">
    <v-alert
      :text="alert.message"
      v-if="alert"
      :type="alert.type === 'success' ? 'success' : 'error'"
    ></v-alert
  ></v-row>
</template>
<script setup>
defineProps(['alert']);
</script>
<style scoped></style>
