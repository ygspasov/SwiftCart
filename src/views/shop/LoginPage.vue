<template>
  <v-sheet class="mx-auto mt-5" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field v-model="state.userEmail" label="Email"></v-text-field>
      <v-text-field v-model="state.userPassword" label="Password" type="password"></v-text-field>
      <v-btn class="mt-2" type="submit" block @click="login">Login</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useAlertsStore } from '@/stores/alerts';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

const router = useRouter();
const authStore = useAuthStore();
const alertsStore = useAlertsStore();

const state = reactive({
  userEmail: '',
  userPassword: '',
});

const rules = {
  userEmail: { required, email },
  userPassword: { required },
};
const v$ = useVuelidate(rules);
console.log('v$', v$);

const login = async () => {
  try {
    await axios
      .post(`/auth/login`, {
        email: state.userEmail,
        password: state.userPassword,
      })
      .then((res) => {
        if (res.data.isLoggedIn) {
          authStore.updateLoginStatus(res.data.isLoggedIn);
          state.userEmail = '';
          state.userPassword = '';
          router.push('/');
          alertsStore.setAlert('success', res.data.message);
        }
      })
      .then(() => {
        setTimeout(() => {
          alertsStore.clearAlert();
        }, 3000);
      });
  } catch (err) {
    console.log('err', err);
    alertsStore.setAlert('error', err.response.data.message);
    setTimeout(() => {
      alertsStore.clearAlert();
      router.push('/login');
    }, 3000);
  }
};
</script>
