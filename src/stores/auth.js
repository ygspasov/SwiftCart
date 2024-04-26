import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const state = {
      isLoggedIn: ref(false),
    };

    function updateLoginStatus(val) {
      state.isLoggedIn.value = val;
    }

    return { ...state, updateLoginStatus };
  },
  {
    persist: true,
  }
);
