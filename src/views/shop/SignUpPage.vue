<template>
  <v-container>
    <v-sheet class="mx-auto mt-5" width="300">
      <v-form fast-fail @submit.prevent>
        <v-text-field
          v-model="state.userName"
          label="User name"
          @input="v$.userName.$touch()"
        ></v-text-field>
        <div :class="{ error: v$.userName.$errors.length }">
          <div
            class="input-errors"
            v-for="error of v$.userName.$errors"
            :key="error.$uid"
          >
            <div class="text-red mb-2">{{ error.$message }}</div>
          </div>
        </div>
        <v-text-field
          v-model="state.userEmail"
          label="Email"
          @input="v$.userEmail.$touch()"
        ></v-text-field>
        <div :class="{ error: v$.userEmail.$errors.length }">
          <div
            class="input-errors"
            v-for="error of v$.userEmail.$errors"
            :key="error.$uid"
          >
            <div class="text-red mb-2">{{ error.$message }}</div>
          </div>
        </div>
        <v-text-field
          v-model="state.userPassword"
          label="Password"
          @input="v$.userPassword.$touch()"
          type="password"
        ></v-text-field>
        <div :class="{ error: v$.userPassword.$errors.length }">
          <div
            class="input-errors"
            v-for="error of v$.userPassword.$errors"
            :key="error.$uid"
          >
            <div class="text-red mb-2">{{ error.$message }}</div>
          </div>
        </div>
        <v-text-field
          v-model="state.userPasswordRepeat"
          label="Confirm password"
          @input="v$.userPasswordRepeat.$touch()"
          type="password"
        ></v-text-field>
        <div :class="{ error: v$.userPasswordRepeat.$errors.length }">
          <div
            class="input-errors"
            v-for="error of v$.userPasswordRepeat.$errors"
            :key="error.$uid"
          >
            <div class="text-red mb-2">{{ error.$message }}</div>
          </div>
        </div>

        <v-btn
          class="mt-2"
          type="submit"
          block
          @click="signup"
          :disabled="!isFormCorrect"
        >
          Signup</v-btn
        >
      </v-form>
    </v-sheet>
  </v-container>
  <p class="mx-auto mt-5">
    Already have an account? <router-link to="/signin">Sign in.</router-link>
  </p>
</template>
<script setup>
import { reactive, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useAlertsStore } from "@/stores/alerts";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
const router = useRouter();
const authStore = useAuthStore();
const alertsStore = useAlertsStore();
const state = reactive({
  userName: "",
  userEmail: "",
  userPassword: "",
  userPasswordRepeat: "",
});
const nameRules = (value) => value.length >= 4 && value.length <= 25;
const passRules = (value) => value.length >= 4 && value.length <= 20;
const rules = {
  userName: {
    required,
    nameRules: helpers.withMessage(
      "Username should be between 4 and 25 characters.",
      nameRules
    ),
  },
  userEmail: {
    required: helpers.withMessage("Email field cannot be empty.", required),
    email,
  },
  userPassword: {
    required,
    passRules: helpers.withMessage(
      "Password must be between 4 and 20 characters.",
      passRules
    ),
  },
  userPasswordRepeat: {
    required,
    passRepeatRules: helpers.withMessage(
      "Passwords must match.",
      (value) => value === state.userPassword
    ),
  },
};
const v$ = useVuelidate(rules, state);
const isFormCorrect = computed(() => {
  return !v$.value.$invalid;
});
const signup = async () => {
  if (!isFormCorrect.value) return;
  try {
    await axios
      .post(`/auth/signup`, {
        name: state.userName,
        email: state.userEmail,
        password: state.userPassword,
      })
      .then((res) => {
        if (res.data.isLoggedIn) {
          authStore.updateLoginStatus(res.data.isLoggedIn);
          state.userEmail = "";
          state.userPassword = "";
          state.userPasswordRepeat = "";
          router.push("/");
          alertsStore.setAlert("success", res.data.message);
        }
      })
      .then(() => {
        setTimeout(() => {
          alertsStore.clearAlert();
        }, 3000);
      });
  } catch (err) {
    router.push("/");
    console.log("err", err);
    alertsStore.setAlert("error", err.response.data.message);
    setTimeout(() => {
      alertsStore.clearAlert();
      router.push("/signup");
    }, 3000);
  }
};
</script>
