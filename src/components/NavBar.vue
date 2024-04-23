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
            <v-list-item
              ><v-list-item-title class="text-center"
                ><router-link to="/"
                  ><v-btn @click="logout">Logout</v-btn></router-link
                ></v-list-item-title
              ></v-list-item
            >
          </v-list>
        </v-menu>
      </template>

      <v-app-bar-title> <router-link to="/">SwiftCart</router-link></v-app-bar-title>
      <div class="menu-links d-flex flex-wrap" v-for="(item, i) in items" :key="i">
        <router-link :to="{ path: item.to }" class="d-none d-sm-flex"
          ><v-btn color="black">{{ item.title }}</v-btn></router-link
        >
      </div>
      <router-link to="/" class="d-none d-sm-flex"
        ><v-btn color="black" @click="logout">Logout</v-btn></router-link
      >
    </v-app-bar>
  </header>
</template>

<script setup>
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();
const items = [
  { title: 'Products', to: '/' },
  { title: 'Add Product', to: 'admin/add-product' },
  { title: 'Admin Products', to: '/admin/admin-products' },
  { title: 'Cart', to: '/cart' },
  { title: 'Orders', to: '/orders' },
  { title: 'Signup', to: '/signup' },
  { title: 'Login', to: '/login' },
];
const logout = async () => {
  try {
    await axios.post(`/auth/logout`).then((res) => {
      authStore.updateLoginStatus(res.data.isLoggedIn);
      console.log('authstore', authStore.isLoggedIn);
      router.push('/');
    });
  } catch (err) {
    console.log(err);
  }
};
</script>
<style>
.v-menu .v-overlay__content {
  left: 50% !important;
  transform: translate(-50%, 0%);
}
</style>
