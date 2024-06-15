import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const state = {
      isLoggedIn: ref(false),
      userName: ref(''),
    };

    function updateLoginStatus(val) {
      state.isLoggedIn.value = val;
    }

    function updateUserName(userName) {
      state.userName.value = userName;
    }

    return { ...state, updateLoginStatus, updateUserName };
  },
  {
    persist: true,
  }
);
