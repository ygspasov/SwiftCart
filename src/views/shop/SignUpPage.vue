<template>
  <v-sheet class="mx-auto mt-5" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field v-model="email" :rules="emailRules" label="Email"></v-text-field>
      <v-text-field v-model="password" :rules="passwordRules" label="Password"></v-text-field>
      <v-text-field v-model="repeat" :rules="repeatRules" label="Confirm password"></v-text-field>

      <v-btn class="mt-2" type="submit" block @click="signup"> Signup</v-btn>
    </v-form>
  </v-sheet>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';

const password = ref('');
const repeat = ref('');
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
const signup = async () => {
  try {
    await axios.post(`/auth/signup`);
  } catch (err) {
    console.log(err);
  }
};
</script>
