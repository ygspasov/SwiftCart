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
            <td>{{ item.calories }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-row></v-container
  >
</template>
<script setup>
const categories = [
  {
    name: "Frozen Yogurt",
    calories: 159,
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
  },
  {
    name: "Eclair",
    calories: 262,
  },
  {
    name: "Cupcake",
    calories: 305,
  },
  {
    name: "Gingerbread",
    calories: 356,
  },
  {
    name: "Jelly bean",
    calories: 375,
  },
  {
    name: "Lollipop",
    calories: 392,
  },
  {
    name: "Honeycomb",
    calories: 408,
  },
  {
    name: "Donut",
    calories: 452,
  },
  {
    name: "KitKat",
    calories: 518,
  },
];
</script>
<style scoped></style>
