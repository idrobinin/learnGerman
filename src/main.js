import { createApp } from "vue";
import YouTube from "vue3-youtube";

// Components
import App from "./App.vue";
const app = createApp(App);

// Plugins
import { registerPlugins } from "@/plugins";
registerPlugins(app);

// Firebase
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/config/firebase";

initializeApp(firebaseConfig);

app.component("YouTube", YouTube);
app.mount("#app");
