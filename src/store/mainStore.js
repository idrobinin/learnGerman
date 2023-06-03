import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useMainStore = defineStore("mainStore", () => {
  // переменная которая показывает обработку данных
  const processing = ref(false);
  const SET_PROCESSING = (payload) => {
    processing.value = payload;
  };
  const getProcessing = computed(() => processing.value);

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
    processing,
    SET_PROCESSING,
    getProcessing,
    error,
    SET_ERROR,
    CLEAR_ERROR,
    getError,
  };
});
