import { defineStore } from "pinia";
import { computed, ref } from "vue";
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
  const user = ref({
    isAuthenticated: false,
    uid: null,
  });
  // модель для функции отписки от события подписки onAuthStateChanged
  const unsubscribeAuth = ref(null);

  const mainStore = useMainStore();
  const userDataStore = useUserDataStore();
  const router = useRouter();
  const auth = getAuth();

  const SET_USER = (userData) => {
    user.value = {
      ...userData,
      isAuthenticated: true,
    };
  };

  // функция получения данных юзера если он авторизован и существует
  const INIT_AUTH = () => {
    return new Promise((resolve, reject) => {
      // если уже подписаны на событие onAuthStateChanged то отписываемся, чтобы не было множественных подписок(положив событие в переменную)
      if (unsubscribeAuth.value) unsubscribeAuth.value();

      let unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          SET_USER(user);
          userDataStore.LOAD_USER_DATA(user.uid);
        }
        resolve(user);
      });
      unsubscribeAuth.value = unsubscribe;
    });
  };

  const SIGNUP_PROCESSING = ref(false);
  const SIGNUP = async (email, password, name) => {
    mainStore.CLEAR_ERROR();
    SIGNUP_PROCESSING.value = true;
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            mainStore.SET_PROCESSING(false);
          })
          .catch((error) => {
            console.error(error);
            mainStore.SET_ERROR(error.message);
            SIGNUP_PROCESSING.value = false;
          });

        SET_USER(user);
      })
      .catch((error) => {
        console.error(error);
        mainStore.SET_ERROR(error.message);
      })
      .finally(() => {
        SIGNUP_PROCESSING.value = false;
      });
  };

  const SIGNIN_PROCESSING = ref(false);
  const SIGNIN = async (email, password) => {
    mainStore.CLEAR_ERROR();
    SIGNIN_PROCESSING.value = true;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        SET_USER(userCredential.user);
        router.push({ name: "profile" });
      })
      .catch((error) => {
        const errorMessage = error.message;
        mainStore.SET_ERROR(errorMessage);
      })
      .finally(() => {
        SIGNIN_PROCESSING.value = false;
      });
  };

  const showSignoutDialog = ref(false);
  const SIGN_OUT_PROCESSING = ref(false);
  const SIGN_OUT = async () => {
    mainStore.CLEAR_ERROR();
    SIGN_OUT_PROCESSING.value = true;
    await signOut(auth)
      .then(() => {
        user.value.isAuthenticated = false;
        console.log("you signed out");
        showSignoutDialog.value = false;
        router.push({ name: "home" });
      })
      .catch((error) => {
        const errorMessage = error.message;
        mainStore.SET_ERROR(errorMessage);
      })
      .finally(() => {
        SIGN_OUT_PROCESSING.value = false;
      });
  };

  const showChangeUserDataDialog = ref(false);
  const CHANGE_USER_DATA_PROCESSING = ref(false);
  const CHANGE_USER_DATA_PROFILE = async (
    userId,
    newEmail,
    newName,
    newPassword,
    currentPassword,
    currentEmail
  ) => {
    mainStore.CLEAR_ERROR();
    CHANGE_USER_DATA_PROCESSING.value = true;
    const currentUser = auth.currentUser;

    try {
      await signInWithEmailAndPassword(auth, currentEmail, currentPassword);

      if (newEmail) {
        user.value = {
          ...user.value,
          email: newEmail,
        };
        await updateEmail(currentUser, newEmail);
      }

      if (newName) {
        user.value = {
          ...user.value,
          displayName: newName,
        };
        await updateProfile(currentUser, { displayName: newName });
      }

      if (newPassword) {
        await updatePassword(currentUser, newPassword);
      }

      console.log("User data updated successfully");
    } catch (error) {
      console.error(error);
      mainStore.SET_ERROR(error.message);
    } finally {
      CHANGE_USER_DATA_PROCESSING.value = false;
    }
  };

  const isUserAuthenticated = computed(() => user.value.isAuthenticated);
  const userId = computed(() => user.value.uid);

  return {
    isUserAuthenticated,
    showSignoutDialog,
    showChangeUserDataDialog,
    user,
    userId,
    SIGNUP_PROCESSING,
    SIGNIN_PROCESSING,
    SIGN_OUT_PROCESSING,
    CHANGE_USER_DATA_PROCESSING,
    INIT_AUTH,
    SET_USER,
    SIGNUP,
    SIGNIN,
    SIGN_OUT,
    CHANGE_USER_DATA_PROFILE,
  };
});
