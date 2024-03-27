import { STORE } from "@/path";
import router from "@/routes";
import { setToken } from "@/utils";

export default {
  namespaced: true,
  state: {},
  actions: {
    checkLogin: () => {
      return "what";
    },
  },
  mutations: {
    authenticate(_, { token }) {
      setToken(token);
      router?.push(STORE);
    },
  },
};
