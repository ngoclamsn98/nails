import axios from "axios";
import router from "@/routes";
import storageUtils from "@/utils/storageUtils";
import store from "@/store";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function (config) {
    store.commit("loading/setLoading", { isLoading: true });
    const token = storageUtils.getStorage("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    store.commit("loading/setLoading", { isLoading: false });

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (config) {
    store.commit("loading/setLoading", { isLoading: false });
    return config;
  },
  function (error) {
    store.commit("loading/setLoading", { isLoading: false });
    storageUtils.removeStorage("token");
    if (error.response.status == 401) {
      router?.push("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
