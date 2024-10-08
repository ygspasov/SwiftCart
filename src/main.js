import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const swiftCartTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
};

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'swiftCartTheme',
    themes: {
      swiftCartTheme,
    },
  },
  components,
  directives,
});

import router from './router';

const app = createApp(App).use(vuetify);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);

import axios from 'axios';
import { useAuthStore } from './stores/auth';

axios.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const authStore = useAuthStore();
    //checking if the user is authenticated and redirecting to /login if he is not
    if (error.response && error.response.status === 401) {
      authStore.isLoggedIn = false;
      await router.push('/login');
    }

    throw error;
  }
);

app.mount('#app');
