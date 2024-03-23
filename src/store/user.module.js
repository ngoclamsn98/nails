import { setToken } from "@/utils";
import router from "@/routes";

export default {
  namespaced: true,
  state: {},
  actions: {
    checkLogin: () => {
      return "what";
    },
  },
  mutations: {
    authenticate(state, { token }) {
      setToken(token);
      router?.push("/");
    },
  },
};
