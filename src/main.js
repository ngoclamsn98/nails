import { createApp } from "vue";
import Qui from "@qvant/qui-max";
import "@qvant/qui-max/styles";
import "./style.css";
import App from "./App.vue";
import "@qvant/qui-max/css/main";
import "@qvant/qui-max/fonts";
import "@qvant/qui-max/icons";

import "@qvant/qui-max/css/q-button";
import "@qvant/qui-max/css/q-progress-indicatior";

const app = createApp(App);
app.use(Qui);

app.mount("#app");
