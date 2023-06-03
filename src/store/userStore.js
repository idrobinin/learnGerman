import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useMainStore } from "@/store/mainStore";
import { useUserDataStore } from "@/store/userDataStore";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("userStore", () => {
  // user
  const user = ref({
    isAuthenticated: false,
    uid: null,
  });

  const mainStore = useMainStore();
  const userDataStore = useUserDataStore();
  const router = useRouter();
  const auth = getAuth();

  // функция инициации юзера (при перезагрузке страницы оставляем его на странице)
  const INIT_AUTH = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          SET_USER(user);
          userDataStore.LOAD_USER_DATA(user.uid);
        }
        resolve(user);
      });
    });
  };

  // функция записи юзера в стор
  const SET_USER = (userData) => {
    user.value = userData;
    user.value.isAuthenticated = true;
  };

  // модель окна подтверждения выхода юзера из аккаунта
  const showSignoutDialog = ref(false);

  // модель для диалогового окна для изменения данных пользователя
  const showChangeUserDataDialog = ref(false);

  //  функция регистрации юзера
  const SIGNUP = (email, password, name) => {
    mainStore.CLEAR_ERROR();
    mainStore.SET_PROCESSING(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = auth.currentUser;

        // добавляем введенное пользователем при гегистрации имя в БД
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            mainStore.SET_PROCESSING(false);
          })
          .catch((error) => {
            console.error(error);
            mainStore.SET_PROCESSING(false);
            mainStore.SET_ERROR(error.message);
          });

        SET_USER(userCredential.user);
        mainStore.SET_PROCESSING(false);
      })
      .catch((error) => {
        console.error(error);
        mainStore.SET_PROCESSING(false);
        mainStore.SET_ERROR(error.message);
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
    mainStore.SET_PROCESSING(false);
    showSignoutDialog.value = true;
  };

  // метод для изменения данных юзера в профайле
  const CHANGE_USER_DATA_PROFILE = async (
    userId,
    newEmail,
    newName,
    newPassword,
    currentPassword,
    currentEmail
  ) => {
    mainStore.CLEAR_ERROR();
    mainStore.SET_PROCESSING(true);
    const currentUser = auth.currentUser;

    try {
      // Re-authenticate user with their current email and password
      await signInWithEmailAndPassword(auth, currentEmail, currentPassword);

      // Update email
      if (newEmail) {
        user.value.email = newEmail;
        await updateEmail(auth.currentUser, newEmail);
      }

      // Update name
      if (newName) {
        user.value.displayName = newName;
        await updateProfile(currentUser, { displayName: newName });
      }

      // Update password
      if (newPassword) {
        await updatePassword(auth.currentUser, newPassword);
      }

      console.log("User data updated successfully");
    } catch (error) {
      console.error(error);
      mainStore.SET_ERROR(error);
      mainStore.SET_PROCESSING(false);
    }

    mainStore.SET_PROCESSING(false);
  };

  // получаем залогинен ли юзер
  const isUserAuthenticated = computed(() => user.value.isAuthenticated);

  // геттер для юзер ID
  const userId = computed(() => user.value.uid);

  // смотрим залогинен ли юзер и оставляем его на сайте
  // watch(
  //   () => user.value.isAuthenticated,
  //   (newVal) => {
  //     if (newVal) {
  //       router.push({ name: "profile" });
  //     }
  //   }
  // );

  return {
    INIT_AUTH,
    SET_USER,
    SIGNUP,
    SIGNIN,
    SIGN_OUT,
    CHANGE_USER_DATA_PROFILE,
    isUserAuthenticated,
    showSignoutDialog,
    showChangeUserDataDialog,
    user,
    userId,
  };
});
