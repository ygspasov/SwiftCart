<template>
  <v-sheet class="mx-auto mt-5" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field v-model="email" :rules="emailRules" label="Email"></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        type="password"
      ></v-text-field>
      <v-btn class="mt-2" type="submit" block @click="login"> Login</v-btn>
    </v-form>
  </v-sheet>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useAlertsStore } from '@/stores/alerts';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();
const alertsStore = useAlertsStore();
const password = ref('');
const passwordRules = [
  (value) => {
    if (value?.length >= 4) return true;
    return 'First name must be at least 3 characters.';
  },
];
const email = ref('');
const emailRules = [
  (value) => {
    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

    return 'Must be a valid e-mail.';
  },
];
const login = async () => {
  try {
    await axios
      .post(`/auth/login`, {
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        authStore.updateLoginStatus(res.data.isLoggedIn);
        email.value = '';
        password.value = '';
        router.push('/');
        alertsStore.setAlert('success', res.data.message);
        console.log('alertsStore.alert', alertsStore.alert.message);
      })
      .then(() => {
        setTimeout(() => {
          alertsStore.clearAlert();
        }, 2000);
      });
  } catch (err) {
    console.log(err);
    alertsStore.setAlert('error', err);
  }
};
</script>
