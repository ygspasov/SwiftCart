<template>
  <v-sheet width="400" class="mx-auto mt-5">
    <v-form @submit.prevent>
      <v-text-field
        v-model="state.name"
        label="Product Name"
        @input="v$.name.$touch()"
      ></v-text-field>
      <div :class="{ error: v$.name.$errors.length }">
        <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
          <div class="text-red mb-2">{{ error.$message }}</div>
        </div>
      </div>
      <v-text-field
        v-model="state.imageUrl"
        label="Image URL"
        id="imageUrl"
        @input="v$.imageUrl.$touch()"
      ></v-text-field>
      <div :class="{ error: v$.imageUrl.$errors.length }">
        <div class="input-errors" v-for="error of v$.imageUrl.$errors" :key="error.$uid">
          <div class="text-red mb-2">{{ error.$message }}</div>
        </div>
      </div>
      <v-textarea
        v-model="state.description"
        label="Description"
        @input="v$.description.$touch()"
      ></v-textarea>
      <div :class="{ error: v$.description.$errors.price }">
        <div class="input-errors" v-for="error of v$.description.$errors" :key="error.$uid">
          <div class="text-red mb-2">{{ error.$message }}</div>
        </div>
      </div>
      <v-text-field v-model="state.price" label="Price" @input="v$.price.$touch()"></v-text-field>
      <div :class="{ error: v$.price.$errors.length }">
        <div class="input-errors" v-for="error of v$.price.$errors" :key="error.$uid">
          <div class="text-red mb-2">{{ error.$message }}</div>
        </div>
      </div>
      <v-btn type="submit" block class="mt-2" @click="editProduct" :disabled="!isFormCorrect"
        >Edit product</v-btn
      >
    </v-form>
  </v-sheet>
</template>
<script setup>
import { reactive, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { useAlertsStore } from '@/stores/alerts';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers, numeric } from '@vuelidate/validators';
const alertsStore = useAlertsStore();
const router = useRouter();
const route = useRoute();

const state = reactive({
  name: '',
  imageUrl: '',
  description: '',
  price: 0,
});

const nameRules = (value) => value.length >= 2;
const descriptionRules = (value) => value.length >= 5;

const rules = {
  required,
  name: {
    nameRules: helpers.withMessage('Name field must contain at least 2 symbols.', nameRules),
  },
  imageUrl: {
    required,
  },
  description: {
    required,
    descriptionRules: helpers.withMessage(
      'Description field must contain at least 5 symbols.',
      descriptionRules
    ),
  },
  price: {
    required,
    numeric,
  },
};

const v$ = useVuelidate(rules, state);

const isFormCorrect = computed(() => {
  return !v$.value.$invalid;
});

const getProduct = async () => {
  try {
    await axios.get(`/api/products/${route.params.id}`).then((product) => {
      console.log('product', product);
      state.name = product.data.name;
      state.description = product.data.description;
      state.imageUrl = product.data.imageUrl;
      state.price = product.data.price;
    });
  } catch (err) {
    console.log('err', err);
  }
};

const editProduct = async () => {
  if (!isFormCorrect.value) return;
  try {
    await axios
      .patch(`/api/admin/products/edit-product/${route.params.id}`, {
        id: route.params.id,
        name: state.name,
        imageUrl: state.imageUrl,
        description: state.description,
        price: state.price,
      })
      .then((res) => {
        router.push('/admin/admin-products');
        alertsStore.setAlert('success', res.data.message);
        console.log('alertsStore.alert', alertsStore.alert.message);
        setTimeout(() => {
          alertsStore.clearAlert();
        }, 3000);
      });
  } catch (err) {
    console.log('Error editing product:', err);
  }
};
onMounted(() => {
  getProduct();
});
</script>
