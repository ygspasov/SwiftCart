<template>
  <v-sheet class="mx-auto mt-5" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field v-model="firstName" :rules="firstNameRules" label="First name"></v-text-field>

      <v-text-field v-model="email" :rules="emailRules" label="Email"></v-text-field>

      <v-btn class="mt-2" type="submit" block @click="login"> Login</v-btn>
    </v-form>
  </v-sheet>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';

const firstName = ref('');
const firstNameRules = [
  (value) => {
    if (value?.length >= 3) return true;
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
    await axios.post(`/auth/login`).then(() => {
      if (document.cookie.includes('loggedIn=true')) {
        console.log('User is logged in');
      } else {
        console.log('User is not logged in');
      }
    });
  } catch (err) {
    console.log(err);
  }
};
</script>
