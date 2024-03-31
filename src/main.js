import VWave from "v-wave";
import { createApp } from "vue";
import Vue3ConfirmDialog from "vue3-confirm-dialog";
import QrReader from "vue3-qr-reader";
import VueModernNotification from "vue-modern-notification";
import App from "./App.vue";
import "./config/interceptors";
import router from "./routes";
import store from "./store";
import "./style.css";

const app = createApp(App);
app.use(Vue3ConfirmDialog);
app.use(VueModernNotification);
app.use(QrReader);
app.use(VWave);
app.use(router);
app.use(store);

app.mount("#app");
