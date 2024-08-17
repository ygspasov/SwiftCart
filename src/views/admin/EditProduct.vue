<template>
  <v-sheet class="mx-auto mt-5" max-width="400">
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

      <div v-if="imagePreview" class="mb-1">
        <img :src="imagePreview" alt="Selected Image" class="w-100" />
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
      <v-text-field v-model="state.price" label="Price" @input="v$.price.$touch()">$</v-text-field>
      <div :class="{ error: v$.price.$errors.length }">
        <div class="input-errors" v-for="error of v$.price.$errors" :key="error.$uid">
          <div class="text-red mb-2">{{ error.$message }}</div>
        </div>
      </div>
      <v-autocomplete
        v-model="state.selectedCategoryName"
        label="Categories"
        :items="categoryNames"
        @change="v$.selectedCategoryName.$touch()"
      ></v-autocomplete>
      <v-btn type="submit" block class="mt-2" @click="editProduct" :disabled="!isFormCorrect">
        Edit product
      </v-btn>
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
  image: null,
});

const imagePreview = ref(null);

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
  const file = event.target.files.length > 0 ? event.target.files[0] : null;
  state.image = file;

  // Generate a preview URL for the selected image
  if (file) {
    imagePreview.value = URL.createObjectURL(file);
  } else {
    imagePreview.value = null;
  }
};

const getProduct = async () => {
  try {
    const product = await axios.get(`/api/products/${route.params.id}`);
    state.name = product.data.name;
    state.description = product.data.description;
    state.imageUrl = product.data.imageUrl;
    state.price = product.data.price;
    state.categoryId = product.data.categoryId;

    // Setting the initial image preview if an image URL exists
    if (state.imageUrl) {
      imagePreview.value = state.imageUrl;
    }

    getCategories();
  } catch (err) {
    console.log('Error fetching product:', err);
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
    const res = await axios.patch(`/api/admin/products/edit-product/${route.params.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    router.push('/admin/admin-products');
    alertsStore.setAlert('success', res.data.message);
    setTimeout(() => {
      alertsStore.clearAlert();
    }, 3000);
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
    // Prepopulating the category field based on existing data or defaulting to the first category
    if (state.categoryId) {
      const selectedCategory = categories.value.find(
        (category) => category._id === state.categoryId
      );
      if (selectedCategory) {
        state.selectedCategoryName = selectedCategory.name;
      }
    } else if (categories.value.length > 0) {
      //if there isn't an assigned category, set the first category
      state.selectedCategoryName = categories.value[0].name;
      state.categoryId = categories.value[0]._id;
    }
  } catch (err) {
    console.log('Error fetching categories:', err);
  }
};

onMounted(() => {
  getProduct();
});
</script>
