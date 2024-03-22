import { createApp } from "vue";
import App from "./App.vue";
import "./config/interceptors";
import router from "./routes";
import store from "./store";
import "./style.css";
const app = createApp(App);
app.use(router);
app.use(store);

app.mount("#app");
