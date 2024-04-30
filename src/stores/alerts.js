import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAlertsStore = defineStore('alerts', () => {
  const alert = ref(null);
  //type is either 'success' or 'error'
  function setAlert(type, message) {
    alert.value = { type, message };
  }

  function clearAlert() {
    alert.value = null;
  }

  return { alert, setAlert, clearAlert };
});
