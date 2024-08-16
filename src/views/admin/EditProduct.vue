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
      <!-- <v-text-field
        v-model="state.imageUrl"
        label="Image URL"
        id="imageUrl"
        @input="v$.imageUrl.$touch()"
      ></v-text-field> -->
      <v-file-input
        label="Image input"
        @input="v$.image.$touch()"
        @change="handleFileChange"
        :placeholder="state.image ? state.image.name : 'Select an image'"
      ></v-file-input>
      <div :class="{ error: v$.image.$errors.length }">
        <div class="input-errors" v-for="error of v$.image.$errors" :key="error.$uid">
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
      <v-autocomplete
        v-model="state.selectedCategoryName"
        label="Categories"
        :items="categoryNames"
        @click="getCategories"
        @change="v$.selectedCategoryName.$touch()"
      ></v-autocomplete>
      <v-btn type="submit" block class="mt-2" @click="editProduct" :disabled="!isFormCorrect"
        >Edit product</v-btn
      >
    </v-form>
  </v-sheet>
</template>
<script setup>
import { reactive, onMounted, computed, ref, watch } from 'vue';
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
  selectedCategoryName: null,
  categoryId: null,
});

const nameRules = (value) => value.length >= 2;
const descriptionRules = (value) => value.length >= 5;

const rules = {
  required,
  name: {
    nameRules: helpers.withMessage('Name field must contain at least 2 symbols.', nameRules),
  },
  image: {
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
  selectedCategoryName: {
    required: helpers.withMessage('Please select a category.', required),
  },
};

const v$ = useVuelidate(rules, state);

const isFormCorrect = computed(() => {
  return !v$.value.$invalid;
});
const handleFileChange = (event) => {
  // Updating state.image with the selected file
  state.image = event.target.files.length > 0 ? event.target.files[0] : null;
};
const getProduct = async () => {
  try {
    await axios.get(`/api/products/${route.params.id}`).then((product) => {
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
  const formData = new FormData();
  formData.append('name', state.name);
  formData.append('image', state.image);
  formData.append('description', state.description);
  formData.append('price', state.price);
  formData.append('id', route.params.id);
  formData.append('categoryId', state.categoryId);
  try {
    await axios
      .patch(`/api/admin/products/edit-product/${route.params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        router.push('/admin/admin-products');
        alertsStore.setAlert('success', res.data.message);
        setTimeout(() => {
          alertsStore.clearAlert();
        }, 3000);
      });
  } catch (err) {
    console.log('Error editing product:', err);
  }
};
const categories = ref([]);
const categoryNames = computed(() => categories.value.map((category) => category.name));

watch(
  () => state.selectedCategoryName,
  (newValue) => {
    const selectedCategory = categories.value.find((category) => category.name === newValue);
    state.categoryId = selectedCategory ? selectedCategory._id : null;
  }
);

const getCategories = async () => {
  try {
    const res = await axios.get('/api/categories');
    categories.value = res.data;
    console.log('categories', categories.value);
  } catch (err) {
    console.log('err', err);
  }
};

onMounted(() => {
  getProduct();
});
</script>
