import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted } from "vue";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/config/firebase";
initializeApp(firebaseConfig);
import { useUserStore } from "@/store/userStore";
import { useUserDataStore } from "@/store/userDataStore";

const auth = getAuth();

export const authUser = {
  setup() {
    const userStore = useUserStore();
    const userDataStore = useUserDataStore();
    onMounted(() => {
      onAuthStateChanged(auth, (userData) => {
        if (userData) {
          userStore.SET_USER(userData);
          userDataStore.LOAD_USER_DATA(userData.uid);
        } else {
          console.log("error");
        }
      });
    });
  },
};
