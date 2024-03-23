import { createApp } from "vue";
import Camera from "simple-vue-camera";
import PrettyCheckbox from "pretty-checkbox-vue";
import App from "./App.vue";
import "./config/interceptors";
import router from "./routes";
import store from "./store";
import "./style.css";

const app = createApp(App).component("camera", Camera);

app.use(PrettyCheckbox);
app.use(router);
app.use(store);

app.mount("#app");
