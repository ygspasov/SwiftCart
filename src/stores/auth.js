import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const state = {
      isLoggedIn: ref(false),
      userName: ref(''),
      userId: ref(''),
    };

    function updateLoginStatus(val) {
      state.isLoggedIn.value = val;
    }

    function updateUserName(userName) {
      state.userName.value = userName;
    }

    function updateUserId(userId) {
      state.userId.value = userId;
    }

    return { ...state, updateLoginStatus, updateUserName, updateUserId };
  },
  {
    persist: true,
  }
);
