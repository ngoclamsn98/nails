import { createStore } from "vuex";
import UserModule from "./user.module.js";
import LoadingModule from "./loading.module.js";
import ErrorModule from "./error.module.js";

export default createStore({
  modules: {
    user: UserModule,
    loading: LoadingModule,
    error: ErrorModule,
  },
});
