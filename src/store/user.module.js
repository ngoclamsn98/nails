import router from "@/routes";
import { STORE } from "@/routes/path";
import storageUtils from "@/utils/storageUtils";
import { STORAGE_KEY } from "@/constants";

export default {
  namespaced: true,
  state: {
    accessToken: null,
    role: null,
    refreshToken: null,
    user: {},
  },
  actions: {
    checkLogin: () => {
      return "what";
    },
  },
  mutations: {
    authenticate(state, { data }) {
      state = { ...data };
      storageUtils.set({ key: STORAGE_KEY.TOKEN_DATA, data: data });
      router?.push(STORE);
    },
    setUser(state, { data }) {
      state.user = data;
      storageUtils.set({ key: STORAGE_KEY.USER_DETAIL, data: data });
    },
  },
};
