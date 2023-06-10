import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useMainStore = defineStore("mainStore", () => {
  // переменная которая получает в себя ошибки обработки
  const error = ref(null);
  const SET_ERROR = (payload) => {
    error.value = payload;
  };

  const CLEAR_ERROR = () => {
    error.value = null;
  };
  const getError = computed(() => error.value);

  return {
    error,
    getError,
    SET_ERROR,
    CLEAR_ERROR,
  };
});
