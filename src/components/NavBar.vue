<template>
  <header class="mb-10">
    <v-app-bar :elevation="2" density="default" rounded>
      <template v-slot:prepend>
        <v-menu>
          <template v-slot:activator="{ props }">
            <i v-bind="props"><v-icon icon="fas fa-bars" /></i>
          </template>

          <v-list class="mt-6">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-title
                ><router-link :to="{ path: item.to }">
                  <v-btn color="">{{ item.title }}</v-btn></router-link
                ></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <v-app-bar-title> <router-link to="/">SwiftCart</router-link></v-app-bar-title>
      <div class="menu-links d-flex flex-wrap">
        <router-link to="/products"><v-btn color="black">Products</v-btn></router-link>
        <router-link to="/cart"><v-btn color="black">Shopping Cart</v-btn></router-link>
      </div>
    </v-app-bar>
  </header>
</template>

<script setup>
const items = [
  { title: 'Products', to: '/products' },
  { title: 'Shopping Cart', to: '/cart' },
];
</script>
<style scoped></style>
