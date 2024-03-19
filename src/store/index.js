import { createStore } from "vuex";
import UserModule from "./user.module.js";

export default createStore({
  modules: {
    user: UserModule,
  },
});
