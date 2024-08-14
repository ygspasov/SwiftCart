<template>
  <v-container
    ><v-row>
      <v-table theme="light" class="w-100 mt-5">
        <thead>
          <tr>
            <th class="text-left">Category</th>
            <th class="text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in categories" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-row></v-container
  >
</template>
<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
const categories = ref([]);
const getCategories = async () => {
  try {
    await axios.get('/api/categories').then((res) => {
      categories.value = res.data;
    });
  } catch (err) {
    console.log('err', err);
  }
};
onMounted(() => {
  getCategories();
});
</script>
<style scoped></style>
