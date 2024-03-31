import router from "@/routes";
import { STORE } from "@/routes/path";
import storageUtils from "@/utils/storageUtils";

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
      storageUtils.set({ key: "token", data: token });
      router?.push(STORE);
    },
  },
};
