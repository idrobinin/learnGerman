import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted } from "vue";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/config/firebase";
initializeApp(firebaseConfig);
import { useUserStore } from "@/store/userStore";

const auth = getAuth();

export const authUser = {
  setup() {
    const userStore = useUserStore();
    onMounted(() => {
      onAuthStateChanged(auth, (userData) => {
        if (userData) {
          userStore.SET_USER(userData);
        } else {
          console.log("error");
        }
      });
    });
  },
};
