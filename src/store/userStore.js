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

  const mainStore = useMainStore();
  const userDataStore = useUserDataStore();
  const router = useRouter();
  const auth = getAuth();

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

  const SET_USER = (userData) => {
    user.value = {
      ...userData,
      isAuthenticated: true,
    };
  };

  const showSignoutDialog = ref(false);
  const showChangeUserDataDialog = ref(false);

  const SIGNUP = (email, password, name) => {
    mainStore.CLEAR_ERROR();
    mainStore.SET_PROCESSING(true);
    createUserWithEmailAndPassword(auth, email, password)
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
            mainStore.SET_PROCESSING(false);
          });

        SET_USER(user);
      })
      .catch((error) => {
        console.error(error);
        mainStore.SET_ERROR(error.message);
      })
      .finally(() => {
        mainStore.SET_PROCESSING(false);
      });
  };

  const SIGNIN = (email, password) => {
    mainStore.CLEAR_ERROR();
    mainStore.SET_PROCESSING(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        SET_USER(userCredential.user);
        router.push({ name: "profile" });
      })
      .catch((error) => {
        const errorMessage = error.message;
        mainStore.SET_ERROR(errorMessage);
      })
      .finally(() => {
        mainStore.SET_PROCESSING(false);
      });
  };

  const SIGN_OUT = () => {
    mainStore.CLEAR_ERROR();
    mainStore.SET_PROCESSING(true);
    signOut(auth)
      .then(() => {
        console.log("you signed out");
        mainStore.SET_PROCESSING(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        mainStore.SET_ERROR(errorMessage);
      })
      .finally(() => {
        mainStore.SET_PROCESSING(false);
      });

    showSignoutDialog.value = true;
  };

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
      mainStore.SET_PROCESSING(false);
    }
  };

  const isUserAuthenticated = computed(() => user.value.isAuthenticated);
  const userId = computed(() => user.value.uid);

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
