import router from "@/routes";
import { STORE } from "@/routes/path";
import storageUtils from "@/utils/storageUtils";
import { STORAGE_KEY } from "@/constants";
import { handlerCallApi } from "@/config/interceptors";

export default {
  namespaced: true,
  state: {
    accessToken: null,
    role: null,
    refreshToken: null,
    user: {},
  },
  actions: {
    checkLogin: async (state) => {
      let userData = storageUtils.get(STORAGE_KEY.USER_DETAIL) || {};
      const tokenData = storageUtils.get(STORAGE_KEY.TOKEN_DATA) || {};
      if (tokenData?.accessToken && !userData?.permission) {
        const user = await handlerCallApi({
          method: "GET",
          url: "/user/me",
        });
        userData = {
          staffName: `${user.firstName} ${user.lastName}`,
          permission: user.permission,
          storeId: user?.store?.id,
          fcId: user?.store?.franchise?.id,
        };
        state.user = userData;
        storageUtils.set({ key: STORAGE_KEY.USER_DETAIL, data: userData });
      }

      return {
        isAuth: !!Object.keys(tokenData)?.length,
        userData,
      };
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
