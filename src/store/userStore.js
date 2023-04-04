import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useMainStore } from "@/store/mainStore";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("userStore", () => {
  // user
  const user = ref({
    isAuthenticated: false,
    uid: null,
  });

  const mainStore = useMainStore();
  const router = useRouter();

  const auth = getAuth();

  // функция записи юзера в стор
  const SET_USER = (userData) => {
    user.value = userData;
    user.value.isAuthenticated = true;
  };

  // модель окна подтверждения выхода юзера из аккаунта
  const showSignoutDialog = ref(false);

  //  функция регистрации юзера
  const SIGNUP = (email, password) => {
    mainStore.CLEAR_ERROR();
    mainStore.SET_PROCESSING(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        SET_USER(userCredential.user);

        mainStore.SET_PROCESSING(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        mainStore.SET_PROCESSING(false);
        mainStore.SET_ERROR(errorMessage);
      });
  };

  // вход юзера
  const SIGNIN = (email, password) => {
    mainStore.CLEAR_ERROR();
    mainStore.SET_PROCESSING(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        SET_USER(userCredential.user);

        router.push({ name: "profile" });
        mainStore.SET_PROCESSING(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        mainStore.SET_PROCESSING(false);
        mainStore.SET_ERROR(errorMessage);
      });
  };

  // выход из аккаунта
  const SIGN_OUT = () => {
    mainStore.CLEAR_ERROR();
    mainStore.SET_PROCESSING(true);
    signOut(auth)
      .then(() => {
        console.log("you signed out");
      })
      .catch((error) => {
        const errorMessage = error.message;
        mainStore.SET_PROCESSING(false);
        mainStore.SET_ERROR(errorMessage);
      });
    showSignoutDialog.value = true;
  };

  // получаем залогинен ли юзер
  const isUserAuthenticated = computed(() => user.value.isAuthenticated);

  // геттер для юзер ID

  const userId = computed(() => user.value.uid);

  // смотрим залогинен ли юзер и оставляем его на сайте
  watch(
    () => user.value.isAuthenticated,
    (newVal) => {
      if (newVal) {
        router.push({ name: "books" });
      }
    }
  );

  return {
    SET_USER,
    SIGNUP,
    SIGNIN,
    SIGN_OUT,
    isUserAuthenticated,
    showSignoutDialog,
    user,
    userId,
  };
});
