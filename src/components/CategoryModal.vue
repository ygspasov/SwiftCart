<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
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
              <v-text-field label="Category name*" v-model="name" required></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Category description"
                v-model="description"
              ></v-text-field>
            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis"
            >*indicates required field</small
          >
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="postCategory"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
const dialog = ref(false);
const name = ref("");
const description = ref("");
const postCategory = async () => {
  dialog.value = false;
  try {
    await axios.post("/api/post-category", {
      name: name.value,
      description: description.value,
    });
  } catch (err) {
    console.log("Error posting a category", err);
  }
};
</script>
<style scoped></style>
