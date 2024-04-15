<template>
  <header class="mb-10">
    <v-app-bar :elevation="2" density="default" rounded>
      <template v-slot:prepend>
        <v-menu>
          <template v-slot:activator="{ props }">
            <i class="d-flex d-sm-none" v-bind="props"><v-icon icon="fas fa-bars" /></i>
          </template>

          <v-list class="mt-6">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-title class="text-center"
                ><router-link :to="{ path: item.to }">
                  <v-btn color="">{{ item.title }}</v-btn></router-link
                ></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <v-app-bar-title> <router-link to="/">SwiftCart</router-link></v-app-bar-title>
      <div class="menu-links d-flex flex-wrap" v-for="(item, i) in items" :key="i">
        <router-link :to="{ path: item.to }" class="d-none d-sm-flex"
          ><v-btn color="black">{{ item.title }}</v-btn></router-link
        >
      </div>
    </v-app-bar>
  </header>
</template>

<script setup>
const items = [
  { title: 'Products', to: '/' },
  { title: 'Add Product', to: 'admin/add-product' },
  { title: 'Admin Products', to: '/admin/admin-products' },
  { title: 'Cart', to: '/cart' },
  { title: 'Orders', to: '/orders' },
  { title: 'Login', to: '/login' },
  { title: 'Logout', to: '/logout' },
];
</script>
<style>
.v-menu .v-overlay__content {
  left: 50% !important;
  transform: translate(-50%, 0%);
}
</style>
