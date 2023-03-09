import { createApp } from "vue";
import YouTube from "vue3-youtube";

// Components
import App from "./App.vue";
const app = createApp(App);

// Plugins
import { registerPlugins } from "@/plugins";
registerPlugins(app);

app.component("YouTube", YouTube);
app.mount("#app");
