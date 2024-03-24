import axios from "axios";
import router from "@/routes";
import { getToken, removeToken } from "@/utils";
import store from "@/store";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function (config) {
    store.commit("loading/setLoading", { isLoading: true });
    const token = getToken();
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
    removeToken();
    if (error.response.status == 401) {
      router?.push("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
