import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onMounted } from "vue";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/config/firebase";
initializeApp(firebaseConfig);
import { useUserStore } from "@/store/userStore";
import { useUserDataStore } from "@/store/userDataStore";
import { useRouter } from "vue-router";

const auth = getAuth();

export const authUser = {
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const userDataStore = useUserDataStore();
    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userStore.SET_USER(user);
          userDataStore.LOAD_USER_DATA(user.uid);
          router.push({ name: "profile" });
        } else {
          console.log("error");
        }
      });
    });
  },
};
