<template>
  <div class="pa-4 mb-2 d-flex flex-wrap justify-space-around">
    <v-btn variant="tonal" class="mb-2 mb-md-0" :to="{ path: '/categories' }"
      >View categories</v-btn
    >
    <div class="text-center">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn variant="tonal" class="mb-2 mb-md-0" v-bind="props">Select category</v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in categories"
            :key="index"
            @click="selectCategory(item.id)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-dialog v-if="!isRootPath" v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-plus"
          text="Add category"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card title="Add new category">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                label="Category name*"
                v-model="state.name"
                required
                @input="v$.name.$touch()"
              ></v-text-field>
              <div :class="{ error: v$.name.$errors.length }">
                <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                  <div class="text-red mb-2">{{ error.$message }}</div>
                </div>
              </div>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Category description"
                v-model="state.description"
                @input="v$.description.$touch()"
              ></v-text-field>
              <div :class="{ error: v$.description.$errors.length }">
                <div class="input-errors" v-for="error of v$.description.$errors" :key="error.$uid">
                  <div class="text-red mb-2">{{ error.$message }}</div>
                </div>
              </div>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="Add"
            variant="tonal"
            @click="postCategory"
            :disabled="!isFormCorrect"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { useAlertsStore } from '@/stores/alerts';
const authStore = useAuthStore();
import { useAuthStore } from '@/stores/auth';
const emit = defineEmits(['category-selected']);
const alertsStore = useAlertsStore();
const dialog = ref(false);
const categories = ref([]);
const route = useRoute();
const isRootPath = computed(() => route.path === '/');
const state = ref({
  name: '',
  description: '',
});
const nameRules = (value) => value.length >= 3 && value.length <= 25;
const descriptionRules = (value) => value.length >= 5 && value.length <= 100;
const rules = {
  name: {
    required,
    nameRules: helpers.withMessage(
      'Category name should be between 4 and 25 characters.',
      nameRules
    ),
  },
  description: {
    required,
    descriptionRules: helpers.withMessage(
      'Category description should be between 5 and 100 characters.',
      descriptionRules
    ),
  },
};
const v$ = useVuelidate(rules, state);
const isFormCorrect = computed(() => {
  return !v$.value.$invalid;
});
const postCategory = async () => {
  if (!isFormCorrect.value) return;
  dialog.value = false;
  try {
    await axios
      .post('/api/post-category', {
        name: state.value.name,
        description: state.value.description,
        userId: authStore.userId,
      })
      .then((res) => {
        alertsStore.setAlert('success', res.data.message);
        state.value.name = '';
        state.value.description = '';
        getCategories();
      })
      .then(() => {
        setTimeout(() => {
          alertsStore.clearAlert();
        }, 3000);
      });
  } catch (err) {
    console.log('Error posting a category', err);
  }
};
const selectCategory = (categoryId) => {
  emit('category-selected', categoryId);
};
const getCategories = async () => {
  try {
    const res = await axios.get('/api/categories');
    categories.value = res.data.map((category) => ({
      title: category.name,
      id: category._id,
    }));
  } catch (err) {
    console.log('err', err);
  }
};
onMounted(() => {
  getCategories();
});
</script>
<style scoped></style>
