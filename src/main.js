import { createApp } from "vue";
import Qui from "@qvant/qui-max";
import App from "./App.vue";
import store from "./store";
import router from "./routes";
import "./config/interceptors";
import "@qvant/qui-max/styles";
import "./style.css";
import "@qvant/qui-max/css/main";
import "@qvant/qui-max/fonts";
import "@qvant/qui-max/icons";

import "@qvant/qui-max/css/q-button";
import "@qvant/qui-max/css/q-progress-indicatior";

const app = createApp(App);
app.use(router);
app.use(Qui);
app.use(store);

app.mount("#app");
