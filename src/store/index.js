import { createStore } from "vuex";
import UserModule from "./user.module.js";
import LoadingModule from "./loading.module.js";

export default createStore({
  modules: {
    user: UserModule,
    loading: LoadingModule,
  },
});
