<template>
  <header class="mb-10">
    <v-app-bar :elevation="2" density="default" rounded>
      <template v-slot:prepend>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-icon class="d-flex d-md-none" v-bind="props" icon="mdi-menu"></v-icon>
          </template>
          <!-- mobile menu -->
          <v-list class="mt-6">
            <!-- <v-list-item>
              <v-text-field
                v-model="searchQuery"
                append-icon="mdi-magnify"
                label="Search"
                solo
                hide-details
              ></v-text-field>
            </v-list-item> -->
            <v-list-item v-for="(item, i) in filteredItems" :key="i">
              <v-list-item-title class="text-center">
                <router-link
                  :to="{ path: item.to }"
                  class="open-sans-regular text-black text-button"
                  :exact="true"
                  :active-class="'active-navlink-mobile'"
                >
                  <a class="button">{{ item.title }}</a>
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="showLogout">
              <v-list-item-title class="text-center">
                <router-link to="/" class="open-sans-regular">
                  <v-btn @click="logout">Logout</v-btn>
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="authStore.isLoggedIn" class="text-center roboto-regular">
              {{ userName }}
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <!-- desktop menu -->
      <v-app-bar-title>
        <router-link to="/" class="open-sans-regular"
          >SwiftCart</router-link
        ></v-app-bar-title
      >

      <v-text-field
        v-model="searchQuery"
        label="Search"
        solo
        hide-details
        class="d-none d-md-flex mx-4 justify-end"
        @input="filteredSearchResults"
      ></v-text-field>
      <div
        class="menu-links d-none d-md-flex flex-wrap open-sans-regular"
        v-for="(item, i) in filteredItems"
        :key="i"
      >
        <router-link
          :to="{ path: item.to }"
          class="d-none d-sm-flex text-black"
          :exact="true"
          :active-class="'active-navlink'"
          ><v-btn>{{ item.title }}</v-btn></router-link
        >
      </div>
      <router-link to="/" class="d-none d-sm-flex" v-if="showLogout"
        ><v-btn color="black open-sans-regular" @click="logout"
          >Logout</v-btn
        ></router-link
      >
      <p class="mx-2 roboto-medium" v-if="authStore.isLoggedIn">{{ userName }}</p>
    </v-app-bar>
  </header>
</template>

<script setup>
import axios from 'axios';
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
import { useProductsStore } from '@/stores/products';
const productsStore = useProductsStore();
import { useRouter } from 'vue-router';
const router = useRouter();
const searchQuery = ref('');
const items = [
  { title: 'Products', to: '/' },
  { title: 'Add Product', to: '/admin/add-product' },
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
      router.push('/login');
    });
  } catch (err) {
    console.log(err);
  }
};
const showLogout = computed(() => {
  return authStore.isLoggedIn;
});

// Filtering menu items based on the showLogout status
const filteredItems = computed(() => {
  return items.filter((item) => {
    if (showLogout.value) {
      // Show all items except "Signup" and "Login" if logged in
      return !['Signup', 'Login'].includes(item.title);
    } else {
      // Show only "Products", "Signup", and "Login" if not logged in
      return ['Products', 'Signup', 'Login'].includes(item.title);
    }
  });
});

const filteredSearchResults = () => {
  if (!searchQuery.value) {
    productsStore.setSearchFilter('');
    return [];
  }
  productsStore.setSearchFilter(searchQuery.value);
};

const userName = computed(() => {
  return authStore.userName.split(' ')[0];
});
</script>
<style>
header .v-menu .v-overlay__content {
  left: 50% !important;
  transform: translate(-50%, 0%);
}
header .menu-links .active-navlink {
  font-weight: bold;
  color: white !important;
  background: black;
  border-radius: 5px;
}
header .active-navlink-mobile {
  font-weight: bold;
  font-size: 1rem !important;
  text-transform: uppercase;
  color: black !important;
}
header .v-input__control > .v-field {
  min-width: 300px;
}
#v-menu-1 .v-overlay__content {
  width: 100%;
}
</style>
