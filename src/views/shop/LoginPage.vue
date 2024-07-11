<template>
  <v-container>
    <ShopAlerts class="mb-2" :alert="alertsStore.alert" />
  </v-container>
  <v-container>
    <v-sheet class="mx-auto" width="300">
      <v-form fast-fail @submit.prevent>
        <v-text-field
          class="email"
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
          class="password"
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
        <v-btn class="mt-2" type="submit" block @click="login" :disabled="!isFormCorrect"
          >Login</v-btn
        >
      </v-form>
    </v-sheet>
  </v-container>
  <p class="mx-auto mt-5">New customer? <router-link to="/signup">Start here.</router-link></p>
</template>

<script setup>
import { reactive, computed } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useAlertsStore } from '@/stores/alerts';
import ShopAlerts from '@/components/ShopAlerts.vue';
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

const isFormCorrect = computed(() => {
  return !v$.value.$invalid;
});

const login = async () => {
  if (!isFormCorrect.value) return;
  try {
    await axios
      .post(`/auth/login`, {
        email: state.userEmail,
        password: state.userPassword,
      })
      .then((user) => {
        authStore.updateUserName(user.data.user.name);
        authStore.updateLoginStatus(true);
        state.userEmail = '';
        state.userPassword = '';
        router.push('/');
        alertsStore.setAlert('success', 'Login successful!');
      });
  } catch (err) {
    alertsStore.setAlert('error', err.response?.data?.message || 'An error occurred');
  } finally {
    setTimeout(() => {
      alertsStore.clearAlert();
    }, 3000);
  }
};
</script>
