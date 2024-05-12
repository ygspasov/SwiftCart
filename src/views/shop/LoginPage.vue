<template>
  <v-sheet class="mx-auto mt-5" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="state.userEmail"
        label="Email"
        @input="v$.userEmail.$touch()"
      ></v-text-field>
      <div :class="{ error: v$.userEmail.$errors.length }">
        <div class="input-errors" v-for="error of v$.userEmail.$errors" :key="error.$uid">
          <div class="text-red mb-2">{{ error.$message }}</div>
        </div>
      </div>

      <v-text-field
        v-model="state.userPassword"
        label="Password"
        type="password"
        @input="v$.userPassword.$touch()"
      ></v-text-field>
      <div :class="{ error: v$.userPassword.$errors.length }">
        <div class="input-errors" v-for="error of v$.userPassword.$errors" :key="error.$uid">
          <div class="text-red mb-2">{{ error.$message }}</div>
        </div>
      </div>
      <v-btn class="mt-2" type="submit" block @click="login">Login</v-btn>
    </v-form>
  </v-sheet>
  <p class="mx-auto mt-5">New customer? <router-link to="/signup">Start here.</router-link></p>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useAlertsStore } from '@/stores/alerts';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

const router = useRouter();
const authStore = useAuthStore();
const alertsStore = useAlertsStore();

const state = reactive({
  userEmail: '',
  userPassword: '',
});

const passRules = (value) => value.length >= 4 && value.length <= 20;

const rules = {
  userEmail: {
    required: helpers.withMessage('Email field cannot be empty', required),
    email,
  },
  userPassword: {
    required,
    passRules: helpers.withMessage('Password must be between 4 and 20 characters.', passRules),
  },
};
const v$ = useVuelidate(rules, state);
console.log('v$', v$);

const login = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
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
